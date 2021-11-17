import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import { Button } from "reactstrap";

const LoginForm = ({ signIn })=>{
    const INIT_DATA = {username: "", password: ""};
    const [formData, setFormData] = useState(INIT_DATA);
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        const { username, password } = formData;
        signIn({ username, password });
        navigate("/");
    }

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData(data=>({...data, [name]:value}));
    }
    
    return (
        <Container className="LoginForm">
            Login Form
            <form>
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <Button onClick={handleSubmit}>Log In</Button>
            </form>
        </Container>
    )
}

export default LoginForm;