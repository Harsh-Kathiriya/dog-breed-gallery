import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          Dog Breed Gallery
        </div>

        {/* Contact Info */}
        <div className="text-white">
          <span className="block md:inline-block mr-4">Harsh Kathiriya</span>
          <a href="mailto:hckathiriya@crimson.ua.edu" className="hover:text-blue-500 underline">
            Contact: hckathiriya@crimson.ua.edu
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;