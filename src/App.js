import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart';
import Calculator from './components/Calculator';
import ShippingEstimator from './components/ShippingEstimator';
import InquiryForm from './components/InquiryForm';
import SEO from './components/SEO';
import WhatsAppWidget from './components/WhatsAppWidget';

function Layout({ children }) {
  return (
    <div>
      <main>
        {children}
      </main>
      <WhatsAppWidget phone="918107707064" message="Hi! I am interested in tiles in Gurgaon." />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <SEO title="Tiles in Gurgaon" />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/shipping" element={<ShippingEstimator />} />
          <Route path="/inquiry" element={<InquiryForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
