import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./include/Navbar";
import Sidebar from "./include/Sidebar";
import { useNavigate } from "react-router-dom";
import "./Style.css";

function Reservations() {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const Toggle = () => {
    setToggle(!toggle);
  };

  const [id, setId] = useState("");
  const [Name, setName] = useState("");
  const [Surname, setSurname] = useState("");
  const [Date, setDate] = useState("");
  const [Price, setPrice] = useState("");
  const [reservationsList, setReservationsList] = useState([]);

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
    (async () => await loadReservations())();
  }, []);

  async function loadReservations() {
    try {
      const result = await axios.get("https://localhost:7214/api/Reservations/GetAllList");
      setReservationsList(result.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7214/api/Reservations/Add", {
        name: Name,
        surname: Surname,
        date: Date,
        price: Price,
      });
      showAlert("Reservation added successfully!", "alert-success");
      clearForm();
      setIsFormVisible(false);
      loadReservations();
    } catch (err) {
      showAlert(`Error: ${err}`, "alert-danger");
    }
  }

  async function editReservation(reservation) {
    setName(reservation.name);
    setSurname(reservation.surname);
    setDate(reservation.date);
    setPrice(reservation.price);
    setId(reservation.id);
    setIsFormVisible(true);
  }

  async function deleteReservation(reservationId) {
    try {
      await axios.delete(`https://localhost:7214/api/Reservations/Delete/${reservationId}`);
      showAlert("Reservation deleted successfully!", "alert-success");
      loadReservations();
    } catch (err) {
      showAlert(`Error: ${err}`, "alert-danger");
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.put(`https://localhost:7214/api/Reservations/Update/${id}`, {
        id: id,
        name: Name,
        surname: Surname,
        date: Date,
        price: Price,
      });
      showAlert("Reservation updated successfully!", "alert-success");
      clearForm();
      setIsFormVisible(false);
      loadReservations();
    } catch (err) {
      showAlert(`Error: ${err}`, "alert-danger");
    }
  }

  function clearForm() {
    setId("");
    setName("");
    setSurname("");
    setDate("");
    setPrice("");
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
              <h4 className="admin-title">Reservations Management</h4>
              <button className="btn btn-add" onClick={toggleFormVisibility}>
                <i className="fas fa-plus"></i>
                <span>Add Reservation</span>
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
                      value={Name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Surname:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="surname"
                      value={Surname}
                      onChange={(event) => setSurname(event.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      value={Date}
                      onChange={(event) => setDate(event.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="label">Price:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      value={Price}
                      onChange={(event) => setPrice(event.target.value)}
                    />
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
                    <th scope="col">Surname</th>
                    <th scope="col">Date</th>
                    <th scope="col">Price</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {reservationsList.map((reservation) => (
                    <tr key={reservation.id}>
                      <td>{reservation.id}</td>
                      <td>{reservation.name}</td>
                      <td>{reservation.surname}</td>
                      <td>{reservation.date}</td>
                      <td>{reservation.price}</td>
                      <td className="options-cell d-flex justify-content-center align-items-center">
                        <button
                          type="button"
                          className="btn btn-edit mx-2 d-flex align-items-center"
                          onClick={() => editReservation(reservation)}
                        >
                          <i className="fas fa-edit"></i>
                          <span className="ms-2">Edit</span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-delete mx-2 d-flex align-items-center"
                          onClick={() => deleteReservation(reservation.id)}
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

export default Reservations;