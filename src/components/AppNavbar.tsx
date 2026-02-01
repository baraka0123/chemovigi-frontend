import React, { useState } from 'react';
import { LogIn, UserPlus, ChevronDown } from 'lucide-react';

interface AppNavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export function AppNavbar({ onNavigate, currentPage, isLoggedIn, onLogout }: AppNavbarProps) {
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  const mainTabs = ['Home', 'AI Features', 'Drug Info', 'DrugDatabase', 'Research', 'Contact'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('Home')}>
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center shadow-md">
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-blue-600 font-bold">Chemo</span>
                <span className="text-green-600 font-bold">Vigi</span>
              </div>
              <p className="text-xs text-gray-500">Pharmacovigilance • Patient safety</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {mainTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onNavigate(tab)}
                className="relative group px-3 py-2"
              >
                <span className={`transition-all duration-300 ${
                  currentPage === tab 
                    ? 'text-blue-600 font-semibold' 
                    : 'text-gray-600 hover:text-blue-500'
                } group-hover:scale-105 inline-block`}>
                  {tab}
                </span>
                <span className={`absolute bottom-0 left-0 h-0.5 rounded-full transition-all duration-300 ${
                  currentPage === tab 
                    ? 'w-full bg-gradient-to-r from-blue-500 to-teal-500' 
                    : 'w-0 group-hover:w-full bg-gradient-to-r from-blue-400 to-teal-400'
                }`}></span>
              </button>
            ))}
            
            {/* About Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className="relative group px-3 py-2 flex items-center gap-1"
              >
                <span className={`transition-all duration-300 ${
                  currentPage === 'About' || currentPage === 'Our Team'
                    ? 'text-blue-600 font-semibold' 
                    : 'text-gray-600 hover:text-blue-500'
                } group-hover:scale-105`}>
                  About
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''} ${
                  currentPage === 'About' || currentPage === 'Our Team' ? 'text-blue-600' : 'text-gray-600'
                }`} />
              </button>

              {/* Dropdown Menu */}
              {aboutDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                  <button
                    onClick={() => {
                      onNavigate('About');
                      setAboutDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    About ChemoVigi
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('Our Team');
                      setAboutDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    Our Team
                  </button>
                </div>
              )}
            </div>

            {/* Auth Buttons or User Menu */}
            {isLoggedIn ? (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">U</span>
                </div>
                <button
                  onClick={onLogout}
                  className="text-sm text-slate-600 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('Login')}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 rounded-lg hover:bg-blue-50"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
                
                <button
                  onClick={() => onNavigate('Register')}
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-slate-600 hover:text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Background Overlay */}
      {aboutDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setAboutDropdownOpen(false)}
        />
      )}
    </nav>
  );
}