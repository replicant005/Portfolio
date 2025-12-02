import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          Made with <FaHeart className="heart-icon" /> by Mehak Kapur | © 2025
        </p>
      </div>
    </footer>
  );
};

export default Footer;

