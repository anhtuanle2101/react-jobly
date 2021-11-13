import {NavLink} from "react-router-dom";
import React from "react";
import "./Nav.css";

const Nav = ()=>{
    return (
        <nav className="Nav">
            <h2><NavLink to="/">Jobly</NavLink></h2>
            <NavLink to="/login">Log In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
        </nav>
    )
}

export default Nav;