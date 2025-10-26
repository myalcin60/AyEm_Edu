import React from "react";
import './Footer.css'

export default function Footer(){
  return (
    <footer className="footer">
      <div className="footer-container container-fluid">

        <div className="footer-section">
          <h4>Edulien</h4>
          <p>Digital classrooms for teachers and students.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@ayem.com</p>
          <p>Phone: +33 6 00 00 00 00</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Edulien. All rights reserved.</p>
      </div>
    </footer>
  );
};

