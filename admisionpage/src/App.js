// src/App.js

import React from "react";
import AdmissionForm from "./Admissionform";  // Import the AdmissionForm component
import Header from "./Header";  // Import the Header component
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";  // Import Bootstrap CSS

function App() {
  return (
    <div>
      {/* Render the Header component */}
      <Header />

      {/* Render the Admission Form */}
      <AdmissionForm />
      <Footer />
    </div>
  );
}

export default App;
