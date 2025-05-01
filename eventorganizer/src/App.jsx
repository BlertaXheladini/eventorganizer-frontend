import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Dashboard from "./admin/Dashboard";
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
import AboutUs from "./user/AboutUs/AboutUs";
import RestaurantList from "./user/Restaurants/RestaurantList";
import Login from "./login/login";
import Register from "./register/Register";
import RestaurantDetails from "./user/Restaurants/RestaurantDetails";
import EventList from "./user/Events/EventList";
import EventDetails from "./user/Events/EventDetails";
import StaffList from "./user/Staff/StaffList"; 
import FeedbackAdmin from "./Admin/FeedbackAdmin";
import AddFeedback from "./user/Home/AddFeedback.jsx";
import Contact from "./user/Contact/Contact";
import UserReservation from "./user/UserReservations/UserReservation";
import PaymentForm from "./user/Payment/PaymentForm";
import UserProfile from "./user/UserProfile/UserProfile.jsx";

function App() {


  return (
    <Router>
    <Routes>

     {/*Admin Part*/}
     <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/eventsAdmin" element={<EventsAdmin />} />
    <Route path="/restaurantTypesAdmin" element={<RestaurantTypesAdmin />} />
      <Route path="/eventThemesAdmin" element={<EventThemesAdmin />} />
      <Route path="/eventCategoriesAdmin" element={<EventCategoriesAdmin />} />
      <Route path="/restaurantsAdmin" element={<RestaurantsAdmin />} />
      <Route path="/staffAdmin" element={<StaffAdmin />} />
      <Route path="/contactAdmin" element={<ContactAdmin />} />
      <Route path="/users" element={<Users />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/restaurantlist" element={<RestaurantList/>} />
      <Route path="/restaurant/:id" element={<RestaurantDetails />} />
      <Route path="/eventlist" element={<EventList />} />
      <Route path="/event/:id" element={<EventDetails />} />
      <Route path="/stafflist" element={<StaffList />} />
      <Route path="/feedbackAdmin" element={<FeedbackAdmin/>} />
      <Route path="/addfeedback" element={<AddFeedback />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/reservationForUser" element = {<UserReservation/>}/>
      <Route path="/paymentform" element = {<PaymentForm/>}/>
       <Route path="/" element={<Home />} />
       <Route path="/home" element={<Home />} />
       <Route path="/aboutus" element={<AboutUs />} />
       <Route path="/profile" element={<UserProfile />} />
    </Routes>
  </Router>
  )
}

export default App
