import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./contact.css";

import Navbar from '../include/Navbar';


const variants = {
    initial: {
        y: 500,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            staggerChildren: 0.1,
        },
    },
};

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        Load();
    }, []);

    async function Load() {
        try {
            const result = await axios.get('https://localhost:7214/api/Contact/GetAllList');
            console.log(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function save(event) {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post('https://localhost:7214/api/Contact/Add', {
                name: name,
                email: email,
                message: message,
            });
            showAlert("Your message has been sent successfully!", "alert-success-contact");
            setName("");
            setEmail("");
            setMessage("");
        } catch (err) {
            showAlert(`Error: ${err}`, "alert-danger-contact");
        } finally {
            setIsSubmitting(false);
        }
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
        <div>
            <Navbar />

            <motion.div
                className="contact"
                variants={variants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
            >
                <div className="formContainer contact-form-container">
                    <motion.h2 variants={variants}>Contact Us</motion.h2>
                    <motion.form onSubmit={save}>
                        <div className="form-group-contact">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group-contact">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group-contact">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                className="form-control"
                                placeholder="Your Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn-contact"
                                disabled={isSubmitting}
                                style={{ backgroundColor: "#ff7b54" }}
                            >
                                {isSubmitting ? "Sending..." : "Send"}
                            </button>
                        </div>
                    </motion.form>

                    {isAlertVisible && (
                        <div className={`alert-contact ${alertType}`}>
                            {alertMessage}
                        </div>
                    )}
                </div>
            </motion.div>

           
        </div>
    );
}

export default Contact;