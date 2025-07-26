import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";

import Navbar from "./components/Navbar";
import AccountPage from "./pages/AccountPage";
import ProductsPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import HomePage from './pages/HomePage'
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage"; 

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<AccountPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage></CartPage>}></Route>
        <Route path="/about" element={<AboutPage />} /> 
      </Routes>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#333',
            border: '1px solid var(--primary-color)',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(255, 102, 0, 0.15)',
          },
          success: {
            iconTheme: {
              primary: 'var(--primary-color)',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default App;
