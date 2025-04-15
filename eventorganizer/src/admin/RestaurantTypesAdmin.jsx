import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./include/Navbar";
import Sidebar from "./include/Sidebar";
import { useNavigate } from "react-router-dom";
import "./Style.css";

function RestaurantTypesAdmin() {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  
  const Toggle = () => {
    setToggle(!toggle);
  };

  const [id, setId] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [description, setDescription] = useState("");
  const [restaurantTypes, setRestaurantTypes] = useState([]);
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
    setRestaurantName("");
    setDescription("");
  };

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    try {
      const result = await axios.get("http://localhost:5091/api/RestaurantTypes/GetAllList");
      setRestaurantTypes(result.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5091/api/RestaurantTypes/Add", {
        restaurantName: restaurantName,
        description: description,
      });
      showAlert("The restaurant type has been successfully registered!", "alert-success");
      setId("");
      setRestaurantName("");
      setDescription("");
      setIsFormVisible(false);
      Load();
    } catch (err) {
      showAlert(`Error: ${err}`, "alert-danger");
    }
  }

  async function editRestaurantType(restaurantType) {
    setRestaurantName(restaurantType.restaurantName);
    setDescription(restaurantType.description);
    setId(restaurantType.id);
    setIsFormVisible(true);
  }

  async function deleteRestaurantType(id) {
    try {
      await axios.delete(`http://localhost:5091/api/RestaurantTypes/Delete?Id=${id}`);
      showAlert("The restaurant type has been successfully deleted!", "alert-success");
      setId("");
      setRestaurantName("");
      setDescription("");
      Load();
    } catch (err) {
      showAlert(`Error: ${err}`, "alert-danger");
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      const response = await axios.put("http://localhost:5091/api/RestaurantTypes/Update", {
        id: id,
        restaurantName: restaurantName,
        description: description,
      });
      showAlert("The restaurant type has been successfully edited!", "alert-success");
      setId("");
      setRestaurantName("");
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
              <h4 className="admin-title">Restaurant Types</h4>
              <button className="btn btn-add" onClick={toggleFormVisibility}>
                <i className="fas fa-plus"></i>
                <span>Add Type</span>
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
                    <label className="label">Restaurant Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="restaurantName"
                      value={restaurantName}
                      onChange={(event) => setRestaurantName(event.target.value)}
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
                  {restaurantTypes.map((restaurantType) => (
                    <tr key={restaurantType.id}>
                      <td>{restaurantType.id}</td>
                      <td>{restaurantType.restaurantName}</td>
                      <td className="description-cell">{restaurantType.description}</td>
                      <td className="options-cell d-flex justify-content-center align-items-center">
                        <button
                          type="button"
                          className="btn btn-edit mx-2 d-flex align-items-center"
                          onClick={() => editRestaurantType(restaurantType)}
                        >
                          <i className="fas fa-edit"></i>
                          <span className="ms-2">Edit</span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-delete mx-2 d-flex align-items-center"
                          onClick={() => deleteRestaurantType(restaurantType.id)}
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

export default RestaurantTypesAdmin;
