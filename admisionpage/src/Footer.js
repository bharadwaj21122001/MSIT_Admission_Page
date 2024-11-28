import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; // You can add custom styling if needed

function Footer() {
  return (
    <footer className="footer py-4">
      <Container>
        <Row>
          <Col className="text-center">
            <p>For more details please contact us</p>
            <p>Email: <a href="mailto:iiith@msit.ac.in">iiith@msit.ac.in</a></p>
            <p>Website: <a href="https://msit.ac.in" target="_blank" rel="noopener noreferrer">msit.ac.in</a></p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
