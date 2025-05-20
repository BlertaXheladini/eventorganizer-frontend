import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Dashboard from "./admin/Dashboard.jsx";
import ProtectedRoute from "./admin/ProtectedRoute.jsx"; // Importo ProtectedRoute
import EventThemesAdmin from "./admin/EventThemesAdmin.jsx";
import EventCategoriesAdmin from "./admin/EventCategoriesAdmin.jsx";
import EventsAdmin from "./admin/EventsAdmin.jsx";
import RestaurantTypesAdmin from "./admin/RestaurantTypesAdmin.jsx";
import RestaurantsAdmin from "./admin/RestaurantsAdmin.jsx";
import StaffAdmin from "./admin/StaffAdmin.jsx"; 
import ContactAdmin from './admin/ContactAdmin.jsx';
import Users from "./admin/Users.jsx";
import Reservations from "./admin/Reservations.jsx"
import Home from "./user/Home/Home.jsx";
import AboutUs from "./user/AboutUs/AboutUs.jsx";
import RestaurantList from "./user/Restaurants/RestaurantList.jsx";
import Login from "./login/Login.jsx";
import Register from "./register/Register.jsx";
import RestaurantDetails from "./user/Restaurants/RestaurantDetails.jsx";
import EventList from "./user/Events/EventList.jsx";
import EventDetails from "./user/Events/EventDetails.jsx";
import StaffList from "./user/Staff/StaffList.jsx"; 
import FeedbackAdmin from "./admin/FeedbackAdmin.jsx";
import AddFeedback from "./user/Home/AddFeedback.jsx";
import Contact from "./user/Contact/Contact.jsx";
import UserReservation from "./user/UserReservations/UserReservation.jsx";
import PaymentForm from "./user/Payment/PaymentForm.jsx";
import UserProfile from "./user/UserProfile/UserProfile.jsx";
import ForgotPassword from "./login/ForgotPassword";
import ResetPassword from "./login/ResetPassword";


function App() {


  return (
    <Router>
    <Routes>
      {/* Admin Part - Rrugë të mbrojtura me role */}
      <Route
           path="/dashboard"
           element={
             <ProtectedRoute allowedRoles={['1', '2']}> {/* '1' për SuperAdmin dhe '2' për MOD */}
               <Dashboard />
             </ProtectedRoute>
           }
         />
         <Route
           path="/eventsAdmin"
           element={
             <ProtectedRoute allowedRoles={['1', '2']}>
               <EventsAdmin />
             </ProtectedRoute>
           }
         />
         <Route
           path="/eventThemesAdmin"
           element={
             <ProtectedRoute allowedRoles={['1', '2']}>
               <EventThemesAdmin />
             </ProtectedRoute>
           }
         />
         <Route
           path="/eventCategoriesAdmin"
           element={
             <ProtectedRoute allowedRoles={['1', '2']}>
               <EventCategoriesAdmin />
             </ProtectedRoute>
           }
         />
         <Route
           path="/restaurantTypesAdmin"
           element={
             <ProtectedRoute allowedRoles={['1', '2']}>
               <RestaurantTypesAdmin />
             </ProtectedRoute>
           }
         />
         <Route
           path="/restaurantsAdmin"
           element={
             <ProtectedRoute allowedRoles={['1', '2']}>
               <RestaurantsAdmin />
             </ProtectedRoute>
           }
         />
         <Route
           path="/staffAdmin"
           element={
             <ProtectedRoute allowedRoles={['1', '2']}>
               <StaffAdmin />
             </ProtectedRoute>
           }
         />
         <Route
           path="/contactAdmin"
           element={
             <ProtectedRoute allowedRoles={['1', '2']}>
               <ContactAdmin />
             </ProtectedRoute>
           }
         />
         <Route
           path="/users"
           element={
             <ProtectedRoute allowedRoles={['1', '2']}>
               <Users />
             </ProtectedRoute>
           }
         />
         <Route
           path="/reservations"
           element={
             <ProtectedRoute allowedRoles={['1', '2']}>
               <Reservations />
             </ProtectedRoute>
           }
         />
         <Route
           path="/feedbackAdmin"
           element={
             <ProtectedRoute allowedRoles={['1', '2']}>
               <FeedbackAdmin />
             </ProtectedRoute>
           }
         />

                 {/* Login and Register */}
                 <Route path="/login" element={<Login />} />
                 <Route path="/register" element={<Register />} />
                 <Route path="/forgot-password" element={<ForgotPassword />} />
                 <Route path="/reset-password" element={<ResetPassword />} />
 
         {/* User Part - Rrugë të mbrojtura për përdoruesit e loguar */}
         <Route
           path="/profile"
           element={
             <ProtectedRoute requiresAuth> {/* Kjo kontrollon nëse është i loguar */}
               <UserProfile />
             </ProtectedRoute>
           }
         />
         <Route
           path="/eventlist"
           element={
             <ProtectedRoute requiresAuth> {/* Kjo kontrollon nëse është i loguar */}
               <EventList />
             </ProtectedRoute>
           }
         />
         <Route
           path="/event/:id"
           element={
             <ProtectedRoute requiresAuth> {/* Kjo kontrollon nëse është i loguar */}
               <EventDetails />
             </ProtectedRoute>
           }
         />
         <Route
           path="/restaurantlist"
           element={
             <ProtectedRoute requiresAuth> {/* Kjo kontrollon nëse është i loguar */}
               <RestaurantList />
             </ProtectedRoute>
           }
         />
         <Route
           path="/restaurant/:id"
           element={
             <ProtectedRoute requiresAuth> {/* Kjo kontrollon nëse është i loguar */}
               <RestaurantDetails />
             </ProtectedRoute>
           }
         />
 
         {/* Rrugët e tjera të përdoruesve */}
         <Route path="/" element={<Home />} />
         <Route path="/aboutus" element={<AboutUs />} />
         <Route path="/stafflist" element={<StaffList />} />
         <Route path="/addfeedback" element={<AddFeedback />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="/reservationForUser" element={<UserReservation />} />
         <Route path="/paymentform" element={<PaymentForm />} />

    
    </Routes>
  </Router>
  )
}

export default App
