import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "./include/Navbar";
import Sidebar from "./include/Sidebar";
import { useNavigate } from "react-router-dom";
import "./Style.css";

function StaffAdmin() {
  const [toggle, setToggle] = useState(true);

  const navigate = useNavigate();
  const Toggle = () => {
    setToggle(!toggle);
  };

  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [staffList, setStaffList] = useState([]);

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
    setFirstName("");
    setLastName("");
    setPosition("");
    setContactNumber("");
    setImage("");
    setSelectedImage("");
  };

  useEffect(() => {
    (async () => await loadStaff())();
  }, []);

  async function loadStaff() {
    try {
      const result = await axios.get("https://localhost:7214/api/Staff/GetAllList");
      setStaffList(result.data);
    } catch (err) {
      console.error(err);
    }
  }

  const inputFileRef = useRef(null);

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7214/api/Staff/Add", {
         firstName: firstName,
         lastName: lastName,
         position: position,
         contactNumber: contactNumber,
         image: image,
      });
      showAlert("Staff member has been successfully registered!", "alert-success");
      clearForm();
      setIsFormVisible(false);
      loadStaff();
    } catch (err) {
      showAlert(`Error: ${err}`, "alert-danger");
    }
  }

  async function editStaff(staff) {
    setFirstName(staff.firstName);
    setLastName(staff.lastName);
    setPosition(staff.position);
    setContactNumber(staff.contactNumber);
    setImage(staff.image);
    setSelectedImage(staff.image);
    setId(staff.id);
    setIsFormVisible(true);
  }

  async function deleteStaff(staffId) {
    try {
      await axios.delete(`https://localhost:7214/api/Staff/Delete?Id=${staffId}`);
      showAlert("Staff member has been successfully deleted!", "alert-success");
      clearForm();
      loadStaff();
    } catch (err) {
      showAlert(`Error: ${err}`, "alert-danger");
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      const staff = staffList.find((p) => p.id === id);
      await axios.put(
        `https://localhost:7214/api/Staff/Update/${staff.id}`, 
        {
          id: staff.id,
          firstName: firstName,
          lastName: lastName,
          position: position,
          contactNumber: contactNumber,
          image: image,
      });
      showAlert("Staff member has been successfully updated!", "alert-success");
      clearForm();
      setIsFormVisible(false);
      loadStaff();
    } catch (err) {
      showAlert(`Error: ${err}`, "alert-danger");
    }
  }

  function clearForm() {
    setId("");
    setFirstName("");
    setLastName("");
    setPosition("");
    setContactNumber("");
    setImage("");
    setSelectedImage(null);

    if (inputFileRef.current) {
      inputFileRef.current.value = "";
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
              <h4 className="admin-title">Staff Management</h4>
              <button className="btn btn-add" onClick={toggleFormVisibility}>
                <i className="fas fa-plus"></i>
                <span>Add Staff</span>
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
                    <label className="label">First Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Last Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Position:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="position"
                      value={position}
                      onChange={(event) => setPosition(event.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Contact Number:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="contactNumber"
                      value={contactNumber}
                      onChange={(event) => setContactNumber(event.target.value)}
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
                        alt="Selected staff"
                      />
                    )}
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
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Position</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Image</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {staffList.map((staff) => (
                    <tr key={staff.id}>
                      <td>{staff.id}</td>
                      <td>{staff.firstName}</td>
                      <td>{staff.lastName}</td>
                      <td>{staff.position}</td>
                      <td>{staff.contactNumber}</td>
                      <td>
                        <img
                          src={staff.image}
                          className="admin-image"
                          alt="Staff"
                        />
                      </td>
                      <td className="options-cell d-flex justify-content-center align-items-center">
                        <button
                          type="button"
                          className="btn btn-edit mx-2 d-flex align-items-center"
                          onClick={() => editStaff(staff)}
                        >
                          <i className="fas fa-edit"></i>
                          <span className="ms-2">Edit</span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-delete mx-2 d-flex align-items-center"
                          onClick={() => deleteStaff(staff.id)}
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

export default StaffAdmin;