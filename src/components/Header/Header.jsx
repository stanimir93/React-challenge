import "./header.css";
import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/fxdigitallogo.png";

export const Header = () => {
  return (
    <header>
      <nav>
        <img src={logo} alt='logo' />
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
      </nav>
    </header>
  );
};

export default Header;
