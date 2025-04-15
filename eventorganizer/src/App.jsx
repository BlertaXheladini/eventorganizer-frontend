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


function App() {


  return (
    <Router>
    <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/eventsAdmin" element={<EventsAdmin />} />
    <Route path="/restaurantTypesAdmin" element={<RestaurantTypesAdmin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/eventThemesAdmin" element={<EventThemesAdmin />} />
      <Route path="/eventCategoriesAdmin" element={<EventCategoriesAdmin />} />
      <Route path="/restaurantsAdmin" element={<RestaurantsAdmin />} />
      <Route path="/staffAdmin" element={<StaffAdmin />} />
      <Route path="/contactAdmin" element={<ContactAdmin />} />
      <Route path="/users" element={<Users />} />
      <Route path="/reservations" element={<Reservations />} />

    </Routes>
  </Router>
  )
}

export default App
