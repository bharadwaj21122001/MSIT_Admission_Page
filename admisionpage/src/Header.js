import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import './Header.css'; // Import custom CSS file for styling

function Header() {
  return (
    <header className="my-4">
      <Container>
        <Row className="align-items-center">
          {/* Logo on the left */}
          <Col xs={6} className="text-left">
            <img
              src="https://v.fastcdn.co/u/530047de/63644891-0-iiitlogo.png"
              alt="College Logo"
              width="150"
            />
          </Col>

          {/* Admissions text on the right */}
          <Col xs={6} className="text-right">
            <h1 className="header-text">Applications will open in January 2025 for MSIT</h1>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;