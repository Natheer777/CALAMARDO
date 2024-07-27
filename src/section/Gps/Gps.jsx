import "./Gps.css";
import icon_wel from "../../assets/icons/Color Overlay2.png";

export default function Gps() {
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3129.0018079415527!2d-0.4847476!3d38.3489402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd62379e80476a3b%3A0x6a468488f3a1caf1!2sCALAMARDO.ALC!5e0!3m2!1sen!2snl!4v1721787689851!5m2!1sen!2snl";

  return (
    <>
      <div className="Gps Beverages container mb-5">
        <h1 className="top">Subcribe</h1>
        <p>NEWSLETTER</p>
        <p className="img_Mes mb-4">
          <img src={icon_wel} alt="" />
        </p>
        <h3 className="Gps_details mb-3 hidden">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed nisi
          sem. Nullam et lorem magna, in consecteturerat. Aliquam fermentum
          fringilla libero a vulputate. Curabitur non arcu non tortor semper
          dictum.{" "}
        </h3>
        <div style={{ width: "100%", height: "500px" }}>
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            title="Google Maps"
          ></iframe>
        </div>
      </div>
    </>
  );
}
