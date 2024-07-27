import "./Message.css";
import icon_wel from "../../assets/icons/Color Overlay2.png";
import image_Mes from "../../assets/image/WhatsApp Image 2023-03-21 at 14.28.16 1 (2).webp";
export default function Message() {
  return (
    <>
      <div className="sec_Mes" >
        <div className="contentMain_Mes container">
          <div className="row">
            <div className="content_Mes col-lg-6">
              <h1 className="title_Mes left">Message</h1>
              <h3 className="subtile_Mes left">CHEF</h3>
              <p className="img_Mes">
                <img src={icon_wel} alt="" />
              </p>
              <p className="pargraph_Mes left">
                Our chefs will make the five star look & taste get to your door
                in no time. Enjoy spending time with your family at your house
                while still having the most delicious food ever.
              </p>
            </div>
            <div className="image_Mes col-lg-6 right">
              <img src={image_Mes} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
