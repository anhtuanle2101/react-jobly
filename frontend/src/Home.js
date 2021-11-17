import React, {useContext} from "react";
import {Button, Container} from "reactstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import currentUserContext from "./currentUserContext";

const Home = ()=>{
    const {currentUser} = useContext(currentUserContext);
    return (
        <div className="Home">
            <h1>Jobly</h1>
            <p>All the jobs in one, convenient place</p>
            {currentUser?(
                <Container>
                    Welcome back, {currentUser.username}!
                </Container>
            ):(
                <Container>
                    <Link to="/login"><Button color="primary">Log In</Button></Link>
                    <Link to="/signup"><Button color="primary">Sign Up</Button></Link>
                </Container>
            )}
            
        </div>
    )
}

export default Home;