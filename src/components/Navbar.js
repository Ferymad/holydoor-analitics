import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BarChart2, Upload, PieChart } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Material Order Prediction</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300"><Home className="inline-block mr-1" size={18} /> Home</Link>
          <Link to="/dashboard" className="hover:text-gray-300"><BarChart2 className="inline-block mr-1" size={18} /> Dashboard</Link>
          <Link to="/upload" className="hover:text-gray-300"><Upload className="inline-block mr-1" size={18} /> Upload</Link>
          <Link to="/analytics" className="hover:text-gray-300"><PieChart className="inline-block mr-1" size={18} /> Analytics</Link>
        </div>
      </div>
    </nav>
  );
}