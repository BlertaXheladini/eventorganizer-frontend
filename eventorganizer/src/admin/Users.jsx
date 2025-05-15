// Users.js
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

  const loggedInRoleId = localStorage.getItem("roleId"); // Merr rolin e përdoruesit të loguar

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
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      
      console.log('Token Status Check:', {
        hasToken: !!token,
        expirationTime: tokenExpiration ? new Date(parseInt(tokenExpiration)).toLocaleTimeString() : 'No expiration time',
        currentTime: new Date().toLocaleTimeString(),
        timeRemaining: tokenExpiration ? Math.max(0, (parseInt(tokenExpiration) - new Date().getTime()) / 1000 / 60) : 0
      });
      
      if (token && tokenExpiration) {
        const now = new Date().getTime();
        if (now > parseInt(tokenExpiration)) {
          console.log('Token has expired! Redirecting to login...');
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiration');
          localStorage.removeItem('roleId');
          navigate('/login');
        }
      }
    };

    // Check token expiration every minute
    const interval = setInterval(checkTokenExpiration, 60000);
    
    // Initial check
    checkTokenExpiration();

    // Load data
    (async () => {
      await loadUsers();
      await loadRoles();
    })();

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [navigate]);

  // Add this function to handle successful login
  const handleSuccessfulLogin = (token) => {
    const expirationTime = new Date().getTime() + 10 * 60 * 1000; // 10 minutes from now
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', expirationTime.toString());
    
    console.log('New Token Set:', {
      token: token.substring(0, 10) + '...', // Show only first 10 chars for security
      expiresAt: new Date(expirationTime).toLocaleTimeString(),
      timeRemaining: '10 minutes'
    });
  };

  // Ngarko të gjithë përdoruesit
  async function loadUsers() {
    try {
      const result = await axios.get("http://localhost:5091/api/Users/GetAllList");
      setUsers(result.data);
    } catch (err) {
      console.error("Error loading Users:", err);
    }
  }

  // Ngarko të gjitha rolet
  async function loadRoles() {
    try {
      const result = await axios.get("http://localhost:5091/api/Roles/GetAllList");
      setRoles(result.data);
    } catch (err) {
      console.error("Error loading roles:", err);
    }
  }

  // Ruaj përdoruesin e ri
  async function save(e) {
    e.preventDefault();
    try {
      // Check token expiration before making the request
      const tokenExpiration = localStorage.getItem('tokenExpiration');
      if (tokenExpiration && new Date().getTime() > parseInt(tokenExpiration)) {
        console.log('Token expired during save operation');
        showAlert("Your session has expired. Please log in again.", "alert-danger");
        navigate('/login');
        return;
      }

      console.log('Saving user with valid token');
      await axios.post("http://localhost:5091/api/Users/Register", {
        firstName: FirstName,
        lastName: LastName,
        email: Email,
        password: Password,
        roleId: roleId,
      });

      showAlert("The user has been successfully registered!", "alert-success");
      clearForm();
      setIsFormVisible(false);
      loadUsers();
    } catch (err) {
      console.error('Error during save operation:', err);
      showAlert(`Error: ${err.response.data}`, "alert-danger");
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
      await axios.delete(`http://localhost:5091/api/Users/Delete?Id=${userId}`);
      showAlert("The user has been successfully deleted!", "alert-success");
      loadUsers();
    } catch (err) {
      showAlert(`Error: ${err.response.data}`, "alert-danger");
      console.error("Error deleting user:", err.response.data);
    }
  }

  // Përditëso përdoruesin
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

  // Funksioni për eksportimin e përdoruesve në Excel
  const exportToExcel = async () => {
    try {
      const response = await axios({
        url: "http://localhost:5091/api/Users/ExportUsersToExcel",
        method: "GET",
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Users.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error exporting users to Excel:", error);
    }
  };

  // Shfaqje e mesazhit të gabimit ose suksesit
  function showAlert(message, type) {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 4000);
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
                    {Roles.filter(
                      (role) =>
                        loggedInRoleId === "1" || // SuperAdmin mund të zgjedhë të gjitha rolet
                        (loggedInRoleId === "2" && role.name === "User") // Mod mund të zgjedhë vetëm rolin "User"
                    ).map((role) => (
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
            <button className="btn btn-export-excel ms-3" onClick={exportToExcel}>
              Export to Excel
              <i className="fas fa-file-excel ms-2"></i>
            </button>
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
                  {/* Fsheh kolonën Options nëse është Mod */}
                  {loggedInRoleId === "1" && <th scope="col">Options</th>}
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
                    {/* Fsheh butonat Edit dhe Delete nëse është Mod */}
                    {loggedInRoleId === "1" && (
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
                    )}
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