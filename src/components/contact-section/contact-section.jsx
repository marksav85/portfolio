export const Contact = () => {
  return (
    <>
      <section id="three">
        <h2>Get In Touch</h2>
        <p>
          Accumsan pellentesque commodo blandit enim arcu non at amet id arcu
          magna. Accumsan orci faucibus id eu lorem semper nunc nisi lorem
          vulputate lorem neque lorem ipsum dolor.
        </p>
        <div className="row">
          <div className="col-4 col-12-small">
            <ul className="labeled-icons">
              <li>
                <h3 className="icon solid fa-home">
                  <span className="label">Address</span>
                </h3>
                1234 Somewhere Rd.
                <br />
                Nashville, TN 00000
                <br />
                United States
              </li>
              <li>
                <h3 className="icon solid fa-mobile-alt">
                  <span className="label">Phone</span>
                </h3>
                000-000-0000
              </li>
              <li>
                <h3 className="icon solid fa-envelope">
                  <span className="label">Email</span>
                </h3>
                <a href="#">hello@untitled.tld</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};
