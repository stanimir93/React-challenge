import "./footer.css";
import React from "react";
import { FaTwitter, FaFacebook, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer(props) {
  return (
    <footer>
      <div className='footer-container'>
        <p>© React Take Home Challenge</p>
        <address className='footer__links'>
          <a className='footer__link' href='http://twitter.com' title='Go to Twitter' target='_blank'>
            <FaTwitter />
          </a>
          <a className='footer__link' href='http://facebook.com' title='Go to Facebook' target='_blank'>
            <FaFacebook />
          </a>
          <a className='footer__link' href='http://linkedin.com' title='Go to LinkedIn' target='_blank'>
            <FaLinkedin />
          </a>
          <a className='footer__link' href='mailto:test@test.com' title='Send an Email' target='_blank'>
            <FaEnvelope />
          </a>
        </address>
      </div>
    </footer>
  );
}
