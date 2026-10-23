// Real Chrome layout regression; no production requests or additional dependencies.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {spawnSync}=require('node:child_process');
const Module=require('node:module');
const ts=require('typescript');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');

function renderCard(locale,long,expanded) {
 const filename=path.resolve('src/components/Main/Work/SingleProject/SingleProject.tsx');
 const fixture=new Module(filename,module);fixture.filename=filename;
 let state=0;
 fixture.require=name=>{
  if(name==='react') return {...React,useState:initial=>[state++===0?expanded:initial,()=>{}]};
  if(name.includes('useLanguageContent')) return {__esModule:true,default:()=>({labels:{Process:locale==='de'?'Prozess':'Process',buttonShow:locale==='de'?'Mehr anzeigen':'Show more',buttonHide:locale==='de'?'Weniger anzeigen':'Show less',Technologies:'Technologies'}})};
  if(name.includes('ImageModal')) return {ImageModal:()=>null};
  if(name.includes('api/projects')) return {projectLinkUrls:()=>({homepage:null,repository:null})};
  if(name.includes('config/projects')) return {projectLinks:{}};
  return require(name);
 };
 fixture._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{
  compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX},
 }).outputText,filename);
 const sentence=locale==='de'?'Eine ausführliche Beschreibung der Reiseplanung und gemeinsamen Erinnerungen. ':'A detailed description of travel planning and shared memories. ';
 return renderToStaticMarkup(React.createElement(fixture.exports.SingleProject,{project:{
  Title:long?'Patagonia 2025 — Travel Companion':'Wedding Website',
  Intro:sentence.repeat(long?15:1),Images:[],Technologies:'React',
  TextBlock:[{type:'paragraph',children:[{type:'text',text:sentence.repeat(5)}]}],
 }}));
}

test('intro layout can grow at every breakpoint and both expansion states render',()=>{
 const css=require('postcss').parse(fs.readFileSync('src/assets/css/main.css','utf8'));
 let rules=0;
 css.walkRules('.project-intro',rule=>{
  rules++;
  rule.walkDecls(decl=>{
   assert(!['height','max-height','line-clamp','-webkit-line-clamp'].includes(decl.prop),`Intro must grow: ${decl.toString()}`);
   if(decl.prop==='overflow')assert(!['hidden','clip'].includes(decl.value));
  });
 });
 assert(rules>0);
 for(const locale of ['en','de']) for(const long of [false,true]) {
  const collapsed=renderCard(locale,long,false),expanded=renderCard(locale,long,true);
  assert(collapsed.includes('aria-expanded="false"'));
  assert(!collapsed.includes('class="project-description"'));
  assert(expanded.includes('aria-expanded="true"'));
  assert(expanded.includes('class="project-description"'));
  assert(expanded.indexOf('class="project-intro"')<expanded.indexOf('class="project-description"'));
  assert(expanded.indexOf('class="project-description"')<expanded.indexOf('id="project-text-button"'));
 }
});

test('short/long EN/DE cards contain text before controls at desktop and mobile widths',
 {skip: !process.env.CHROME_BIN && 'Set CHROME_BIN to enable real-browser geometry checks'},()=>{
 const browser=process.env.CHROME_BIN||'/usr/bin/google-chrome';
 assert(fs.existsSync(browser),'Set CHROME_BIN to a local Chrome/Chromium executable');
 const directory=fs.mkdtempSync(path.join(os.tmpdir(),'portfolio-card-layout-'));
 try {
  const styles=fs.readFileSync('src/assets/css/main.css','utf8');
  for(const width of [1440,1024,768,600,390]) {
   const fixtures=[];
   for(const locale of ['en','de']) for(const long of [false,true]) for(const expanded of [false,true]) {
    fixtures.push(`<div data-case="${locale}-${long}-${expanded}" data-expanded="${expanded}" class="row">${renderCard(locale,long,expanded)}</div>`);
   }
   const script=`
const results=[...document.querySelectorAll('[data-case]')].map(f=>{
 const intro=f.querySelector('.project-intro'),text=f.querySelector('.project-intro-text p'),button=f.querySelector('#project-text-button'),description=f.querySelector('.project-description');
 const i=intro.getBoundingClientRect(),t=text.getBoundingClientRect(),b=button.getBoundingClientRect();
 return {name:f.dataset.case,contained:t.bottom<=i.bottom+1,buttonBelow:b.top>=i.bottom-1,expanded:button.getAttribute('aria-expanded')===f.dataset.expanded,descriptionValid:description?description.getBoundingClientRect().top>=i.bottom-1:f.dataset.expanded==='false'};
});
document.querySelector('#results').textContent=JSON.stringify({width:innerWidth,results});`;
   const file=path.join(directory,`cards-${width}.html`);
   fs.writeFileSync(file,`<!doctype html><meta name="viewport" content="width=device-width, initial-scale=1"><style>${styles}</style><div id="main">${fixtures.join('')}</div><pre id="results"></pre><script>${script}</script>`);
   const result=spawnSync(browser,['--headless','--no-sandbox','--disable-gpu','--no-proxy-server','--disable-background-networking',`--user-data-dir=${path.join(directory,'chrome-'+width)}`,`--window-size=${width},1000`,'--dump-dom',pathToFileURL(file).href],{encoding:'utf8',timeout:30000,maxBuffer:8*1024*1024});
   assert.equal(result.status,0,result.stderr?.slice(-1000));
   const report=JSON.parse(result.stdout.match(/<pre id="results">([^<]+)<\/pre>/)?.[1]||'null');
   assert(report,'Missing browser layout report');
   for(const row of report.results) {
    assert(row.contained,`Intro overflow at ${width}: ${row.name}`);
    assert(row.buttonBelow,`Button overlap at ${width}: ${row.name}`);
    assert(row.expanded&&row.descriptionValid,`Expansion layout at ${width}: ${row.name}`);
   }
  }
 } finally {fs.rmSync(directory,{recursive:true,force:true});}
});
