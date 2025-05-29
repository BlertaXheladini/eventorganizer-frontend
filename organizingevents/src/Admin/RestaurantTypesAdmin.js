import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./include/Navbar";
import Sidebar from "./include/Sidebar";
import { useNavigate } from "react-router-dom";

function RestaurantTypesAdmin() {
  const [toggle, setToggle] = useState(true);

  const navigate = useNavigate();
  const Toggle = () => {
    setToggle(!toggle);
  };

  const [id, setId] = useState("");
  const [name, setName] = useState("");
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
    setName("");
    setDescription("");
  };

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    try {
      const result = await axios.get(
        "https://localhost:7214/api/RestaurantTypes/GetAllList"
      );
      setRestaurantTypes(result.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function save(restaurantType) {
    restaurantType.preventDefault();
    try {
      await axios.post("https://localhost:7214/api/RestaurantTypes/Add", {
        name: name,
        description: description,
      });
      showAlert("The restaurant type has been successfully registered!", "alert-success");
      setId("");
      setName("");
      setDescription("");
      setIsFormVisible(false);
      Load();
    } catch (err) {
      showAlert(`Error: ${err}`, "alert-danger");
    }
  }

  async function editRestaurantTypes(restaurantTypes) {
    setName(restaurantTypes.name);
    setDescription(restaurantTypes.description);
    setId(restaurantTypes.id);
    setIsFormVisible(true);
  }

  async function deleteRestaurantTypes(id) {
    try {
      await axios.delete(`https://localhost:7214/api/RestaurantTypes/Delete/${id}`);
      showAlert("The restaurant type has been successfully deleted!", "alert-success");
      setId("");
      setName("");
      setDescription("");
      Load();
    } catch (err) {
      showAlert(`Error: ${err}`, "alert-danger");
    }
  }

  async function update(restaurantType) {
    restaurantType.preventDefault();
    try {
      const restaurantType = restaurantTypes.find((p) => p.id === id);
      await axios.put(
        `https://localhost:7214/api/RestaurantTypes/Update/${restaurantType.id}`,
        {
          id: restaurantType.id,
          name: name,
          description: description,
        }
      );
      showAlert("The restaurant type has been successfully edited!", "alert-success");
      setId("");
      setName("");
      setDescription("");
      setIsFormVisible(false); 
      Load();
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
    }, 4000); // Hide the alert after 4 seconds
  }

  /////////////////////////////////////////////////////////
  
  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#fff",
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
            <h4 className="text-dark">Data for Restaurant Types</h4>
            <button className="btn btn-add d-flex align-items-center" onClick={toggleFormVisibility}>
              <i className="fas fa-plus me-2"></i>
              Add
            </button>
          </div>


          {isFormVisible && (
            <div className="container mt-4 text-white align-item-center">
              <form>
                <div className="form-group px-5 ">
                  <input
                    type="text"
                    className="form-control"
                    id="id"
                    hidden
                    value={id}
                    onChange={(restaurantType) => {
                      setId(restaurantType.target.value);
                    }}
                  />

                  <label className="label">Name:</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="name"
                    value={name}
                    onChange={(restaurantType) => {
                      setName(restaurantType.target.value);
                    }}
                  />

                  <label className="label">Description:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(restaurantType) => {
                      setDescription(restaurantType.target.value);
                    }}
                  />
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

          <div className="table-responsive m-4 px-4">
            <table className="table border-gray">
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
                    <td>{restaurantType.name}</td>
                    <td className="description-cell">{restaurantType.description}</td>
                    <td className="options-cell d-flex justify-content-center align-items-center">
                      <button
                        type="button"
                        className="btn btn-edit mx-2 d-flex align-items-center"
                        onClick={() => editRestaurantTypes(restaurantType)}
                      >
                        <i className="fas fa-edit"></i>
                        <span className="ms-2">Edit</span>
                      </button>
                      <button
                        type="button"
                        className="btn btn-delete mx-2 d-flex align-items-center"
                        onClick={() => deleteRestaurantTypes(restaurantType.id)}
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

export default RestaurantTypesAdmin;