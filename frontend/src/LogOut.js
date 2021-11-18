import React, {useEffect, useState} from "react";
import { Container } from "reactstrap";
import { useNavigate } from "react-router-dom";

const LogOut = ({ logOut })=>{
    const [isLoggingOut, setIsLoggingOut] = useState(true);
    const navigate = useNavigate();
    
    useEffect(()=>{
        logOut();
        setIsLoggingOut(false);
        navigate("/");
    }, [isLoggingOut])
    if (isLoggingOut)
        return (
            <Container>Logging out..</Container>
        );
    else{
        return (
            <Container>Logged out</Container>
        )
        
    }
}

export default LogOut;