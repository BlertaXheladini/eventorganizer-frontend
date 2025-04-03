import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Dashboard from "./admin/Dashboard";
import EventThemesAdmin from "./admin/EventThemesAdmin";
import EventCategoriesAdmin from "./admin/EventCategoriesAdmin";


function App() {


  return (
    <Router>
    <Routes>
    <Route path="/" element={<Dashboard />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/eventThemesAdmin" element={<EventThemesAdmin />} />
      <Route path="/eventCategoriesAdmin" element={<EventCategoriesAdmin />} />

    </Routes>
  </Router>
  )
}

export default App
