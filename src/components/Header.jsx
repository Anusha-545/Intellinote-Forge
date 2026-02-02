import React, { useState } from 'react';
import { Menu, X, FileText, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Intellinote Forge</h1>
              <p className="text-xs text-gray-500">AI-Powered PDF Processing</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to='/' className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">
              Home
            </Link>
            <Link to='/chat' className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">
              Upload
            </Link>
            <Link to='/about' className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">
              About
            </Link>
            <Link to='/contact' className="text-gray-700 hover:text-blue-600 font-medium transition duration-300">
              Contact
            </Link>
            
            <div className="flex items-center space-x-4"
            
            >
              <button className="text-gray-700 hover:text-blue-600 font-medium py-2 px-4 transition duration-300 flex items-center gap-2"
              onClick={() => navigate('/login')}
              >
                <User size={18} />
                Login
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
              onClick={() => navigate('/register')}
              >
                Register
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-4">
              <Link to='/' className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Home
              </Link>
              <Link to='/chat' className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Upload
              </Link>
              <Link to='/about' className="text-gray-700 hover:text-blue-600 font-medium py-2">
                About
              </Link>
              <Link to='/contact' className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Contact
              </Link>
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <button className="text-gray-700 hover:text-blue-600 font-medium py-2 text-left flex items-center gap-2"
                onClick={() => navigate('/login')}
                >
                  <User size={18} />
                  Login
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg text-center"
                onClick={() => navigate('/register')}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;