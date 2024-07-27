import "./Come.css";
import image_Come from "../../assets/image/WhatsApp Image 2024-01-11 at 12.48.40 1 (1).webp";
export default function Message() {
  return (
    <>
      <div className="sec_Come">
        <div className="contentMain_Come container">
          <div className="row">
            <div className="image_Come col-lg-6 left">
              <img src={image_Come} alt="" />
            </div>
            <div className="content_Come col-lg-6">
              <h1 className="title_Come right">
                Come <span>&</span>Experiences
              </h1>
              <h3 className="subtile_Come right">Our best of orld class cuisine</h3>
              <button className="top">BOOK YOUR TABLE NOW</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
