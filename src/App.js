import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import GraniteLandingBhondsi from './pages/GraniteLandingBhondsi';
import MarbleLandingSohna from './pages/MarbleLandingSohna';
import ItalianMarbleLandingGurgaon from './pages/ItalianMarbleLandingGurgaon';
import NanoTilesLanding from './pages/NanoTilesLanding';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Calculator from './components/Calculator';
import ShippingEstimator from './components/ShippingEstimator';
import InquiryForm from './components/InquiryForm';
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
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/granite-bhondsi-gurgaon" element={<GraniteLandingBhondsi />} />
          <Route path="/granite-bhondsi" element={<GraniteLandingBhondsi />} />
          <Route path="/marble-sohna-road" element={<MarbleLandingSohna />} />
          <Route path="/italian-marble-gurgaon" element={<ItalianMarbleLandingGurgaon />} />
          <Route path="/nano-tiles-gurgaon" element={<NanoTilesLanding />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/shipping" element={<ShippingEstimator />} />
          <Route path="/inquiry" element={<InquiryForm />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
