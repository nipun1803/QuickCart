import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import AccountPage from "./pages/AccountPage";
import ProductsPage from "./pages/ProductPage";
import ContactPage from "./pages/ContactPage";
// import ProductDetailPage from "./pages/ProductDetailsPage";
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
        <Route path="/contact" element={<ContactPage />} />
        {/* <Route path="/product/:id" element={<ProductDetailPage />} /> */}
        <Route path="/cart" element={<CartPage></CartPage>}></Route>
        <Route path="/about" element={<AboutPage />} /> 
      </Routes>
      <Footer />
    </>
  );
}

export default App;
