import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
//import "./contact.css";
import emailjs from '@emailjs/browser';

import Navbar from '../include/Navbar';
import flower from '../images/flower.png'; 

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

    const formRef = useRef();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        Load();
    }, []);

    async function Load() {
        try {
            const result = await axios.get('http://localhost:5091/api/Contact/GetAllList');
            console.log(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function save(event) {
        try {
            await axios.post('http://localhost:5091/api/Contact/Add', {
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

    const sendEmail = (e) => {
        return emailjs
            .sendForm('service_qi4am4r', 'template_5vvrue1', formRef.current, 'dazq5w4_RQabMTCVL')
            .then(
                () => {
                    setSuccess(true);
                    setError(false);
                },
                (error) => {
                    console.log(error);
                    setSuccess(false);
                    setError(true);
                }
            );
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSuccess(false);
        setError(false);

        try {
            await sendEmail(); 
            await save(); 
        } catch (err) {
            setError(true);
            showAlert("Failed to send the message.", "alert-danger-contact");
        }
    };

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
                    <div className="contact-wrapper">
                        <motion.img 
                            src={flower} 
                            alt="Flower" 
                            className="contact-image" 
                            variants={variants} 
                        />
                        <motion.form
                            ref={formRef}
                            onSubmit={handleFormSubmit}
                            className="contact-form"
                        >
                            <motion.h2 variants={variants}>Contact Us</motion.h2>
                            <div className="form-group-contact">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
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
                                    name="email"
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
                                    name="message"
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
                                {error && <p className="text-danger">Error sending the message</p>}
                                {success && <p className="text-success">Message sent successfully!</p>}
                            </div>

                            {isAlertVisible && (
                                <div className={`alert-contact ${alertType}`}>
                                    {alertMessage}
                                </div>
                            )}
                        </motion.form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Contact;