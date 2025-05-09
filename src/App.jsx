import { useState } from "react";
// import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import viteLogo from "/vite.svg";
import "./App.css";
import AccountPage from "./pages/AccountPage";
import ProductsPage from "./pages/Product";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<AccountPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </Router>
    </> 
  );
}

export default App;
