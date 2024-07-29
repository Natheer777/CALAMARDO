import "./Contact.css";
import icon_wel from "../../assets/icons/Color Overlay2.png";

export default function Contact() {
  return (
    <>
      <div className="Contact Beverages" id="contact">
        <div className="Contact_content">
          <h1>Reservation</h1>
          <p>YOUR TABLE</p>
          <p className="img_Mes mb-5">
            <img src={icon_wel} alt="" />
          </p>
        </div>
        <div className="container Contact_form ">
          <form
            method="POST"
            action="https://formsubmit.co/Calamardo.alc@gmail.com"
            encType="multipart/form-data"
            id="Contact"
          >
            <input
              type="text"
              name="user_name"
              placeholder="Your Name*"
              required
            />

            <input
              type="email"
              name="user_email"
              required
              placeholder="Your Email"
            />

            {/* <select id="Occasion" name="user_occasion">
              <option value="Occasion" disabled defaultChecked="Occasion">Occasion*</option>
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Business">Business</option>
              <option value="Casual">Casual</option>
            </select> */}

            {/* <select id="Preferred" name="user_preferred_food">
              <option value="Preferred" disabled defaultValue="Preferred">
                Preferred Food*
              </option>
              <option value="Rice">Rice</option>
              <option value="Meat">Meat</option>
              <option value="Soup">Soup</option>
              <option value="Chicken">Chicken</option>
            </select> */}

            <input
              type="text"
              name="user_branch"
              placeholder="Branch Name*"
              required
            />
            <input
              type="number"
              name="user_persons"
              placeholder="Number of Persons"
              required
            />
            <input
              type="text"
              name="user_phone"
              placeholder="Phone Number*"
              required
            />
              <input type="date" name="user_date" id="user_date" placeholder="ssss" required />
           
            <textarea
              className="textareacontact"
              name="user_message"
              placeholder="Message"
              required
            ></textarea>

            <input type="hidden" name="_captcha" value="false" />
          <button className="submit" type="submit">
            BOOK YOUR TABLE
          </button>
          </form>
        </div>
      </div>
    </>
  );
}
