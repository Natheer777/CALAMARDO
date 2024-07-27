import "./Footer.css";
export default function Footer() {
  return (
    <>
      <div className="Footer">
        <div className="Footer_items container">
          <div className="Logo">
            <a className="navbar-brand" href="">
              CALAMARDO
            </a>
          </div>
          <div className="Ourlocation">
            <ul>
              <h2>Our Location </h2>
              <li>
                Peppery Head Office
                <p className="diffrent">1422 1st St. Santa Rosa,t CA 94559.</p>
                <p className="diffrent">Texas, USA</p>
              </li>
              <li>
                Call for Reservations: <span> (002) 255-0211</span>
              </li>
              <li>
                HotLine: <span> (002) 255-0211</span>
              </li>
              <li>
                Fax: <span> (002) 255-0211</span>
              </li>
              <li>
                E-mail: <span> admin@e-mail.com</span>
              </li>
            </ul>
          </div>
          <div className="times">
            <ul>
              <h2>Opening Times</h2>
              <li>
                Monday <span>pm - 10 pm</span>
              </li>
              <li>
                Tuesday <span>pm - 10 pm </span>
              </li>
              <li>
                Wednesday <span> pm - Midnight </span>
              </li>
              <li>
                Thursday <span> 1pm - Midnight </span>
              </li>
              <li>
                Friday <span> 1pm - Midnight </span>
              </li>
              <li>
                Saturday <span className="closed">CLOSED</span>
              </li>
              <li>
                Sunday <span> 1 pm - 10 pm </span>
              </li>
            </ul>
         
          </div>
          {/* <div className="instagram">
          <ul>
              <h2>Calamaro Instgram</h2>

              <li className="Image"></li>
              <li className="Image"></li>
              <li className="Image"></li>
              <li className="Image"></li>
              <li className="Image"></li>
              <li className="Image"></li>
              <li className="Image"></li>
              <li className="Image"></li>
        
            </ul>
          </div> */}
        </div>
        <div className="copyRhite">
          <h3>© 2024 ALL RIGHT RESERVED. DESIGNED BY <span> CALAMARDO </span></h3>
        </div>
      </div>
    </>
  );
}
