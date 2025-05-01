// ProtectedRoute.jsx
 import React from 'react';
 import { Navigate } from 'react-router-dom';
 
 const ProtectedRoute = ({ children, allowedRoles, requiresAuth }) => {
   const accessToken = localStorage.getItem('accessToken'); // Kontrollo nëse ekziston accessToken
   const userRole = localStorage.getItem('roleId'); // Lexo rolin e përdoruesit
 
   if (requiresAuth && !accessToken) {
     // Nëse përdoruesi nuk është i loguar, ridrejtoje në login
     return <Navigate to="/login" replace />;
   }
 
   if (allowedRoles && !allowedRoles.includes(userRole)) {
     // Nëse roli i përdoruesit nuk është i autorizuar, ridrejtoje në faqen kryesore
     return <Navigate to="/" replace />;
   }
 
   // Nëse kushtet përmbushen, shfaq komponentin fëmijë
   return children;
 };
 
 export default ProtectedRoute;