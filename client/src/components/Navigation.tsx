import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Home, FileText, BarChart3 } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 text-white">
            <Shield className="h-8 w-8 drop-shadow-md" />
            <span className="text-xl font-extrabold tracking-wide">SafeSpace</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/">
              <Button
                variant={isActive('/') ? 'default' : 'ghost'}
                size="sm"
                className={`flex items-center space-x-2 rounded-lg transition-all duration-300 ${
                  isActive('/')
                    ? 'bg-white text-indigo-600 shadow-md hover:scale-105'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>

            <Link to="/report">
              <Button
                variant={isActive('/report') ? 'default' : 'ghost'}
                size="sm"
                className={`flex items-center space-x-2 rounded-lg transition-all duration-300 ${
                  isActive('/report')
                    ? 'bg-white text-purple-600 shadow-md hover:scale-105'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Report Abuse</span>
              </Button>
            </Link>

            <Link to="/dashboard">
              <Button
                variant={isActive('/dashboard') ? 'default' : 'ghost'}
                size="sm"
                className={`flex items-center space-x-2 rounded-lg transition-all duration-300 ${
                  isActive('/dashboard')
                    ? 'bg-white text-pink-600 shadow-md hover:scale-105'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <Link to="/">
              <Button
                variant={isActive('/') ? 'default' : 'ghost'}
                size="icon"
                className={`rounded-full transition-transform duration-300 ${
                  isActive('/')
                    ? 'bg-white text-indigo-600 shadow-md hover:scale-110'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <Home className="h-4 w-4" />
              </Button>
            </Link>

            <Link to="/report">
              <Button
                variant={isActive('/report') ? 'default' : 'ghost'}
                size="icon"
                className={`rounded-full transition-transform duration-300 ${
                  isActive('/report')
                    ? 'bg-white text-purple-600 shadow-md hover:scale-110'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <FileText className="h-4 w-4" />
              </Button>
            </Link>

            <Link to="/dashboard">
              <Button
                variant={isActive('/dashboard') ? 'default' : 'ghost'}
                size="icon"
                className={`rounded-full transition-transform duration-300 ${
                  isActive('/dashboard')
                    ? 'bg-white text-pink-600 shadow-md hover:scale-110'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
