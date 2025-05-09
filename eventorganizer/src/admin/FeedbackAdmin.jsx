import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./include/Navbar";
import Sidebar from "./include/Sidebar";
import { FaStar } from "react-icons/fa"; // Importo ikonën FaStar për yjet

function FeedbackAdmin() {
  const [toggle, setToggle] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState("all");

  const Toggle = () => {
    setToggle(!toggle);
  };

  // Ngarko feedback-et dhe eventet përkatëse
  useEffect(() => {
    loadFeedbacks();
  }, []);

  // Ngarko feedback-et nga API
  async function loadFeedbacks() {
    try {
      const result = await axios.get("http://localhost:5091/api/Feedback/GetAllList");
      setFeedbacks(result.data);
      setFilteredFeedbacks(result.data);
    } catch (err) {
      console.error("Error loading feedbacks:", err);
    }
  }

  // Fshini një feedback
  async function deleteFeedback(feedbackId) {
    try {
      await axios.delete(`http://localhost:5091/api/Feedback/Delete?id=${feedbackId}`);
      showAlert("The feedback has been successfully deleted!", "alert-success");
      loadFeedbacks();
    } catch (err) {
      showAlert(`Error: ${err}`, "alert-danger");
    }
  }

  // Funksioni për të shfaqur mesazhe paralajmëruese
  function showAlert(message, type) {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertVisible(true);

    setTimeout(() => {
      setIsAlertVisible(false);
    }, 4000); // Hide the alert after 4 seconds
  }

  // Funksioni për të shfaqur yje në vend të numrit të rating
  function renderStars(rating) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          color={i <= rating ? "#ffc107" : "#e4e5e9"} // Yjet e mbushura për rating dhe ato bosh
        />
      );
    }
    return stars;
  }

  // Funksioni për të filtruar feedback-et bazuar në rating
  function handleRatingFilterChange(e) {
    const rating = e.target.value;
    setSelectedRating(rating);

    if (rating === "all") {
      setFilteredFeedbacks(feedbacks);
    } else {
      const filtered = feedbacks.filter(fb => fb.rating === parseInt(rating));
      setFilteredFeedbacks(filtered);
    }
  }

  ///////////////////////////////////////////////////////////////
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
            <h4 className="text-dark">Data for Feedback</h4>
          </div>

          {isAlertVisible && (
            <div className={`alert ${alertType}`}>
              {alertMessage}
            </div>
          )}

              {/* Dropdown për filtrimin e feedback-ut */}
              <div className="star-rating">
            <select 
                className="form-select" 
                value={selectedRating} 
                onChange={handleRatingFilterChange}
                style={{ width: "150px" }}
              >
                <option value="all">All Ratings</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>

          <div className="table-responsive m-4 px-4">
            <table className="table border-gray">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Surname</th>
                  <th scope="col">Comments</th>
                  <th scope="col">Rating</th>
                  <th scope="col">Event Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Theme</th>
                  <th scope="col">Options</th>
                </tr>
              </thead>
              <tbody>
                {filteredFeedbacks.map((feedback) => (
                  <tr key={feedback.id}>
                    <td>{feedback.id}</td>
                    <td>{feedback.name}</td>
                    <td>{feedback.surname}</td>
                    <td className="description-cell">"{feedback.comments}"</td>
                    <td>{renderStars(feedback.rating)}</td> {/* Shfaq rating me yje */}
                    <td>{feedback.events.eventName}</td>
                    <td>{feedback.events.eventCategories?.categoryName}</td>
                    <td>{feedback.events.eventThemes?.themeName}</td>
                    <td className="options-cell d-flex justify-content-center align-items-center">
                      <button
                        type="button"
                        className="btn btn-delete mx-2 d-flex align-items-center"
                        onClick={() => deleteFeedback(feedback.id)}
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

export default FeedbackAdmin;