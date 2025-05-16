import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import SnippetLoader from "./pages/SnippetLoader";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/snippet/:id" element={<SnippetLoader />} />
      </Routes>
    </div>
  );
};

export default App;
