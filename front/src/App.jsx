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
import ProtectedRouteWithRoles from './utils/ProtectedRouteWithRoles';
import { AuthProvider, useAuth } from './utils/provider';
import ProtectedRouteWithLogin from './utils/ProtectedRouteWithLogin';


function App() {

  return (
    <AuthProvider>

    <BrowserRouter>
      <Header /> 
      <Routes>
        {/* Utiliser protectRouteWithRoles pour protéger l'accès aux pages */}
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={<ProtectedRouteWithRoles redirectPath="/" requiredRoles={['admin']}> <Admin /></ProtectedRouteWithRoles>}
        />
        <Route
          path="/accounting"
          element={<ProtectedRouteWithRoles redirectPath="/" requiredRoles={['admin', 'accounter']}> <Accounting /></ProtectedRouteWithRoles>}
        />
        <Route
          path="/custom/:id"
          element={<ProtectedRouteWithLogin redirectPath="/" ><Custom /></ProtectedRouteWithLogin>}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer /> 
    </BrowserRouter>
    </ AuthProvider >

  );
}

export default App;