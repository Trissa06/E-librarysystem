import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';

const DashboardLayout = () => {
  return (
    // "flex" puts items side-by-side. "h-screen" makes it full height.
    <div className="flex h-screen bg-gray-50 w-full overflow-hidden">
      
      {/* 1. Sidebar stays fixed on the left */}
      <Sidebar />

      {/* 2. Main Content takes up the rest of the space */}
      <div className="flex-1 h-full overflow-y-auto bg-gray-50">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
           <Outlet /> 
        </div>
      </div>

    </div>
  );
};

export default DashboardLayout;