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
  const [Roles, setRoles] = useState([]); // Për rolet
  const [sortOrder, setSortOrder] = useState("asc");

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


  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
    sortUsers(e.target.value);
  };
  
  const sortUsers = (order) => {
    const sortedUsers = [...Users].sort((a, b) => {
      if (order === "asc") {
        return a.firstName.localeCompare(b.firstName);
      } else {
        return b.firstName.localeCompare(a.firstName);
      }
    });
    setUsers(sortedUsers);
  };

  useEffect(() => {
    (async () => {
      await loadUsers();
      await loadRoles(); // Thirrja për të marrë rolet
    })();
  }, []);

  // Ngarko të gjithë përdoruesit
  async function loadUsers() {
    try {
      const result = await axios.get("https://localhost:7214/api/Users/GetAllList");
      setUsers(result.data);
    } catch (err) {
      console.error("Error loading Users:", err);
    }
  }

  // Ngarko të gjitha rolet
  async function loadRoles() {
    try {
      const result = await axios.get("https://localhost:7214/api/Roles/GetAllList"); // Endpoin për rolet
      setRoles(result.data);
    } catch (err) {
      console.error("Error loading roles:", err);
    }
  }

  // Ruaj përdoruesin e ri
  async function save(e) {
    e.preventDefault(); // Prevent default form submission
    try {
      console.log({
        firstName: FirstName,
        lastName: LastName,
        email: Email,
        password: Password,
        roleId: roleId,
      });

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
      showAlert(`Error: ${err.response.data}`, "alert-danger");
      console.error("Error saving user:", err.response.data);
    }
  }

  // Edito përdoruesin ekzistues
  async function editUser(user) {
    setId(user.id);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPassword(""); // Don't pre-fill the password for security reasons
    setRoleId(user.roleId);
    setIsFormVisible(true);
  }

  // Fshi përdoruesin
  async function deleteUser(userId) {
    try {
      await axios.delete(`https://localhost:7214/api/Users/Delete?Id=${userId}`);
      showAlert("The user has been successfully deleted!", "alert-success");
      loadUsers(); // Reload the users after deleting
    } catch (err) {
      showAlert(`Error: ${err.response.data}`, "alert-danger");
      console.error("Error deleting user:", err.response.data);
    }
  }

  // Përditëso përdoruesin
  async function update(e) {
    e.preventDefault(); // Prevent default form submission
    try {
      await axios.put(`https://localhost:7214/api/Users/UpdateUser`, {
        id: Id,
        firstName: FirstName,
        lastName: LastName,
        email: Email,
        password: Password, // Send new password if it was changed
        roleId: roleId,
      });

      showAlert("The user has been successfully updated!", "alert-success");
      clearForm();
      setIsFormVisible(false);
      loadUsers(); // Reload the users after update
    } catch (err) {
      showAlert(`Error: ${err.response.data}`, "alert-danger");
      console.error("Error updating user:", err.response.data);
    }
  }

  // Pastro formën
  function clearForm() {
    setId("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRoleId("");
  }

  // Shfaqje e mesazhit të gabimit ose suksesit
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

                  <label className="label">First Name:</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="firstName"
                    value={FirstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="form-group px-5">
                  <label className="label">Last Name:</label>
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
                    type="password"
                    className="form-control mb-3"
                    id="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group px-5">
                  <label className="label">Role:</label>
                  <select
                    className="form-control mb-3"
                    id="role"
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value)}
                  >
                    <option value="">Select Role</option>
                    {Roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
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

          <div className="user-order">
            <select className="form-select-user" value={sortOrder} onChange={handleSortOrderChange}>
                <option value="asc">Sort A-Z</option>
                <option value="desc">Sort Z-A</option>
            </select>
          </div>

          <div className="table-responsive m-4 px-4">
            <table className="table border-gray">
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
                    <td>{Roles.find((role) => role.id === user.roleId)?.name || "N/A"}</td>
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