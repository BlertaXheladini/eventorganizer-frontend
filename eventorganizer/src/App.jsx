import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Dashboard from "./admin/Dashboard";
import ProtectedRoute from "./admin/ProtectedRoute"; // Importo ProtectedRoute
import EventThemesAdmin from "./admin/EventThemesAdmin";
import EventCategoriesAdmin from "./admin/EventCategoriesAdmin";
import EventsAdmin from "./admin/EventsAdmin";
import RestaurantTypesAdmin from "./admin/RestaurantTypesAdmin";
import RestaurantsAdmin from "./admin/RestaurantsAdmin";
import StaffAdmin from "./admin/StaffAdmin"; 
import ContactAdmin from './admin/ContactAdmin';
import Users from "./admin/Users";
import Reservations from "./admin/Reservations"
import Home from "./user/Home/Home";
import AboutUs from "./user/AboutUs/AboutUs.jsx";
import RestaurantList from "./user/Restaurants/RestaurantList";
import Login from "./login/Login";
import Register from "./register/Register";
import RestaurantDetails from "./user/Restaurants/RestaurantDetails";
import EventList from "./user/Events/EventList";
import EventDetails from "./user/Events/EventDetails";
import StaffList from "./user/Staff/StaffList"; 
import FeedbackAdmin from "./admin/FeedbackAdmin";
import AddFeedback from "./user/Home/AddFeedback.jsx";
import Contact from "./user/Contact/Contact";
import UserReservation from "./user/UserReservations/UserReservation";
import PaymentForm from "./user/Payment/PaymentForm";
import UserProfile from "./user/UserProfile/UserProfile.jsx";


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
