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
  const [formStatus, setFormStatus] = useState(""); // To handle form submission status messages

  // Function to extract query parameters
  const getQueryParam = (name) => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(window.location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  useEffect(() => {
    // Get UTM parameters from URL
    const utm_source = getQueryParam("utm_source");
    const utm_id = getQueryParam("utm_id");

    // Map UTM source values to desired values
    const sourceMap = {
      lkd: "lkd",
      inst: "inst",
      bulk_email: "bulk_email",
    };

    // Update hidden fields if UTM parameters are present
    if (utm_source && sourceMap[utm_source]) {
      const sourceField = document.getElementById("field-e75fc277be0be4a39ef832c8743fbe47-4");
      if (sourceField) sourceField.value = sourceMap[utm_source];
    }

    if (utm_id) {
      const idField = document.getElementById("field-e75fc277be0be4a39ef832c8743fbe47-5");
      if (idField) idField.value = utm_id;
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear errors as user types
    if (e.target.name === "phoneNumber") setPhoneError("");
    if (e.target.name === "email") setEmailError("");
  };

  const handleQualificationChange = (e) => {
    setFormData({
      ...formData,
      qualification: e.target.value,
    });
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
    setFormStatus(""); // Reset form status before submission

    // Phone number validation
    if (formData.phoneNumber.length !== 10 || isNaN(formData.phoneNumber)) {
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
      // Send the reCAPTCHA response to the server for verification
      const recaptchaResponse = recaptchaValue;  // The response token
      const secretKey = "6Lc51YsqAAAAANPc0SVbXck-PzRTyvGfDWM1tOoG"; // Replace with your reCAPTCHA secret key

      const recaptchaVerification = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        body: new URLSearchParams({
          secret: secretKey,
          response: recaptchaResponse,
        }),
      });

      const recaptchaResult = await recaptchaVerification.json();

      if (!recaptchaResult.success) {
        alert("reCAPTCHA verification failed. Please try again.");
        return;
      }

      // Now submit the form to the Google Apps Script
      const scriptURL = "https://script.google.com/macros/library/d/18swqgyrnn3s8r5_TWXEbq1uOZ83aRl_JCviiC5yJ5MraP3e5dADgS1iI/1"; // Replace with your Google Apps Script deployment URL
      const response = await fetch(scriptURL, {
        method: "POST",
        body: new URLSearchParams({
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          qualification: formData.qualification,
          greGateScore: formData.greGateScore || "",
          aadharNumber: formData.aadharNumber,
          utm_source: document.getElementById("field-e75fc277be0be4a39ef832c8743fbe47-4").value,
          utm_id: document.getElementById("field-e75fc277be0be4a39ef832c8743fbe47-5").value,
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
      {/* Text Section */}
      <div className="text-container">
        <h2>Admissions for 2024 are closed now. Applications for the year 2025 will open in January 2025.</h2>
        <p>
          Interested candidates can fill out the application form. We will get
          back to you regarding the admission procedure in January 2025.
        </p>
      </div>

      {/* Form Section */}
      <div className="form-container">
        <Form onSubmit={handleSubmit}>
          <h3>Confirm your slot</h3>
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
              className="custom-select"
              name="qualification"
              value={formData.qualification}
              onChange={handleQualificationChange}
              required
            >
              <option value="" disabled>
                Highest Qualification
              </option>
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
              placeholder="Valid GRE/GATE score (Optional)"
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

          {/* reCAPTCHA */}
          {showRecaptcha && (
            <ReCAPTCHA
              sitekey="6Lc51YsqAAAAANPc0SVbXck-PzRTyvGfDWM1tOoG" // Replace with your reCAPTCHA site key
              onChange={handleRecaptchaChange}
            />
          )}

          <Button type="submit" variant="primary" className="mt-3">
            Submit
          </Button>
        </Form>

        {/* Form Submission Status */}
        {formStatus && (
          <Alert variant={formStatus === "Form submitted successfully!" ? "success" : "danger"} className="mt-3">
            {formStatus}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default AdmissionForm;