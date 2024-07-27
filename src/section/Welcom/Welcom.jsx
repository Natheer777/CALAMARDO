import './Welcom.css'
import icon_wel from "../../assets/icons/Color Overlay2.png"
export default function Welcom() {
  return (
    <>
    <div className='sec_wel 'id="about">
    <div className="content_wel">
    <h1 className='title_wel top'>Welcom</h1>
    <h3 className='subtile_wel'>Message</h3>
    <p className='img_wel'>
        <img src={icon_wel} alt="" />
    </p>
    <p className='pargraph_wel hidden'>Welcome to <span>CALAMARO.</span> Each meal from our restaurant is much more than its ingredients. It is a precise balance of science and craft. It takes patience and time, and is the result of experimentation, refinement, and physical hard work.</p>
    </div>
    <div className="images_Wel">
        <div className="img img1 top"></div>
        <div className="img img2 top"></div>
        <div className="img img3 top"></div>
    </div>
    </div>
    </>
  )
}
