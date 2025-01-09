import { FaInstagram } from "react-icons/fa";
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
                {/* Peppery Head Office */}
                <p className="diffrent">C. San Vicente, 16, 03004 Alicante, Spain</p>
                {/* <p className="diffrent">Texas, USA</p> */}
              </li>
              <li>
                Call for Reservations: <span>+34695863594</span>
              </li>
              {/* <li>
                HotLine: <span> (002) 255-0211</span>
              </li> */}
              {/* <li>
                Fax: <span> (002) 255-0211</span>
              </li> */}
              {/* <li>
                E-mail: <span> admin@e-mail.com</span>
              </li> */}
              <li>
                <a className="instagram" href="https://www.instagram.com/calamardo.alc/" target="_blank"><FaInstagram /></a>
              </li>
            </ul>
          </div>
          <div className="times">
            <ul>
              <h2>Opening Times</h2>
              <li>
                Monday <span>12:30 pm – 11 pm</span>
              </li>
              <li>
                Tuesday <span>12:30 pm – 11 pm</span>
              </li>
              <li>
                Wednesday <span>12:30 pm – 11 pm</span>
              </li>
              <li>
                Thursday <span>12:30 pm – 11 pm</span>
              </li>
              <li>
                Friday <span>12:30 pm – 11 pm</span>
              </li>
              <li>
                Saturday <span>12:30 pm – 11 pm</span>
              </li>
              <li>
                Sunday <span>12:30 pm – 11 pm</span>
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
