import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./include/Navbar";
import Sidebar from "./include/Sidebar";
import { useNavigate } from "react-router-dom";

function ContactAdmin() {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const Toggle = () => {
    setToggle(!toggle);
  };

  // Fushat e Contact
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [contactList, setContactList] = useState([]);
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

  useEffect(() => {
    (async () => await loadContacts())();
  }, []);


  const sortContact = (order) => {
    const sortedContact = [...contactList].sort((a, b) => {
      const nameA = a.name || ''; 
      const nameB = b.name || ''; 
  
      if (order === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
    setContactList(sortedContact);
  };
  

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
    sortContact(e.target.value);
  };

  async function loadContacts() {
    try {
      const result = await axios.get("https://localhost:7214/api/Contact/GetAllList");
      setContactList(result.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7214/api/Contact/Add", {
        name: name,
        email: email,
        message: message,
      });
      showAlert("Contact added successfully!", "alert-success");
      clearForm();
      setIsFormVisible(false);
      loadContacts();
    } catch (err) {
      showAlert(`Error: ${err}`, "alert-danger");
    }
  }

  async function editContact(contact) {
    setName(contact.name);
    setEmail(contact.email);
    setMessage(contact.message);
    setId(contact.id);
    setIsFormVisible(true);
  }

  async function deleteContact(contactId) {
    try {
      await axios.delete(`https://localhost:7214/api/Contact/Delete?Id=${contactId}`);
      showAlert("Contact deleted successfully!", "alert-success");
      loadContacts();
    } catch (err) {
      showAlert(`Error: ${err}`, "alert-danger");
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.put(`https://localhost:7214/api/Contact/Update/${id}`, {
        id: id,
        name: name,
        email: email,
        message: message,
      });
      showAlert("Contact updated successfully!", "alert-success");
      clearForm();
      setIsFormVisible(false);
      loadContacts();
    } catch (err) {
      showAlert(`Error: ${err}`, "alert-danger");
    }
  }

  function clearForm() {
    setId("");
    setName("");
    setEmail("");
    setMessage("");
  }

  function showAlert(message, type) {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 4000); // Hide alert after 4 seconds
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
            <h4 className="text-dark">Data for Contacts</h4>
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

                  <label className="label">Name:</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>

                <div className="form-group px-5">
                  <label className="label">Email:</label>
                  <input
                    type="email"
                    className="form-control mb-3"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                <div className="form-group px-5">
                  <label className="label">Message:</label>
                  <textarea
                    className="form-control mb-3"
                    id="message"
                    rows={6}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  />
                </div>

                <div className="mt-3">
                  <button className="btn btn-save" onClick={save}>
                    Save
                  </button>
                  
                  <button className="btn btn-cancel" onClick={cancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {isAlertVisible && <div className={`alert ${alertType}`}>{alertMessage}</div>}

          <div className="user-order">
            <select 
              className="form-select-user"
              onChange={handleSortOrderChange}
              value={sortOrder}
            >
              <option value="asc">Sort A-Z</option>
              <option value="desc">Sort Z-A</option>
            </select>
          </div>



          <div className="table-responsive m-4 px-4">
            <table className="table border-gray">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Message</th>
                  <th scope="col">Options</th>
                </tr>
              </thead>
              <tbody>
                {contactList.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.id}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.message}</td>
                    <td className="options-cell d-flex justify-content-center align-items-center">
                      
                      <button
                        type="button"
                        className="btn btn-delete mx-2 d-flex align-items-center"
                        onClick={() => deleteContact(contact.id)}
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

export default ContactAdmin;