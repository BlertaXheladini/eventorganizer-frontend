import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "./include/Navbar";
import Sidebar from "./include/Sidebar";
import { useNavigate } from "react-router-dom";
import "./Style.css";

function RestaurantsAdmin() {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const Toggle = () => {
    setToggle(!toggle);
  };

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState("");
  const [restaurantTypesId, setRestaurantTypesId] = useState("");
  const [restaurantTypes, setRestaurantTypes] = useState([]); 
  const [restaurants, setRestaurants] = useState([]);

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

  useEffect(() => {
    (async () => {
      await loadRestaurantTypes();
      await loadRestaurants();
    })();
  }, []);

  async function loadRestaurantTypes() {
    try {
      const result = await axios.get(
        "https://localhost:7137/api/RestaurantTypes/GetAllList"
      );
      setRestaurantTypes(result.data);
    } catch (err) {
      console.error("Error loading restaurant types:", err);
    }
  }

  async function loadRestaurants() {
    try {
      const result = await axios.get(
        "https://localhost:7137/api/Restaurants/GetAllList"
      );
      setRestaurants(result.data);
    } catch (err) {
      console.error("Error loading restaurants:", err);
    }
  }

  const inputFileRef = useRef(null);

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7137/api/Restaurants/Add", {
        name: name,
        location: location,
        image: image,
        description: description,
        restaurantTypesId: restaurantTypesId, 
      });
      showAlert("Restaurant added successfully!", "alert-success");
      clearForm();
      setIsFormVisible(false);
      loadRestaurants();
    } catch (err) {
      showAlert(`Error: ${err}`, "alert-danger");
    }
  }

  function clearForm() {
    setId("");
    setName("");
    setLocation("");
    setImage("");
    setSelectedImage(null);
    setDescription("");
    setRestaurantTypesId("");
  
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  }

  async function editRestaurants(restaurant) {
    setName(restaurant.name);
    setLocation(restaurant.location);
    setImage(restaurant.image);
    setSelectedImage(restaurant.image);
    setDescription(restaurant.description);
    setRestaurantTypesId(restaurant.restaurantType?.id || ""); 
    setId(restaurant.id);
    setIsFormVisible(true);
  }

  async function deleteRestaurants(restaurantId) {
    try {
      await axios.delete(`https://localhost:7137/api/Restaurants/Delete/${restaurantId}`);
      showAlert("Restaurant deleted successfully!", "alert-success");
      loadRestaurants();
    } catch (err) {
      showAlert(`Error: ${err}`, "alert-danger");
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.put(`https://localhost:7137/api/Restaurants/Update/${id}`, {
        id: id,
        name: name,
        location: location,
        image: image,
        description: description,
        restaurantTypesId: restaurantTypesId, 
      });
      showAlert("Restaurant updated successfully!", "alert-success");
      clearForm();
      setIsFormVisible(false); 
      loadRestaurants();
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
          <Navbar Toggle={Toggle} />
          
          <div className="admin-container">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="admin-title">Restaurants Management</h4>
              <button className="btn btn-add" onClick={toggleFormVisibility}>
                <i className="fas fa-plus"></i>
                <span>Add Restaurant</span>
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
                    <label className="label">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Location:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="location"
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
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
                        className="admin-image"
                        alt="SelectedImagePreview"
                      />
                    )}
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
                    <label className="label">Type:</label>
                    <select
                      className="form-control"
                      id="type"
                      value={restaurantTypesId}
                      onChange={(event) => setRestaurantTypesId(event.target.value)}
                    >
                      <option value="">Select Type</option>
                      {restaurantTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
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

            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Location</th>
                    <th scope="col">Image</th>
                    <th scope="col">Description</th>
                    <th scope="col">Type</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurants.map((restaurant) => (
                    <tr key={restaurant.id}>
                      <td>{restaurant.id}</td>
                      <td>{restaurant.name}</td>
                      <td>{restaurant.location}</td>
                      <td>
                        <img
                          src={restaurant.image}
                          className="admin-image"
                          alt="RestaurantPhoto"
                        />
                      </td>
                      <td className="description-cell">{restaurant.description}</td>
                      <td>{restaurant.restaurantType ? restaurant.restaurantType.name : "N/A"}</td>
                      <td className="options-cell d-flex justify-content-center align-items-center">
                        <button
                          type="button"
                          className="btn btn-edit mx-2 d-flex align-items-center"
                          onClick={() => editRestaurants(restaurant)}
                        >
                          <i className="fas fa-edit"></i>
                          <span className="ms-2">Edit</span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-delete mx-2 d-flex align-items-center"
                          onClick={() => deleteRestaurants(restaurant.id)}
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

export default RestaurantsAdmin;