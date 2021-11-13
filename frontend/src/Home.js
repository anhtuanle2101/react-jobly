import React from "react";
import {Button} from "reactstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const Home = ()=>{
    return (
        <div className="Home">
            <h1>Jobly</h1>
            <p>All the jobs in one, convenient place</p>
            <Link to="/login"><Button color="primary">Log In</Button></Link>
            <Link to="/signup"><Button color="primary">Sign Up</Button></Link>
        </div>
    )
}

export default Home;