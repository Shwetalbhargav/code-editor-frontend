import React from "react";
import { Link } from "react-router-dom";
import { FaCode } from "react-icons/fa";

const Header = () => (
  <header className="bg-blue-600 text-white p-4 shadow-md flex items-center justify-between">
    <div className="flex items-center gap-3">
      <FaCode className="text-2xl" />
      <Link to="/" className="text-xl font-bold">Code Companion IDE</Link>
    </div>
    <nav className="flex gap-4">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/about" className="hover:underline">About</Link>
    </nav>
  </header>
);

export default Header;
