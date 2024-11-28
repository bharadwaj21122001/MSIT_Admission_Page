import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha"; // Importing reCAPTCHA
import './AdmissionForm.css'; // Custom CSS for styling

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
  const [recaptchaValue, setRecaptchaValue] = useState(null); // State to store recaptcha response

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleQualificationChange = (e) => {
    setFormData({
      ...formData,
      qualification: e.target.value,
    });
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value); // Store recaptcha response value
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recaptchaValue) {
      alert("Please complete the CAPTCHA.");
      return;
    }
    console.log(formData);
  };

  return (
    <div className="form-container">
      <Row className="align-items-center">
        {/* Left side Text */}
        <Col md={6}>
          <div className="text-container">
            <h2 className="bold-text">
              Admissions for 2024 are closed now. Applications for the year 2025 will open in January 2025.
            </h2>
            <p className="small-text">
              Interested students can fill out the application form. We will get back to you regarding the admission
              procedure in January 2025.
            </p>
          </div>
        </Col>

        {/* Right side Form */}
        <Col md={6}>
          <Form onSubmit={handleSubmit} className="application-form">
            {/* Heading */}
            <h3 className="form-heading">Confirm Slot</h3>

            {/* Full Name */}
            <Form.Group controlId="fullName">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Phone Number */}
            <Form.Group controlId="phoneNumber">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Email */}
            <Form.Group controlId="email">
              <Form.Label></Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Highest Qualification */}
            <Form.Group controlId="qualification">
              <Form.Label></Form.Label>
              <Form.Control
                as="select"
                name="qualification"
                value={formData.qualification}
                onChange={handleQualificationChange}
                required
              >
                <option value="">Highest Qualification</option>
                <option value="Bachelors">Bachelors</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>

            {/* If Other */}
            <Form.Group controlId="otherQualification">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="If Others"
                name="otherQualification"
                value={formData.otherQualification}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Valid GRE/GATE Score */}
            <Form.Group controlId="greGateScore">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                placeholder="Valid GRE/GATE score (Optional)"
                name="greGateScore"
                value={formData.greGateScore}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Aadhar Number */}
            <Form.Group controlId="aadharNumber">
              <Form.Label></Form.Label>
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
            <Form.Group>
              <ReCAPTCHA
                sitekey="6Lc51YsqAAAAANPc0SVbXck-PzRTyvGfDWM1tOoG" // Replace with your reCAPTCHA site key
                onChange={handleRecaptchaChange}
              />
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default AdmissionForm;
