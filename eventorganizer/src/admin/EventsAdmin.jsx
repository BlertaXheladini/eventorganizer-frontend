import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "./include/Navbar";
import Sidebar from "./include/Sidebar";
import { useNavigate } from "react-router-dom";
import "./Style.css";

function EventsAdmin() {
  const [toggle, setToggle] = useState(true);
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
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); 
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const inputFileRef = useRef(null);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const cancel = () => {
    setIsFormVisible(false);
    setId("");
    setEventName("");
    setDescription("");
    setImage("");
    setSelectedImage("");
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
      const result = await axios.get(
        "https://localhost:7137/api/EventCategories/GetAllList"
      );
      setEventCategories(result.data);
    } catch (err) {
      console.error("Error loading eventCategories:", err);
    }
  }

  async function loadEventThemes() {
    try {
      const result = await axios.get(
        "https://localhost:7137/api/EventThemes/GetAllList"
      );
      setEventThemes(result.data);
    } catch (err) {
      console.error("Error loading eventThemes:", err);
    }
  }

  async function loadEvents() {
    try {
      const result = await axios.get(
        "https://localhost:7137/api/Events/GetAllList"
      );
      setEvents(result.data);
    } catch (err) {
      console.error("Error loading events:", err);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7137/api/Events/Add", {
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
      showAlert(`Error: ${err}`, "alert-danger");
    }
  }

  function clearForm() {
    setId("");
    setEventName("");
    setDescription("");
    setImage("");
    setPrice("");
    setCategoryId("");
    setThemeId(""); 
    setSelectedImage(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  }

  async function editEvents(event) {
    setEventName(event.eventName);
    setDescription(event.description);
    setImage(event.image);
    setSelectedImage(event.image);
    setPrice(event.price);
    setCategoryId(event.categoryId);
    setThemeId(event.themeId); 
    setId(event.id);
    setIsFormVisible(true);
  }

  async function deleteEvents(eventId) {
    try {
      await axios.delete(`https://localhost:7137/api/Events/Delete?Id=${eventId}`);
      showAlert("The event has been successfully deleted!", "alert-success");
      loadEvents();
    } catch (err) {
      showAlert(`Error: ${err}`, "alert-danger");
    }
  }

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
          <Navbar Toggle={() => setToggle(!toggle)} />
          
          <div className="admin-container">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="admin-title">Event Management</h4>
              <button className="btn btn-add" onClick={toggleFormVisibility}>
                <i className="fas fa-plus"></i>
                <span>Add Event</span>
              </button>
            </div>

            {isFormVisible && (
              <div className="admin-form">
                <form>
                  <input
                    type="text"
                    className="form-control"
                    id="id"
                    hidden
                    value={id}
                    onChange={(event) => setId(event.target.value)}
                  />

                  <div className="form-group">
                    <label className="label">Event Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="eventName"
                      value={eventName}
                      onChange={(event) => setEventName(event.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Description:</label>
                    <textarea
                      className="form-control"
                      id="description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      rows="3"
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Image:</label>
                    <input
                      type="file"
                      ref={inputFileRef}
                      className="form-control"
                      id="image"
                      onChange={(event) => {
                        setSelectedImage(URL.createObjectURL(event.target.files[0]));
                        setImage("./images/" + event.target.files[0].name);
                      }}
                    />
                    {selectedImage && (
                      <img
                        src={selectedImage}
                        className="admin-image mt-3"
                        alt="Selected event"
                      />
                    )}
                  </div>

                  <div className="form-group">
                    <label className="label">Price:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      value={price}
                      onChange={(event) => setPrice(event.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Category:</label>
                    <select
                      className="form-control"
                      id="category"
                      value={categoryId}
                      onChange={(event) => setCategoryId(event.target.value)}
                    >
                      <option value="">Select Category</option>
                      {eventCategories.map((eventCategory) => (
                        <option key={eventCategory.id} value={eventCategory.id}>
                          {eventCategory.categoryName}
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
                      onChange={(event) => setThemeId(event.target.value)}
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
                      <button className="btn btn-update" onClick={save}>
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
                      <td>${event.price}</td>
                      <td>{event.eventCategories.categoryName}</td>
                      <td>{event.eventThemes.themeName}</td>
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
