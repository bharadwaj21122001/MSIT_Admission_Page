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
  const [aadharError, setAadharError] = useState("");
  const [formStatus, setFormStatus] = useState("");

  // Function to extract query parameters
  const getQueryParam = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(window.location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
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
    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|net|org|edu|gov)$/i;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let isValid = true;
    setFormStatus("");
  
    // Reset error messages
    setPhoneError("");
    setEmailError("");
    setAadharError("");
  
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
  
    // Aadhar number validation
    if (!/^\d{12}$/.test(formData.aadharNumber)) {
      setAadharError("Please enter a valid 12-digit Aadhar number.");
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
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbwkWM_NLsEm_qNFznpBHO7p1bS-gdGmfoVdpCjUitXjXMl-pxBaCvo2ONDZT6deR2Md/exec";
  
      const response = await fetch(scriptURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          "Full Name": formData.fullName,
          "Phone Number": formData.phoneNumber,
          "Email": formData.email,
          "Highest Qualifications": formData.qualification,
          "Aadhar number": formData.aadharNumber,
        }),
      });
  
      const result = await response.json();
      console.log("Server Response:", result);
      if (result.result === "success") {
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
      setFormStatus(
        "There was an error submitting the form. Please try again."
      );
    }
  };    

  return (
    <div className="form-page-container">
      <div className="text-container">
        <h2>
          Admissions for 2024 are closed now. Applications for 2025 will open in
          January 2025.
        </h2>
        <p>Interested candidates can fill out the application form. We will get back to you regarding the admission procedure in January 2025.</p>
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
            {phoneError && (
              <Alert variant="danger" className="mt-2">
                {phoneError}
              </Alert>
            )}
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
            {emailError && (
              <Alert variant="danger" className="mt-2">
                {emailError}
              </Alert>
            )}
          </Form.Group>
          <Form.Group controlId="qualification">
            <Form.Control
              as="select"
              name="qualification"
              value={formData.qualification}
              onChange={handleQualificationChange}
              required
            >
              <option value="" disabled>
                Select Qualification
              </option>
              <option value="B.E/B.Tech">B.E/B.Tech</option>
              <option value="MCA">MCA</option>
              <option value="MSC">MSC</option>
              <option value="Others">Others</option>
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
            {aadharError && (
              <Alert variant="danger" classname="mt-2">
                {aadharError}
              </Alert>
            )}
          </Form.Group>
          {showRecaptcha && (
            <ReCAPTCHA
              sitekey="6Lc51YsqAAAAANPc0SVbXck-PzRTyvGfDWM1tOoG" // Replace with your ReCAPTCHA site key
              onChange={handleRecaptchaChange}
            />
          )}
          <Button type="submit" variant="primary" className="mt-3">
            Submit
          </Button>
        </Form>
        {formStatus && (
          <Alert
            variant={formStatus.includes("success") ? "success" : "danger"}
            className="mt-3"
          >
            {formStatus}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default AdmissionForm;