import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./include/Navbar";
import Sidebar from "./include/Sidebar";
import { useNavigate } from "react-router-dom";

function Reservations() {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const Toggle = () => {
    setToggle(!toggle);
  };

  const [Reservations, setReservations] = useState([]);
  const [Id, setId] = useState("");
  const [Name, setName] = useState("");
  const [Surname, setSurname] = useState("");
  const [reservationDate, setReservationDate] = useState(""); // Ndryshimi këtu
  const [Price, setPrice] = useState("");
  const [UserId, setUserId] = useState("");
  const [EventId, setEventId] = useState("");


  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const cancel = () => {
    setIsFormVisible(false);
    clearForm();
  };

  useEffect(() => {
    (async () => {
      await loadReservations();
    })();
  }, []);

  async function loadReservations() {
    try {
      const result = await axios.get("https://localhost:7214/api/Reservation/GetAllList");
      setReservations(result.data);
    } catch (err) {
      console.error("Error loading Users:", err);
    }
  }

  const filteredReservations = selectedDate
    ? Reservations.filter(reservation =>
        new Date(reservation.reservationDate).toDateString() === new Date(selectedDate).toDateString()
      )
    : Reservations;

  async function save(e) {
    e.preventDefault();
    try {
      await axios.post("https://localhost:7214/api/Reservation/AddReservation", {
        name: Name,
        surname: Surname,
        reservationDate: reservationDate, // Ndryshimi këtu
        totalPrice: Price,
        userId: UserId,
        eventId: EventId
      });
      showAlert("The reservation has been successfully done!", "alert-success");
      clearForm();
      setIsFormVisible(false);
      loadReservations();
    } catch (err) {
      showAlert(`Error: ${err.message}`, "alert-danger");
    }
  }

  async function editReservation(reservation) {
    setId(reservation.reservationID);
    setName(reservation.name);
    setSurname(reservation.surname);
    setReservationDate(reservation.reservationDate); // Ndryshimi këtu
    setPrice(reservation.totalPrice);
    setUserId(reservation.userID);
    setEventId(reservation.eventID);
    setIsFormVisible(true);
  }

  async function deleteReservation(reservationId) {
    try {
      await axios.delete(`https://localhost:7214/api/Reservation/DeleteReservation/${reservationId}`);
      showAlert("The reservation has been successfully deleted!", "alert-success");
      loadReservations();
    } catch (err) {
      showAlert(`Error: ${err.message}`, "alert-danger");
    }
  }

  async function update(e) {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7214/api/Reservation/UpdateReservation/${Id}`, {
        name: Name,
        surname: Surname,
        reservationDate: reservationDate, // Ndryshimi këtu
        totalPrice: Price,
        userId: UserId,
        eventId: EventId
      });
      showAlert("The reservation has been successfully updated!", "alert-success");
      clearForm();
      setIsFormVisible(false);
      loadReservations();
    } catch (err) {
      showAlert(`Error: ${err.response ? err.response.data : err.message}`, "alert-danger");
    }
  }

  function clearForm() {
    setId("");
    setName("");
    setSurname("");
    setReservationDate(""); // Ndryshimi këtu
    setPrice("");
    setUserId("");
    setEventId("");
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
            <h4 className="text-dark">Data for Reservations</h4>
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
                    id="name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group px-5">
                  <label className="label">Surname:</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="surname"
                    value={Surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </div>

                <div className="form-group px-5">
                  <label className="label">Date:</label>
                  <input
                    type="date"
                    className="form-control mb-3"
                    id="date"
                    value={reservationDate} // Ndryshimi këtu
                    onChange={(e) => setReservationDate(e.target.value)} // Ndryshimi këtu
                  />
                </div>

                <div className="form-group px-5">
                  <label className="label">Price:</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="price"
                    value={Price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group px-5">
                  <label className="label">UserID:</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="userId"
                    value={UserId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </div>

                <div className="form-group px-5">
                  <label className="label">EventID:</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="eventId"
                    value={EventId}
                    onChange={(e) => setEventId(e.target.value)}
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


          <div className="mt-4 px-5 reservation-date">
            <label htmlFor="reservationDate" className="label">Select Date:</label>
            <input
              type="date"
              id="reservationDate"
              className="form-control mb-3"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="table-responsive m-4 px-4">
            <table className="table border-gray">
              <thead>
                <tr>
                <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Surname</th>
                  <th scope="col">Reservation Date</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">User ID</th>
                  <th scope="col">Event ID</th>
                  <th scope="col">Options</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((reservation, index) => (
                  <tr key={index}>
                    <td>{reservation.reservationID}</td>
                    <td>{reservation.name}</td>
                    <td>{reservation.surname}</td>
                    <td>{reservation.reservationDate}</td>
                    <td>{reservation.totalPrice}</td>
                    <td>{reservation.userID}</td>
                    <td>{reservation.eventID}</td>
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
                        onClick={() => deleteReservation(reservation.reservationID)}
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

export default Reservations;
