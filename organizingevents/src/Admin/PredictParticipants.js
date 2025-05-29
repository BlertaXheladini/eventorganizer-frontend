import React, { useState, useEffect } from "react";
import "./PredictParticipants.css";

const PredictParticipants = () => {
    const [eventId, setEventId] = useState("");
    const [city, setCity] = useState("");
    const [predictionDate, setPredictionDate] = useState("");
    const [predictionResult, setPredictionResult] = useState(null);
    const [isModelTrained, setIsModelTrained] = useState(false);
    const [loadingTrain, setLoadingTrain] = useState(false);
    const [loadingPredict, setLoadingPredict] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const [isDateValid, setIsDateValid] = useState(true); // Shtohet për validimin e datës

    useEffect(() => {
        if (predictionDate) {
            const selectedDate = new Date(predictionDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            setIsDateValid(selectedDate >= today);
        }
    }, [predictionDate]);

    const handleTrainModel = async () => {
        try {
            setLoadingTrain(true);
            setAlertMessage("");
            const response = await fetch("https://localhost:7214/api/Prediction/train");

            if (response.ok) {
                setAlertMessage("✅ Modeli u trajnua me sukses!");
                setAlertType("success");
                setIsModelTrained(true);
            } else {
                setAlertMessage("❌ Gabim gjatë trajnimit të modelit.");
                setAlertType("danger");
            }
        } catch (error) {
            setAlertMessage("⚠️ Gabim gjatë trajnimit të modelit.");
            setAlertType("danger");
        } finally {
            setLoadingTrain(false);
        }
    };

    const handlePredict = async () => {
        if (!isModelTrained) {
            setAlertMessage("⚠️ Ju lutemi trajnojeni modelin para se të bëni parashikime!");
            setAlertType("danger");
            return;
        }

        if (!eventId || !city || !predictionDate) {
            setAlertMessage("⚠️ Ju lutemi plotësoni të gjitha fushat.");
            setAlertType("danger");
            return;
        }

        const formattedDate = predictionDate;

        try {
            setLoadingPredict(true);
            setAlertMessage("");

            const response = await fetch(
                `https://localhost:7214/api/Prediction/predict?eventId=${eventId}&city=${encodeURIComponent(city)}&date=${formattedDate}`
            );

            const data = await response.json();

            if (data.participants !== undefined && !isNaN(data.participants)) {
                setPredictionResult(data.participants);
                setAlertMessage("✅ Parashikimi u realizua me sukses!");
                setAlertType("success");
            } else {
                setAlertMessage("❌ Gabim në parashikim.");
                setAlertType("danger");
                setPredictionResult(null);
            }
        } catch (error) {
            setAlertMessage("⚠️ Gabim gjatë lidhjes me serverin.");
            setAlertType("danger");
        } finally {
            setLoadingPredict(false);
        }
    };

    return (
        <div className="predict-container">
            <div className="predict-card">
                <h2>Predict Participants</h2>

                {alertMessage && (
                    <div className={`alert alert-${alertType} mt-2`} role="alert">
                        {alertMessage}
                    </div>
                )}

                <button
                    className="btn btn-success w-100 mb-3"
                    onClick={handleTrainModel}
                    disabled={loadingTrain}
                >
                    {loadingTrain ? "Training..." : "Train Model"}
                </button>

                <div className="form-group">
                    <label>Event ID:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={eventId}
                        onChange={(e) => setEventId(e.target.value)}
                        disabled={!isModelTrained}
                        style={{ width: "345px" }}
                    />
                </div>
                <div className="form-group">
                    <label>City:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        disabled={!isModelTrained}
                        style={{ width: "345px" }}
                    />
                </div>
                <div className="form-group">
                    <label>Prediction Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={predictionDate}
                        onChange={(e) => setPredictionDate(e.target.value)}
                        disabled={!isModelTrained}
                        style={{ width: "345px" }}
                    />
                    {!isDateValid && (
                        <small className="text-danger">⚠️ Ju lutemi zgjidhni një datë të ardhshme.</small>
                    )}
                </div>

                <button
                    className="btn btn-primary mt-3 w-100"
                    onClick={handlePredict}
                    disabled={!isModelTrained || loadingPredict || !isDateValid}
                >
                    {loadingPredict ? "Predicting..." : "Predict Participants"}
                </button>

                {predictionResult !== null && (
                    <div className="mt-3 result-box">
                        <p className="fw-bold">Parashikohen {Math.round(predictionResult)} pjesëmarrës</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PredictParticipants;
