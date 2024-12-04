import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import "./AdmissionForm.css";

function AdmissionForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    qualification: "",
    otherQualification: "",
    greGateScore: "",
    aadharNumber: "",
  });

  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formStatus, setFormStatus] = useState("");

  // Function to extract query parameters
  const getQueryParam = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(window.location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  useEffect(() => {
    // Get UTM parameters from URL
    const utm_source = getQueryParam("utm_source") || "";
    const utm_id = getQueryParam("utm_id") || "";

    // Dynamically update hidden fields
    if (utm_source) {
      document.getElementById("utm_source_field").value = utm_source;
    }
    if (utm_id) {
      document.getElementById("utm_id_field").value = utm_id;
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "phoneNumber") setPhoneError("");
    if (e.target.name === "email") setEmailError("");
  };

  const handleQualificationChange = (e) => {
    setFormData({ ...formData, qualification: e.target.value });
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|net|org|edu|gov)$/i;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    setFormStatus("");

    // Phone number validation
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      setPhoneError("Please enter a valid 10-digit phone number.");
      isValid = false;
    }

    // Email validation
    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!isValid) return;

    if (!showRecaptcha) {
      setShowRecaptcha(true);
      return;
    }

    if (!recaptchaValue) {
      alert("Please complete the CAPTCHA.");
      return;
    }

    try {
      const scriptURL = "https://script.google.com/macros/s/AKfycbxt_YLME0Qmfb_xDXAKCPYr6MtCEPoSEQ5eh0S6nQHDqjWSHcWBMqI83JlW9iByHxf0aA/exec"; // Replace with your Apps Script deployment URL
      const response = await fetch(scriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          qualification: formData.qualification,
          greGateScore: formData.greGateScore || "",
          aadharNumber: formData.aadharNumber,
          utm_source: document.getElementById("utm_source_field")?.value || "",
          utm_id: document.getElementById("utm_id_field")?.value || "",
        }),
      });

      const result = await response.json();
      if (result.status === "success") {
        setFormStatus("Form submitted successfully!");
        setFormData({
          fullName: "",
          phoneNumber: "",
          email: "",
          qualification: "",
          otherQualification: "",
          greGateScore: "",
          aadharNumber: "",
        });
      } else {
        setFormStatus("Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <div className="form-page-container">
      <div className="text-container">
        <h2>Admissions for 2024 are closed now. Applications for 2025 will open in January 2025.</h2>
        <p>Fill out the form, and we will notify you when applications open.</p>
      </div>

      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          <h3>Confirm Your Slot</h3>
          <Form.Group controlId="fullName">
            <Form.Control
              type="text"
              placeholder="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="phoneNumber">
            <Form.Control
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {phoneError && <Alert variant="danger" className="mt-2">{phoneError}</Alert>}
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {emailError && <Alert variant="danger" className="mt-2">{emailError}</Alert>}
          </Form.Group>
          <Form.Group controlId="qualification">
            <Form.Control
              as="select"
              name="qualification"
              value={formData.qualification}
              onChange={handleQualificationChange}
              required
            >
              <option value="" disabled>Select Qualification</option>
              <option value="Bachelors">B.E/B.Tech</option>
              <option value="Masters">MCA</option>
              <option value="PhD">MSC</option>
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>
          {formData.qualification === "Other" && (
            <Form.Group controlId="otherQualification">
              <Form.Control
                type="text"
                placeholder="If Others"
                name="otherQualification"
                value={formData.otherQualification}
                onChange={handleChange}
              />
            </Form.Group>
          )}
          <Form.Group controlId="greGateScore">
            <Form.Control
              type="text"
              placeholder="GRE/GATE Score (Optional)"
              name="greGateScore"
              value={formData.greGateScore}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="aadharNumber">
            <Form.Control
              type="text"
              placeholder="Aadhar Number"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {showRecaptcha && (
            <ReCAPTCHA
              sitekey="6Lc51YsqAAAAANPc0SVbXck-PzRTyvGfDWM1tOoG" // Replace with your ReCAPTCHA site key
              onChange={handleRecaptchaChange}
            />
          )}
          <Button type="submit" variant="primary" className="mt-3">Submit</Button>
        </Form>
        {formStatus && (
          <Alert variant={formStatus.includes("success") ? "success" : "danger"} className="mt-3">
            {formStatus}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default AdmissionForm;
