import React, {useEffect, useState} from "react";
import { Container } from "reactstrap";
import { useNavigate } from "react-router-dom";

const LogOut = ({ logOut })=>{
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        logOut();
        navigate("/");
    })
    if (isLoading)
        return <p>Loading..</p>
    return(
        <Container>

        </Container>
    )
}

export default LogOut;