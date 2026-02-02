import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Intellinote Forge</h2>
            </div>
            <p className="text-gray-400 mb-4">
              Transform your PDFs with AI-powered text extraction and smart summarization using Groq AI technology.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                <Link
                  key={social}
                  to={social} 
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Upload PDF', 'Dashboard', 'Pricing', 'Documentation'].map((link) => (
                <li key={link}>
                  <Link
                    to={link}
                    className="text-gray-400 hover:text-white transition duration-300 hover:pl-2 block"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-400 mt-1" />
                <span>support@intellinoteforge.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-blue-400 mt-1" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                <span>San Francisco, CA 94107</span>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Policies</h3>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Data Processing Agreement'].map((policy) => (
                <li key={policy}>
                  <Link
                    to={policy} 
                    className="text-gray-400 hover:text-white transition duration-300 hover:pl-2 block"
                  >
                    {policy}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Intellinote Forge. All rights reserved.
            </p>
            <p className="text-gray-400 flex items-center justify-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> for the AI community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;