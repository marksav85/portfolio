export const Work = () => {
  const imageStyle = {
    cursor: "pointer",
    outline: "0px",
  };
  return (
    <>
      <section id="two">
        <h2>Recent Work</h2>
        <div className="row">
          <article className="col-6 col-12-xsmall work-item">
            <a className="image fit thumb" style={imageStyle}>
              <img src="/images/thumbs/01.jpg" alt="project one image"></img>
            </a>
            <h3>Magna sed consequat tempus</h3>
            <p>Lorem ipsum dolor sit amet nisl sed nullam feugiat.</p>
          </article>
          <article className="col-6 col-12-xsmall work-item">
            <a className="image fit thumb" style={imageStyle}>
              <img src="/images/thumbs/02.jpg" alt="project two image"></img>
            </a>
            <h3>Ultricies lacinia interdum</h3>
            <p>Lorem ipsum dolor sit amet nisl sed nullam feugiat.</p>
          </article>
          <article className="col-6 col-12-xsmall work-item">
            <a className="image fit thumb" style={imageStyle}>
              <img src="/images/thumbs/03.jpg" alt="project three image"></img>
            </a>
            <h3>Tortor metus commodo</h3>
            <p>Lorem ipsum dolor sit amet nisl sed nullam feugiat.</p>
          </article>
          <article className="col-6 col-12-xsmall work-item">
            <a className="image fit thumb" style={imageStyle}>
              <img src="/images/thumbs/04.jpg" alt="project four image"></img>
            </a>
            <h3>Quam neque phasellus</h3>
            <p>Lorem ipsum dolor sit amet nisl sed nullam feugiat.</p>
          </article>
          <article className="col-6 col-12-xsmall work-item">
            <a className="image fit thumb" style={imageStyle}>
              <img src="/images/thumbs/05.jpg" alt="project five image"></img>
            </a>
            <h3>Nunc enim commodo aliquet</h3>
            <p>Lorem ipsum dolor sit amet nisl sed nullam feugiat.</p>
          </article>
          <article className="col-6 col-12-xsmall work-item">
            <a className="image fit thumb" style={imageStyle}>
              <img src="/images/thumbs/06.jpg" alt="project six image"></img>
            </a>
            <h3>Risus ornare lacinia</h3>
            <p>Lorem ipsum dolor sit amet nisl sed nullam feugiat.</p>
          </article>
        </div>
        <ul className="actions">
          <li>
            <a href="#" className="button">
              Full Portfolio
            </a>
          </li>
        </ul>
      </section>
    </>
  );
};
