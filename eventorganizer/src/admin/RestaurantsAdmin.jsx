import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "./include/Navbar";
import Sidebar from "./include/Sidebar";
import { useNavigate } from "react-router-dom";

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
  const [searchTerm, setSearchTerm] = useState('');


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
    setName("");
    setLocation("");
    setImage("");
    setSelectedImage("");
    setDescription("");
    setRestaurantTypesId("");
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
        "http://localhost:5091/api/RestaurantTypes/GetAllList"
      );
      setRestaurantTypes(result.data);
    } catch (err) {
      console.error("Error loading eventThemes:", err);
    }
  }

  async function loadRestaurants() {
    try {
        const result = await axios.get(
            "http://localhost:5091/api/Restaurants/GetAllList"
        );
        setRestaurants(result.data);
    } catch (err) {
        console.error("Error loading events:", err);
    }
}

  const inputFileRef = useRef(null);

  async function save(restaurant) {
    restaurant.preventDefault();
    try {
      await axios.post("http://localhost:5091/api/Restaurants/Add", {
        name: name,
        location: location,
        image: image,
        description: description,
        restaurantTypesId: restaurantTypesId, 
      });
      showAlert("The restaurant has been successfully registered!", "alert-success");
      clearForm();
      setIsFormVisible(false);
      loadRestaurants();
    } catch (err) {
      showAlert(`Error: ${err}`, "alert-danger");
    }
  }

  const exportRestaurantsToExcel = async () => {
    try {
      const response = await axios.get('http://localhost:5091/api/Restaurants/ExportRestaurantsToExcel', {
        responseType: 'blob',
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Restaurants.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting restaurants to Excel:', error);
      showAlert('Error exporting restaurants to Excel', 'alert-danger');
    }
  };  



  function clearForm() {
    setId("");
    setName("");
    setLocation("");
    setImage("");
    setSelectedImage("");
    setDescription("");
    setRestaurantTypesId("");
  
    setSelectedImage(null);
  
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
      await axios.delete(`http://localhost:5091/api/Restaurants/Delete/${restaurantId}`);
      showAlert("The restaurant has been successfully deleted!", "alert-success");
      clearForm();
      loadRestaurants();
    } catch (err) {
      showAlert(`Error: ${err}`, "alert-danger");
    }
  }
  
  

  async function update(restaurant) {
    restaurant.preventDefault();
    try {
      const restaurant = restaurants.find((p) => p.id === id);
      await axios.put(`http://localhost:5091/api/Restaurants/Update/${restaurant.id}`, {
        id: restaurant.id,
        name: name,
        location: location,
        image: image,
        description: description,
        restaurantTypesId: restaurantTypesId, 
      });
      showAlert("The restaurant has been successfully edited!", "alert-success");
      clearForm();
      setIsFormVisible(false); 
      loadRestaurants();
    } catch (err) {
      showAlert(`Error: ${err}`, "alert-danger");
    }
  }

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5091/api/Restaurants/SearchRestaurant', {
        params: {
          searchRestaurant: searchTerm,
        },
      });
      setRestaurants(response.data);
    } catch (err) {
      console.error("Error searching events:", err);
    }
  };

  function showAlert(message, type) {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertVisible(true);

    setTimeout(() => {
      setIsAlertVisible(false);
    }, 4000); // Hide the alert after 4 seconds
  }

  

  ///////////////////////////////////////////////////////////////
  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        backgroundSize: "cover",
      }}
    >
      <div className="row">
        {toggle && (
          <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
            <Sidebar />
          </div>
        )}

        <div className="col-4 col-md-2"></div>
        <div className="col">
          <Navbar Toggle={Toggle} />
          
          <div className="d-flex justify-content-between align-items-center mt-4 px-5">
            <h4 className="text-dark">Data for Restaurants</h4>
            <button className="btn btn-add d-flex align-items-center" onClick={toggleFormVisibility}>
              <i className="fas fa-plus me-2"></i>
              Add
            </button>
          </div>


          {isFormVisible && (
            <div className="container mt-4 text-white align-item-center">
              <form>
                <div className="form-group px-5">
                  <input
                    type="text"
                    className="form-control"
                    id="id"
                    hidden
                    value={id}
                    onChange={(restaurant) => {
                      setId(restaurant.target.value);
                    }}
                  />

                  <label className="label">Name:</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="name"
                    value={name}
                    onChange={(restaurant) => {
                      setName(restaurant.target.value);
                    }}
                  />
                </div>

                <div className="form-group px-5">
                  <label className="label">Location:</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="location"
                    value={location}
                    onChange={(restaurant) => {
                      setLocation(restaurant.target.value);
                    }}
                  />
                </div>
              

                <div className="form-group px-5">
                  <label className="label">Image:</label>
                  <input
                    type="file"
                    ref={inputFileRef}
                    className="form-control mb-3"
                    id="image"
                    onChange={(restaurant) => {
                      setSelectedImage(URL.createObjectURL(restaurant.target.files[0]));
                      setImage("./images/" + restaurant.target.files[0].name);
                    }}
                  />
                  
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        maxHeight: "150px",
                        marginTop: "10px",
                      }}
                      alt="SelectedImagePreview"
                    />
                  )}
                </div>

                <div className="form-group px-5">
                  <label className="label">Description:</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="description"
                    value={description}
                    onChange={(restaurant) => {
                      setDescription(restaurant.target.value);
                    }}
                  />
                </div>


                <div className="form-group px-5">
                  <label className="label">Type:</label>
                  <select
                    className="form-control"
                    id="type"
                    value={restaurantTypesId}
                    onChange={(restaurant) => setRestaurantTypesId(restaurant.target.value)}
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
                  <button className="btn btn-save" onClick={save}>
                    Save
                  </button>
                  <button
                    className="btn btn-update"
                    onClick={update}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-cancel "
                    onClick={cancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

            <br />


            {isAlertVisible && (
            <div
              className={`alert ${alertType}`}
            >
              {alertMessage}
            </div>
          )}


          <div className="search-event-admin">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control-search me-2"
              />
            <button className="btn btn-search-event me-2" onClick={handleSearch}>Search
              <i className="fas fa-search"></i>
            </button>

            <button className="btn btn-export-excel ms-2" onClick={exportRestaurantsToExcel}>
                Export to Excel
                <i className="fas fa-file-excel ms-2"></i>
              </button>
            </div>


            <div className="table-responsive m-4 px-4">
              <table className="table border-gray">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">RestaurantName</th>
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
                        <td>
                          <img
                            src={restaurant.image}
                            style={{
                              minWidth:"100%",
                              height: "auto",
                              maxHeight: "150px",
                            }}
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
  );
}

export default RestaurantsAdmin;