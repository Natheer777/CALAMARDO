import './Header.css'
import IconHeader from '../../assets/icons/Color Overlay.png'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';
export default function Header() {
  return (


<div className='header_sec'>
  <nav className="container navbar navbar-expand-lg navbar-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">CALAMARDO</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#/">HOME</a>
        </li>
  
        <li className="nav-item">
          <a className="nav-link" href="#about">ABOUT</a>
        </li>
    
        <li className="nav-item">
          <a className="nav-link" href="#menu">MENU</a>
        </li>
    
        <li className="nav-item">
          <a className="nav-link" href="#services">SERVICES</a>
        </li>
    
        <li className="nav-item">
          <a className="nav-link" href="#contact">CONTACT US</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://www.facebook.com/share/Yp2sw9LYDYxVSPZ1/" target='_blank'><FaFacebookF /></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://www.instagram.com/calamardo.alc?igsh=NTc4MTIwNjQ2YQ==" target='_blank'><FaInstagram /></a>
        </li>
        <li className="nav-item login">
                  <Link className="nav-link" to="/Login">
                    <button>Log in</button>
                  </Link>

    </li>
    
      </ul>
    </div>
  </div>
  </nav>

  <div className='Header'>
  <img className='top' src={IconHeader} alt="" />
  <hr />
  <h1 className='left'>Eatin' Good in Calamaro seafoods.</h1>
  <hr />
  <p className='right'>COME & EXPERIENCES OUR BEST OF WORLD CLASS CUISINE</p>
  <a href="#menu">

  <button className='top'>BROWSE OUR MENU</button>
  </a>
  </div>
  </div>
  
  )
}
