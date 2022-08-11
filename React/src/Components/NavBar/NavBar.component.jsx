import { NavLink } from "react-router-dom";
import "./navbar.component.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBook,
  faCartShopping,
  faHeart,
  faHouse,
  faRightToBracket,
  faRightFromBracket,
  faMobile,
  faDesktop,
  faLaptop,
  faAddressCard,
  faFileCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

const NavBarComponent = () => {
  const dispatch = useDispatch();
  const loggedInRedux = useSelector((state) => state.auth.loggedIn);
  const user = useSelector((state) => state.auth.userData);
  const userName = useSelector((state) => state.auth.userData.firstname);

  const logOut = () => {
    dispatch(authActions.logout());
    localStorage.clear();
  };

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light main-nav ">
        <div className="container-fluid nav-height">
          <a className="nav-link title-store">Refua Store</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  to="/home"
                  activeClassName="activeLink"
                >
                  <FontAwesomeIcon icon={faHouse} /> Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  to="/about"
                  activeClassName="activeLink"
                >
                  <FontAwesomeIcon icon={faBook} /> About Us
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link active dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Products
                </a>
                <ul
                  className="dropdown-menu drop-down-links"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/products/desktoppc"
                      activeClassName="activeLink"
                    >
                      <FontAwesomeIcon icon={faDesktop} /> Desktop Pc
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/products/smartphones"
                      activeClassName="activeLink"
                    >
                      <FontAwesomeIcon icon={faMobile} /> Smartphones
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/products/laptops"
                      activeClassName="activeLink"
                    >
                      <FontAwesomeIcon icon={faLaptop} /> Laptops
                    </NavLink>
                  </li>
                </ul>
              </li>
              {!loggedInRedux && (
                <Fragment>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      to="/login"
                      activeClassName="activeLink"
                    >
                      <FontAwesomeIcon icon={faRightToBracket} /> Login
                    </NavLink>
                  </li>
                </Fragment>
              )}
              {user.isAdmin && loggedInRedux && (
                <Fragment>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      to="/addproduct"
                      activeClassName="activeLink"
                    >
                      <FontAwesomeIcon icon={faFileCirclePlus} /> Add Product
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      to="/myproducts"
                      activeClassName="activeLink"
                    >
                      My Products
                    </NavLink>
                  </li>
                </Fragment>
              )}
              {loggedInRedux && (
                <Fragment>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      to="/products/myfavourites"
                      activeClassName="activeLink"
                      aria-current="page"
                    >
                      <FontAwesomeIcon icon={faHeart} /> My Favourites Products
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      to="/mycart"
                      activeClassName="activeLink"
                      aria-current="page"
                    >
                      <FontAwesomeIcon icon={faCartShopping} /> My Cart
                    </NavLink>
                  </li>
                </Fragment>
              )}
            </ul>
            {loggedInRedux && (
              <div className="">
                <li className="nav-item dropdown person-menu">
                  <a
                    className="nav-link active dropdown-toggle my-profile"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faUser} /> Hello , {userName}
                  </a>
                  <ul
                    className="dropdown-menu drop-down-links"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/users/myprofile"
                        activeClassName="activeLink"
                      >
                        <FontAwesomeIcon icon={faAddressCard} /> My Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/login"
                        activeClassName="activeLink"
                        onClick={logOut}
                      >
                        <FontAwesomeIcon icon={faRightFromBracket} /> Log-Out
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </div>
            )}
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default NavBarComponent;
