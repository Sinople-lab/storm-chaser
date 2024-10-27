// Martin Carballo Flores
// october 25/2024
// ------------------------------------------
import React from 'react';
import { Phone, Mail, Github } from 'lucide-react';
// ------------------------------------------
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8 footr">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <a href="tel:2282128716" className="flex items-center space-x-2">
            <Phone size={18} />
            <span>2282128716</span>
          </a>
          <a href="mailto:sinoplegales@gmail.com" className="flex items-center space-x-2">
            <Mail size={18} />
            <span>sinoplegales@gmail.com</span>
          </a>
        </div>
        <div>
          <a href="https://github.com/Sinople-lab" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
            <Github size={18} />
            <span>Ashur-lab</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;