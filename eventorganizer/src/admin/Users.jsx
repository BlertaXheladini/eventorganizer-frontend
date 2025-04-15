import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./include/Navbar";
import Sidebar from "./include/Sidebar";
import { useNavigate } from "react-router-dom";

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
      const result = await axios.get("https://localhost:7214/api/Users/GetAllList");
      setUsers(result.data);
    } catch (err) {
      console.error("Error loading Users:", err);
    }
  }

  async function save(e) {
    e.preventDefault(); // Prevent default form submission
    try {
      await axios.post("https://localhost:7214/api/Users/Register", {
        firstName: FirstName,
        lastName: LastName,
        email: Email,
        password: Password,
        roleId: roleId,
      });
      showAlert("The user has been successfully registered!", "alert-success");
      clearForm();
      setIsFormVisible(false);
      loadUsers(); // Reload the users after saving
    } catch (err) {
      showAlert(`Error: ${err.message}`, "alert-danger");
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
      await axios.delete(`https://localhost:7214/api/Users/Delete?Id=${userId}`);
      showAlert("The user has been successfully deleted!", "alert-success");
      loadUsers(); // Reload the users after deleting
    } catch (err) {
      showAlert(`Error: ${err.message}`, "alert-danger");
    }
  }

  async function update(e) {
    e.preventDefault(); // Prevent default form submission
    try {
      await axios.put(`https://localhost:7214/api/Users/UpdateUser`, {
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
      loadUsers(); // Reload the users after update
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
            <h4 className="text-dark">Data for Users</h4>
            <button className="btn btn-add d-flex align-items-center" onClick={toggleFormVisibility}>
              <i className="fas fa-plus me-2"></i>
              Add
            </button>
          </div>

          {isFormVisible && (
            <div className="container mt-4 text-white align-item-center">
              <form>
                <div className="form-group px-5">
                  <input type="text" className="form-control" id="id" hidden value={Id} />

                  <label className="label">Name:</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="firstName"
                    value={FirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="form-group px-5">
                  <label className="label">LastName:</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="lastName"
                    value={LastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="form-group px-5">
                  <label className="label">Email:</label>
                  <input
                    type="email"
                    className="form-control mb-3"
                    id="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group px-5">
                  <label className="label">Password:</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group px-5">
                  <label className="label">Role:</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="role"
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value)}
                  />
                </div>

                <div className="mt-3">
                  <button className="btn btn-save" onClick={save}>
                    Save
                  </button>
                  <button className="btn btn-update" onClick={update}>
                    Update
                  </button>
                  <button className="btn btn-cancel" onClick={cancel}>
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
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">RoleId</th>
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
                    <td>{user.password}</td>
                    <td>{user.roleId}</td>
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
  );
}

export default Users;