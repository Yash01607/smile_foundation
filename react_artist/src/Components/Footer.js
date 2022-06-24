import React from 'react';

import Vector from '../Assets/Images/Vector.png';
import logo from '../Assets/Images/logo.png';

import { FaFacebookSquare, FaTwitterSquare } from 'react-icons/fa';

import { BsLinkedin } from 'react-icons/bs';

function Footer() {
  return (
    <footer className="footer">
      <div className="row footer-features">
        <div>
          <img alt="easy-returns" src={Vector}></img>
          <h3>Easy Returns</h3>
        </div>
        <div>
          <img alt="easy-returns" src={Vector}></img>
          <h3>100% Hand Crafted</h3>
        </div>
        <div>
          <img alt="easy-returns" src={Vector}></img>
          <h3>Assured Quality</h3>
        </div>
      </div>
      <div className="footer-content">
        <img alt="logo" src={logo}></img>
        <p className="bold">
          World's best handicraft products by Smile Foundation.
        </p>
        <div className="row footer-icons">
          <FaFacebookSquare size={25} />
          <BsLinkedin size={25} />
          <FaTwitterSquare size={25} />
        </div>
        <div className="row contact-info">
          <div>
            <h3>Contact Us</h3>
            <p>team@smilefoundations.com</p>
            <p>+020 554622989</p>
          </div>
          <div>
            <h3>About Us</h3>
            <p>Careers</p>
            <p>Stories</p>
          </div>
          <div>
            <h3>Help</h3>
            <p>Help centre</p>
            <p>Terms and Conditions</p>
          </div>
          <div>
            <h3>Information</h3>
            <p>FAQs</p>
            <p>Provacy Policies</p>
          </div>
          <div>
            <h3>Useful Links</h3>
            <p>Terms of Use</p>
            <p>Registration Policies</p>
          </div>
        </div>
        <p>© copyrights 2020 by Smilefoundations</p>
      </div>
    </footer>
  );
}

export default Footer;
