import React from 'react';
import Link from 'react-router/lib/Link';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Menu() {
  return (
    <div className="navbar-placeholder">
      <Navbar fixedTop inverse collapseOnSelect fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">SpeakerBox</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/stream">
              <NavItem>Stream</NavItem>
            </LinkContainer>
            <LinkContainer to="/schedule">
              <NavItem>Schedule</NavItem>
            </LinkContainer>
            <LinkContainer to="/metrics">
              <NavItem>Metrics</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <LinkContainer to="/settings">
              <NavItem>Settings</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
