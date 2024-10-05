import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Upload } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Material Order Prediction</h1>
      <p className="text-xl mb-8">Optimize your inventory with data-driven predictions</p>
      <div className="space-x-4">
        <Link to="/dashboard" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          View Dashboard <ArrowRight className="inline-block ml-1" size={18} />
        </Link>
        <Link to="/upload" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Upload Data <Upload className="inline-block ml-1" size={18} />
        </Link>
      </div>
    </div>
  );
}