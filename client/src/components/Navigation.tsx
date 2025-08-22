import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Home, FileText, BarChart3 } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card shadow-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">SafeSpace</span>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/">
              <Button
                variant={isActive('/') ? 'default' : 'ghost'}
                size="sm"
                className="flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>

            <Link to="/report">
              <Button
                variant={isActive('/report') ? 'default' : 'ghost'}
                size="sm"
                className="flex items-center space-x-2"
              >
                <FileText className="h-4 w-4" />
                <span>Report Abuse</span>
              </Button>
            </Link>

            <Link to="/dashboard">
              <Button
                variant={isActive('/dashboard') ? 'default' : 'ghost'}
                size="sm"
                className="flex items-center space-x-2"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
            </Link>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-2">
            <Link to="/">
              <Button variant={isActive('/') ? 'default' : 'ghost'} size="icon">
                <Home className="h-4 w-4" />
              </Button>
            </Link>

            <Link to="/report">
              <Button variant={isActive('/report') ? 'default' : 'ghost'} size="icon">
                <FileText className="h-4 w-4" />
              </Button>
            </Link>

            <Link to="/dashboard">
              <Button variant={isActive('/dashboard') ? 'default' : 'ghost'} size="icon">
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
