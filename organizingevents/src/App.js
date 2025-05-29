import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./Admin/ProtectedRoute"; // Importo ProtectedRoute

// Admin Components
import Dashboard from "./Admin/Dashboard";
import EventThemesAdmin from "./Admin/EventThemesAdmin";
import EventCategoriesAdmin from "./Admin/EventCategoriesAdmin";
import EventsAdmin from "./Admin/EventsAdmin";
import RestaurantTypesAdmin from "./Admin/RestaurantTypesAdmin";
import RestaurantsAdmin from "./Admin/RestaurantsAdmin";
import StaffAdmin from "./Admin/StaffAdmin";
import ContactAdmin from './Admin/ContactAdmin';
import Users from "./Admin/Users";
import Reservations from "./Admin/Reservations";
import FeedbackAdmin from "./Admin/FeedbackAdmin";
import PredictParticipants from "./Admin/PredictParticipants";

// User Components
import Login from "./Login/Login";
import Register from "./Register/Register";
import Home from "./User/Home/Home";
import AboutUs from "./User/AboutUs/aboutus";
import RestaurantList from "./User/Restaurants/RestaurantList";
import RestaurantDetails from "./User/Restaurants/RestaurantDetails";
import EventList from "./User/Events/EventList";
import EventDetails from "./User/Events/EventDetails";
import StaffList from "./User/Staff/StaffList";
import AddFeedback from "./User/Home/AddFeedback";
import Contact from "./User/Contact/Contact";
import UserReservation from "./User/UserReservations/UserReservation";
import PaymentForm from "./User/Payment/PaymentForm";
import UserProfile from "./User/UserProfile/UserProfile";
import ForgotPassword from "./Login/ForgotPassword";

function App() {
  return (
    <Router>
      <Routes>

        {/* Admin Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['1', '2']}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/eventsAdmin" element={
          <ProtectedRoute allowedRoles={['1', '2']}>
            <EventsAdmin />
          </ProtectedRoute>
        } />
        <Route path="/eventThemesAdmin" element={
          <ProtectedRoute allowedRoles={['1', '2']}>
            <EventThemesAdmin />
          </ProtectedRoute>
        } />
        <Route path="/eventCategoriesAdmin" element={
          <ProtectedRoute allowedRoles={['1', '2']}>
            <EventCategoriesAdmin />
          </ProtectedRoute>
        } />
        <Route path="/restaurantTypesAdmin" element={
          <ProtectedRoute allowedRoles={['1', '2']}>
            <RestaurantTypesAdmin />
          </ProtectedRoute>
        } />
        <Route path="/restaurantsAdmin" element={
          <ProtectedRoute allowedRoles={['1', '2']}>
            <RestaurantsAdmin />
          </ProtectedRoute>
        } />
        <Route path="/staffAdmin" element={
          <ProtectedRoute allowedRoles={['1', '2']}>
            <StaffAdmin />
          </ProtectedRoute>
        } />
        <Route path="/contactAdmin" element={
          <ProtectedRoute allowedRoles={['1', '2']}>
            <ContactAdmin />
          </ProtectedRoute>
        } />
        <Route path="/users" element={
          <ProtectedRoute allowedRoles={['1', '2']}>
            <Users />
          </ProtectedRoute>
        } />
        <Route path="/reservations" element={
          <ProtectedRoute allowedRoles={['1', '2']}>
            <Reservations />
          </ProtectedRoute>
        } />
        <Route path="/feedbackAdmin" element={
          <ProtectedRoute allowedRoles={['1', '2']}>
            <FeedbackAdmin />
          </ProtectedRoute>
        } />
        <Route path="/predictParticipants" element={
          <ProtectedRoute allowedRoles={['1', '2']}>
            <PredictParticipants />
          </ProtectedRoute>
        } />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Protected Routes */}
        <Route path="/profile" element={
          <ProtectedRoute requiresAuth>
            <UserProfile />
          </ProtectedRoute>
        } />
        <Route path="/eventlist" element={
          <ProtectedRoute requiresAuth>
            <EventList />
          </ProtectedRoute>
        } />
        <Route path="/event/:id" element={
          <ProtectedRoute requiresAuth>
            <EventDetails />
          </ProtectedRoute>
        } />
        <Route path="/restaurantlist" element={
          <ProtectedRoute requiresAuth>
            <RestaurantList />
          </ProtectedRoute>
        } />
        <Route path="/restaurant/:id" element={
          <ProtectedRoute requiresAuth>
            <RestaurantDetails />
          </ProtectedRoute>
        } />

        {/* Public User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/stafflist" element={<StaffList />} />
        <Route path="/addfeedback" element={<AddFeedback />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reservationForUser" element={<UserReservation />} />
        <Route path="/paymentform" element={<PaymentForm />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />


      </Routes>
    </Router>
  );
}

export default App;
