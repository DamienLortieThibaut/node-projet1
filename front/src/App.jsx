import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import Custom from './pages/Custom/Custom';
import Accounting from './pages/Accounting/Accounting';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { isProtectRouteWithRoles, isAuthenticated } from './utils/helpers';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header /> 
      <Routes>
        {/* Utiliser protectRouteWithRoles pour protéger l'accès aux pages */}
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={isProtectRouteWithRoles(['admin']) ? <Admin /> : <Navigate to="/" />}
        />
        <Route
          path="/accounting"
          element={isProtectRouteWithRoles(['admin', 'accounter']) ? <Accounting /> : <Navigate to="/" />}
        />
        <Route
          path="/custom/:id"
          element={isAuthenticated() ? <Custom /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer /> 
    </BrowserRouter>
  );
}

export default App;