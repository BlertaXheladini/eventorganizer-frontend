import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./include/Navbar";
import Sidebar from "./include/Sidebar";
import { useNavigate } from "react-router-dom";
import "./Style.css";

function EventThemesAdmin() {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  
  const Toggle = () => {
    setToggle(!toggle);
  };

  const [id, setId] = useState("");
  const [themeName, setThemeName] = useState("");
  const [description, setDescription] = useState("");
  const [eventThemes, setEventThemes] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); 
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const cancel = () => {
    setIsFormVisible(false);
    setId("");
    setThemeName("");
    setDescription("");
  };

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    try {
      const result = await axios.get(
        "http://localhost:5091/api/EventThemes/GetAllList"
      );
      setEventThemes(result.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5091/api/EventThemes/Add", {
        themeName: themeName,
        description: description,
      });
      showAlert("The event theme has been successfully registered!", "alert-success");
      setId("");
      setThemeName("");
      setDescription("");
      setIsFormVisible(false);
      Load();
    } catch (err) {
      showAlert(`Error: ${err}`, "alert-danger");
    }
  }

  async function editEventThemes(eventTheme) {
    setThemeName(eventTheme.themeName);
    setDescription(eventTheme.description);
    setId(eventTheme.id);
    setIsFormVisible(true);
  }

  async function deleteEventThemes(id) {
    try {
      await axios.delete(`http://localhost:5091/api/EventThemes/Delete?Id=${id}`);
      showAlert("The event theme has been successfully deleted!", "alert-success");
      setId("");
      setThemeName("");
      setDescription("");
      Load();
    } catch (err) {
      showAlert(`Error: ${err}`, "alert-danger");
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5091/api/EventThemes/Update?Id=${id}`,
        {
          id: id,
          themeName: themeName,
          description: description,
        }
      );
      showAlert("The event theme has been successfully edited!", "alert-success");
      setId("");
      setThemeName("");
      setDescription("");
      setIsFormVisible(false); 
      Load();
    } catch (err) {
      showAlert(`Error: ${err.message}`, "alert-danger");
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
          <Navbar Toggle={Toggle} />
          
          <div className="admin-container">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="admin-title">Event Themes</h4>
              <button className="btn btn-add" onClick={toggleFormVisibility}>
                <i className="fas fa-plus"></i>
                <span>Add Theme</span>
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
                    <label className="label">Theme Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="themeName"
                      value={themeName}
                      onChange={(event) => setThemeName(event.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Description:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    />
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

            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {eventThemes.map((eventTheme) => (
                    <tr key={eventTheme.id}>
                      <td>{eventTheme.id}</td>
                      <td>{eventTheme.themeName}</td>
                      <td className="description-cell">{eventTheme.description}</td>
                      <td className="options-cell d-flex justify-content-center align-items-center">
                        <button
                          type="button"
                          className="btn btn-edit mx-2 d-flex align-items-center"
                          onClick={() => editEventThemes(eventTheme)}
                        >
                          <i className="fas fa-edit"></i>
                          <span className="ms-2">Edit</span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-delete mx-2 d-flex align-items-center"
                          onClick={() => deleteEventThemes(eventTheme.id)}
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

export default EventThemesAdmin;