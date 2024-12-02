import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
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
    setRecaptchaValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showRecaptcha) {
      setShowRecaptcha(true);
      return;
    }
    if (!recaptchaValue) {
      alert("Please complete the CAPTCHA.");
      return;
    }
    console.log(formData);
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
          <h3>Confirm Slot</h3>
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
          </Form.Group>

          <Form.Group controlId="qualification">
            <Form.Control
              as="select"
              name="qualification"
              value={formData.qualification}
              onChange={handleQualificationChange}
              required
            >
              <option value="">Highest Qualification</option>
              <option value="Bachelors">B.E/B.Tech</option>
              <option value="Masters">MCA</option>
              <option value="PhD">MSC</option>
              <option value="Others">Other</option>
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

          {showRecaptcha && (
            <Form.Group>
              <ReCAPTCHA
                sitekey="6Lc51YsqAAAAANPc0SVbXck-PzRTyvGfDWM1tOoG"
                onChange={handleRecaptchaChange}
              />
            </Form.Group>
          )}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AdmissionForm;