const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const Module=require('node:module');
const ts=require('typescript');
// Exercise the actual TS adapter without adding a runner dependency or API calls.
const moduleUnderTest=new Module(require('node:path').resolve('src/api/projects.ts'),module);
moduleUnderTest.filename=moduleUnderTest.id;
moduleUnderTest._compile(ts.transpileModule(fs.readFileSync('src/api/projects.ts','utf8'),{
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020},
}).outputText,moduleUnderTest.filename);
const {fetchProjectCollection,groupProjects,projectLinkUrls,legacyProjectsToArray}=moduleUnderTest.exports;
const project=(slug,extra={})=>({id:1,documentId:slug,slug,name:slug,locale:'en',Images:[],...extra});
const row=(slug,locale,extra={})=>({documentId:slug,slug,name:slug,locale,publishedAt:'2026-01-01T00:00:00Z',content:{Title:locale,hasHomepage:true,Images:[{id:2,url:'https://fixture/2'},{id:1,url:'https://fixture/1'}]},...extra});

test('EN/DE, all pages, published filtering, ordered and missing media, cancellation signal',async()=>{
 for(const locale of ['en','de']) {
  const controller=new AbortController();const calls=[];
  const result=await fetchProjectCollection(locale,async(path,signal)=>{
   assert.equal(signal,controller.signal);const query=new URL(path,'https://fixture').searchParams;
   assert.equal(query.get('status'),'published');assert.equal(query.get('locale'),locale);
   assert.equal(query.get('populate[content][populate]'),'Images');
   const page=Number(query.get('pagination[page]'));calls.push(page);
   return {data:page===1?[row('first',locale),row('draft',locale,{publishedAt:null}),row('wrong',locale==='de'?'en':'de')]:[row('second',locale,{content:{Title:'No media',Images:null}})],meta:{pagination:{page,pageCount:2}}};
  },controller.signal);
  assert.deepEqual(calls,[1,2]);assert.deepEqual(result.map(p=>p.slug),['first','second']);
  assert.equal(result[0].Title,locale);assert.deepEqual(result[0].Images.map(i=>i.id),[2,1]);assert.deepEqual(result[1].Images,[]);
 }
});
test('errors remain observable; malformed pagination and duplicate slugs fail',async()=>{
 await assert.rejects(fetchProjectCollection('en',async()=>{throw Error('HTTP 403');}),/403/);
 await assert.rejects(fetchProjectCollection('en',async()=>({data:[],meta:{}})),/pagination/);
 await assert.rejects(fetchProjectCollection('en',async()=>({data:[row('same','en'),row('same','en')],meta:{pagination:{page:1,pageCount:1}}})),/identity/);
 const error=new Error('Aborted');error.name='AbortError';
 await assert.rejects(fetchProjectCollection('en',async()=>{throw error;}),{name:'AbortError'});
});
test('ordering, configured featured selection/count, unlimited additions',()=>{
 const input=Array.from({length:150},(_,i)=>project(`p-${i}`));
 const config={preferredOrder:['p-10','p-2'],initialVisibleCount:6,featuredSlugs:['p-100']};
 const grouped=groupProjects(input,config);
 assert.deepEqual(grouped.primary.slice(0,3).map(p=>p.slug),['p-100','p-10','p-2']);
 assert.equal(grouped.primary.length,6);assert.equal(grouped.additional.length,144);
 assert.equal(groupProjects(input,{...config,initialVisibleCount:9}).primary.length,9);
 assert.equal(groupProjects(input,{...config,initialVisibleCount:0}).additional.length,150);
 assert.equal(input[0].slug,'p-0');
});
test('all four link combinations; invalid links and conservative initial cutover',()=>{
 const policy={homepageFlagsReviewed:true,legacyHomepageSlugs:[]};
 for(const hasHomepage of [true,false]) for(const hasRepository of [true,false]) {
  const links=projectLinkUrls(project('p',{hasHomepage,hasRepository,Homepage:'https://home.test',Repository:'https://repo.test'}),policy);
  assert.equal(Boolean(links.homepage),hasHomepage);assert.equal(Boolean(links.repository),hasRepository);
 }
 for(const value of [null,'','javascript:alert(1)','not a url','https://','https://user:pass@example.com']) {
  const links=projectLinkUrls(project('p',{hasHomepage:true,hasRepository:true,Homepage:value,Repository:value}),policy);
  assert.deepEqual(links,{homepage:null,repository:null});
 }
 const p=project('p',{hasHomepage:true,Homepage:'https://home.test'});
 assert.equal(projectLinkUrls(p,{homepageFlagsReviewed:false,legacyHomepageSlugs:[]}).homepage,null);
 assert(projectLinkUrls(p,{homepageFlagsReviewed:false,legacyHomepageSlugs:['p']}).homepage);
});
test('legacy adapter preserves numeric order and old link policy',()=>{
 const result=legacyProjectsToArray({locale:'de',Project11:project('old',{hasHomepage:true}),Project2:project('old',{hasHomepage:true,hasRepository:true}),Project1:null});
 assert.deepEqual(result.map(p=>p.slug),['legacy-project2','legacy-project11']);
 assert.equal(result[0].hasHomepage,false);assert.equal(result[0].hasRepository,false);assert.equal(result[1].hasHomepage,true);
});

test('approved production order yields six initial cards and six additional cards',()=>{
 const configModule=new Module(require('node:path').resolve('src/config/projects.ts'),module);
 configModule._compile(ts.transpileModule(fs.readFileSync('src/config/projects.ts','utf8').replaceAll('import.meta.env','({})'),{
  compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020},
 }).outputText,configModule.id);
 const {projectPresentation,projectLinks}=configModule.exports;
 const slugs=['language-coach','movie-api','myflix-react','meet-app','chat-app','myflix-angular','pokedex-app','tripcast','golden-crane-restaurant','bikeshare-app','patagonia-2025','ec-wedding'];
 const groups=groupProjects([...slugs].reverse().map(slug=>project(slug)),projectPresentation);
 assert.deepEqual(groups.primary.map(p=>p.slug),slugs.slice(0,6));
 assert.deepEqual(groups.additional.map(p=>p.slug),slugs.slice(6));
 assert.equal(groups.primary.length,6);assert.equal(groups.additional.length,6);
 assert.equal(groups.additional.at(-1).slug,"ec-wedding");
 assert(projectLinkUrls(project('p',{hasHomepage:true,Homepage:'https://example.com'}),projectLinks).homepage);
 assert.equal(projectLinkUrls(project('p',{hasHomepage:false,Homepage:'https://example.com'}),projectLinks).homepage,null);
});

test('localized rich text and image metadata pass through the adapter unchanged',async()=>{
 const blocks=[{type:'paragraph',children:[{type:'text',text:'Beschreibung',bold:true},{type:'text',text:' English',italic:true}]}];
 const images=[{id:3,url:'https://fixture/3',alternativeText:'Screenshot',width:1200,height:800}];
 const data=row('example','de',{content:{Title:'Öffentlich',Text:'Legacy text',TextBlock:blocks,Images:images}});
 const [result]=await fetchProjectCollection('de',async()=>({data:[data],meta:{pagination:{page:1,pageCount:1}}}));
 assert.deepEqual(result.TextBlock,blocks);assert.equal(result.Text,'Legacy text');
 assert.deepEqual(result.Images,images);assert.equal(result.Title,'Öffentlich');
});
