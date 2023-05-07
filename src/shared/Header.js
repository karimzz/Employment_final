import React, { Fragment } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "../css/Header.css";
import { removeAuthUser, getAuthUser } from "../helper/Storage";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const auth = getAuthUser();
  const Logout = () => {
    removeAuthUser();
    navigate("/");
  };

  const data = localStorage.getItem("user") ; 
  const isAdmin = JSON.parse(data) ; 

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link className="nav-link" to={"/"}>
              Employment
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
          <Link className="nav-link" to={"/"}>
          List Jobs
            </Link>
            
            

            {/* unAuthenticated Route  */}
            {!auth && (
              <>
                <Link className="nav-link" to={"/login"}>
                  Login
                </Link>
                <Link className="nav-link" to={"/register"}>
                  Register
                </Link>
              </>
            )}

            {/* Admin Routes  */}

            {auth && auth.role === 1 && (
              <>
                <Link className="nav-link" to={"/manage-movies"}>
                  Manage Jobs
                </Link>
                <Link className="nav-link" to={"/manage-user"}>
                    Manage User
                </Link>
                <Link className="nav-link"  to={"/manage-jobs"}>Manage Jobs Offer</Link>
              </>
            )}
          </Nav>

          <Nav className="ms-auto">
            {/* Authenticated Routes  */}
            {auth && <Nav.Link onClick={Logout}>Logout</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
