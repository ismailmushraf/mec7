// Footer.tsx
import React from 'react';
import { Youtube, Facebook, Instagram, Phone, Mail, MapPin, Heart } from 'lucide-react';
import Logo from '../../assets/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Logo className="h-10 brightness-0 invert" />
            </div>
            <p className="text-gray-400 text-sm">
              Join Chennai's most energetic fitness community. Transform your body and mind with our unique 7-minute workout routine.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Contact Coordinator</h3>
            <div className="space-y-3">
              <a href="tel:+919876543210" className="flex items-center gap-3 text-gray-400 hover:text-[#15B1F1] transition-colors group">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-[#15B1F1]/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm">Call us</p>
                  <p className="text-white font-medium">+91 98765 43210</p>
                </div>
              </a>
              <a href="mailto:coordinator@mec7.com" className="flex items-center gap-3 text-gray-400 hover:text-[#15B1F1] transition-colors group">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-[#15B1F1]/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm">Email us</p>
                  <p className="text-white font-medium">coordinator@mec7.com</p>
                </div>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm">Location</p>
                  <p className="text-white font-medium">Peruvallur, Chennai</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#FF0000] transition-all duration-300 group hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#1877F2] transition-all duration-300 group hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] transition-all duration-300 group hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Stay connected for daily workout tips, event updates, and member achievements!
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Mec7 Health Club. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Made with 
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" /> 
              by 
              <a 
                href="https://github.com/ismailmusharaf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#15B1F1] hover:text-[#15B1F1]/80 transition-colors font-medium"
              >
                Ismail Musharaf
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
