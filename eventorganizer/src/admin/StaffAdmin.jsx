import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "./include/Navbar";
import Sidebar from "./include/Sidebar";
import { useNavigate } from "react-router-dom";

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
    } catch (err) {(err);
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
    }, 4000); // Hide the alert after 4 seconds
  }

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
            <h4 className="text-dark">Staff Data</h4>
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
                    onChange={(event) => setId(event.target.value)}
                  />

                  <label className="label">First Name:</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="firstName"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </div>

                <div className="form-group px-5">
                  <label className="label">Last Name:</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="lastName"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </div>

                <div className="form-group px-5">
                  <label className="label">Position:</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="position"
                    value={position}
                    onChange={(event) => setPosition(event.target.value)}
                  />
                </div>

                <div className="form-group px-5">
                  <label className="label">Contact Number:</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="contactNumber"
                    value={contactNumber}
                    onChange={(event) => setContactNumber(event.target.value)}
                  />
                </div>

                <div className="form-group px-5">
                  <label className="label">Image:</label>
                  <input
                    type="file"
                    ref={inputFileRef}
                    className="form-control mb-3"
                    id="image"
                    onChange={(event) => {
                      setSelectedImage(URL.createObjectURL(event.target.files[0]));
                      setImage("./images/" + event.target.files[0].name);
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
                    className="btn btn-cancel"
                    onClick={cancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {isAlertVisible && (
            <div className={`alert ${alertType}`}>
              {alertMessage}
            </div>
          )}

          <div className="table-responsive m-4 px-4">
            <table className="table border-gray">
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
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          maxHeight: "150px",
                        }}
                        alt="StaffPhoto"
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
  );
}

export default StaffAdmin;