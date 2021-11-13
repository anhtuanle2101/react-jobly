import {NavLink} from "react-router-dom";
import React from "react";

const Nav = ()=>{
    return (
        <nav className="Nav">
            <h2>Jobly</h2>
            <NavLink to="/login">Log In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
        </nav>
    )
}

export default Nav;