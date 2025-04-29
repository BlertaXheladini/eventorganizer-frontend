import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./include/Navbar";
import Sidebar from "./include/Sidebar";
import { useNavigate } from "react-router-dom";
import "./Style.css";

function Users() {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const Toggle = () => {
    setToggle(!toggle);
  };

  const [Id, setId] = useState("");
  const [Users, setUsers] = useState([]);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");

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
      await loadUsers();
    })();
  }, []);

  async function loadUsers() {
    try {
      const result = await axios.get("http://localhost:5091/api/Users/GetAllList");
      setUsers(result.data);
    } catch (err) {
      console.error("Error loading Users:", err);
    }
  }

  async function save(e) {
    e.preventDefault();
    try {
      if (!FirstName || !LastName || !Email || !Password || !roleId) {
        showAlert("Please fill in all required fields", "alert-danger");
        return;
      }

      // Make sure roleId is a valid number
      const roleIdNum = parseInt(roleId);
      if (isNaN(roleIdNum) || roleIdNum <= 0) {
        showAlert("Please select a valid role", "alert-danger");
        return;
      }

      // Try a different format for the user data
      const userData = {
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        Password: Password,
        RoleId: roleIdNum
      };

      console.log("Sending user data:", userData);
      const response = await axios.post("http://localhost:5091/api/Users/Register", userData);
      console.log("Server response:", response.data);
      
      showAlert("The user has been successfully registered!", "alert-success");
      clearForm();
      setIsFormVisible(false);
      loadUsers();
    } catch (err) {
      console.error("Error saving user:", err);
      if (err.response) {
        console.error("Error response:", err.response.data);
        showAlert(`Error saving user: ${err.response.data}`, "alert-danger");
      } else if (err.request) {
        console.error("No response received:", err.request);
        showAlert("Could not connect to the server. Please check if the backend is running.", "alert-danger");
      } else {
        showAlert(`Error saving user: ${err.message}`, "alert-danger");
      }
    }
  }

  async function editUser(user) {
    setId(user.id);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPassword(user.password);
    setRoleId(user.roleId);
    setIsFormVisible(true);
  }

  async function deleteUser(userId) {
    try {
      await axios.delete(`http://localhost:5091/api/Users/Delete?Id=${userId}`);
      showAlert("The user has been successfully deleted!", "alert-success");
      loadUsers();
    } catch (err) {
      showAlert(`Error: ${err.message}`, "alert-danger");
    }
  }

  async function update(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5091/api/Users/UpdateUser`, {
        id: Id,
        firstName: FirstName,
        lastName: LastName,
        email: Email,
        password: Password,
        roleId: roleId,
      });
      showAlert("The user has been successfully updated!", "alert-success");
      clearForm();
      setIsFormVisible(false);
      loadUsers();
    } catch (err) {
      showAlert(`Error: ${err.message}`, "alert-danger");
    }
  }

  function clearForm() {
    setId("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRoleId("");
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
              <h4 className="admin-title">User Management</h4>
              <button className="btn btn-add" onClick={toggleFormVisibility}>
                <i className="fas fa-plus"></i>
                <span>Add User</span>
              </button>
            </div>

            {isFormVisible && (
              <div className="admin-form">
                <form>
                  <input type="text" className="form-control" id="id" hidden value={Id} />

                  <div className="form-group">
                    <label className="label">First Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      value={FirstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Last Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      value={LastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Role:</label>
                    <select
                      className="form-control"
                      id="role"
                      value={roleId}
                      onChange={(e) => setRoleId(e.target.value)}
                    >
                      <option value="">Select a role</option>
                      <option value="1">Admin</option>
                      <option value="2">User</option>
                    </select>
                  </div>

                  <div className="mt-3">
                    {Id ? (
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
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {Users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.roleId === 1 ? 'Admin' : 'User'}</td>
                      <td className="options-cell d-flex justify-content-center align-items-center">
                        <button
                          type="button"
                          className="btn btn-edit mx-2 d-flex align-items-center"
                          onClick={() => editUser(user)}
                        >
                          <i className="fas fa-edit"></i>
                          <span className="ms-2">Edit</span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-delete mx-2 d-flex align-items-center"
                          onClick={() => deleteUser(user.id)}
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

export default Users;