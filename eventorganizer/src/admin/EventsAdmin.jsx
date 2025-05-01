import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "./include/Navbar";
import Sidebar from "./include/Sidebar";
import { useNavigate } from "react-router-dom";
import "./Style.css";

function EventsAdmin() {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const Toggle = () => {
    setToggle(!toggle);
  };

  const [id, setId] = useState("");
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [themeId, setThemeId] = useState(""); 
  const [eventCategories, setEventCategories] = useState([]);
  const [eventThemes, setEventThemes] = useState([]); 
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const inputFileRef = useRef(null);

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); 
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const cancel = () => {
    setIsFormVisible(false);
    clearForm();
  };

  const clearForm = () => {
    setId("");
    setEventName("");
    setDescription("");
    setImage("");
    setSelectedImage(null);
    setPrice("");
    setCategoryId("");
    setThemeId("");
  };

  useEffect(() => {
    (async () => {
      await loadEventCategories();
      await loadEventThemes();
      await loadEvents();
    })();
  }, []);

  async function loadEventCategories() {
    try {
      const result = await axios.get("http://localhost:5091/api/EventCategories/GetAllList");
      setEventCategories(result.data);
    } catch (err) {
      console.error("Error loading event categories:", err);
    }
  }

  async function loadEventThemes() {
    try {
      const result = await axios.get("http://localhost:5091/api/EventThemes/GetAllList");
      setEventThemes(result.data);
    } catch (err) {
      console.error("Error loading event themes:", err);
    }
  }

  async function loadEvents() {
    try {
      const result = await axios.get("http://localhost:5091/api/Events/GetAllList");
      setEvents(result.data);
    } catch (err) {
      console.error("Error loading events:", err);
    }
  }

  async function save(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5091/api/Events/Add", {
        eventName: eventName,
        description: description,
        image: image,
        price: price,
        categoryId: categoryId,
        themeId: themeId,
      });
      showAlert("The event has been successfully registered!", "alert-success");
      clearForm();
      setIsFormVisible(false);
      loadEvents();
    } catch (err) {
      showAlert(`Error: ${err.response.data}`, "alert-danger");
    }
  }

  async function editEvents(event) {
    setId(event.id);
    setEventName(event.eventName);
    setDescription(event.description);
    setImage(event.image);
    setSelectedImage(event.image);
    setPrice(event.price);
    setCategoryId(event.categoryId);
    setThemeId(event.themeId);
    setIsFormVisible(true);
  }

  async function deleteEvents(eventId) {
    try {
      await axios.delete(`http://localhost:5091/api/Events/Delete?Id=${eventId}`);
      showAlert("The event has been successfully deleted!", "alert-success");
      loadEvents();
    } catch (err) {
      showAlert(`Error: ${err.response.data}`, "alert-danger");
    }
  }

  async function update(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5091/api/Events/Update/${id}`, {
        id: id,
        eventName: eventName,
        description: description,
        image: image,
        price: price,
        categoryId: categoryId,
        themeId: themeId,
      });
      showAlert("The event has been successfully updated!", "alert-success");
      clearForm();
      setIsFormVisible(false);
      loadEvents();
    } catch (err) {
      showAlert(`Error: ${err.response.data}`, "alert-danger");
    }
  }

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5091/api/Events/SearchEvent', {
        params: {
          searchEvent: searchTerm,
        },
      });
      setEvents(response.data);
    } catch (err) {
      console.error("Error searching events:", err);
    }
  };

  const exportEventsToExcel = async () => {
    try {
      const response = await axios({
        url: "http://localhost:5091/api/Events/ExportEventsToExcel",
        method: "GET",
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Events.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error exporting events to Excel:", error);
    }
  };

  function showAlert(message, type) {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 4000);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {toggle && (
          <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
            <Sidebar />
          </div>
        )}

        <div className={`main-content ${toggle ? 'sidebar-visible' : 'sidebar-hidden'}`}>
          <Navbar Toggle={Toggle} />
          
          <div className="admin-container">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="admin-title">Events Management</h4>
              <button className="btn btn-add" onClick={toggleFormVisibility}>
                <i className="fas fa-plus"></i>
                <span>Add Event</span>
              </button>
            </div>

            {isFormVisible && (
              <div className="admin-form">
                <form>
                  <input type="text" className="form-control" id="id" hidden value={id} />

                  <div className="form-group">
                    <label className="label">Event Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="eventName"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Description:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Image:</label>
                    <input
                      type="file"
                      ref={inputFileRef}
                      className="form-control"
                      id="image"
                      onChange={(e) => {
                        setSelectedImage(URL.createObjectURL(e.target.files[0]));
                        setImage("./images/" + e.target.files[0].name);
                      }}
                    />
                    {selectedImage && (
                      <img
                        src={selectedImage}
                        className="admin-image mt-2"
                        alt="Selected"
                      />
                    )}
                  </div>

                  <div className="form-group">
                    <label className="label">Price:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Category:</label>
                    <select
                      className="form-control"
                      id="category"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      <option value="">Select Category</option>
                      {eventCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="label">Theme:</label>
                    <select
                      className="form-control"
                      id="theme"
                      value={themeId}
                      onChange={(e) => setThemeId(e.target.value)}
                    >
                      <option value="">Select Theme</option>
                      {eventThemes.map((theme) => (
                        <option key={theme.id} value={theme.id}>
                          {theme.themeName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-3">
                    {id ? (
                      <button className="btn btn-update" onClick={update}>
                        <i className="fas fa-save me-2"></i>Update
                      </button>
                    ) : (
                      <button className="btn btn-save" onClick={save}>
                        <i className="fas fa-save me-2"></i>Save
                      </button>
                    )}
                    <button className="btn btn-cancel" onClick={cancel}>
                      <i className="fas fa-times me-2"></i>Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {isAlertVisible && (
              <div className={`admin-alert ${alertType}`}>
                {alertMessage}
              </div>
            )}

            <div className="admin-actions">
              <div className="search-container">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control-search"
                  placeholder="Search events..."
                />
                <button className="btn btn-search" onClick={handleSearch}>
                  <i className="fas fa-search"></i>
                </button>
              </div>
              <button className="btn btn-export-excel" onClick={exportEventsToExcel}>
                <i className="fas fa-file-excel me-2"></i>
                Export to Excel
              </button>
            </div>

            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Event Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Image</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                    <th scope="col">Theme</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id}>
                      <td>{event.id}</td>
                      <td>{event.eventName}</td>
                      <td className="description-cell">{event.description}</td>
                      <td>
                        <img
                          src={event.image}
                          className="admin-image"
                          alt="Event"
                        />
                      </td>
                      <td>{event.price}</td>
                      <td>{event.eventCategories?.categoryName || "N/A"}</td>
                      <td>{event.eventThemes?.themeName || "N/A"}</td>
                      <td className="options-cell d-flex justify-content-center align-items-center">
                        <button
                          type="button"
                          className="btn btn-edit mx-2 d-flex align-items-center"
                          onClick={() => editEvents(event)}
                        >
                          <i className="fas fa-edit"></i>
                          <span className="ms-2">Edit</span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-delete mx-2 d-flex align-items-center"
                          onClick={() => deleteEvents(event.id)}
                        >
                          <i className="fas fa-trash-alt"></i>
                          <span className="ms-2">Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsAdmin;