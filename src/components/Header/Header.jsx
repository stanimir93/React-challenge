import "./header.css";
import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/fxdigitallogo.png";

export const Header = () => {
  return (
    <header>
      <div className='header-container'>
        <img src={logo} alt='logo' />
        <nav>
          <NavLink className={"header__link"} to='/'>
            HOME
          </NavLink>
          <NavLink className={"header__link"} to='/about'>
            ABOUT
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
