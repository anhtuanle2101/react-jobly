import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "reactstrap";

const SignUpForm = ({ signUp })=>{
    const INIT_DATA = {username: "", password: "", firstName: "", lastName: "", email: ""};
    const [formData, setFormData] = useState(INIT_DATA);
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(formData);
        const { username, password, firstName, lastName, email} = formData;
        signUp({ username, password, firstName, lastName, email });
        navigate("/");
    }

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData(data=>({...data, [name]:value}));
    }
    return (
        <Container className="LoginForm">
            Sign Up Form
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
                <label htmlFor="firstName">First Name: </label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <label htmlFor="lastName">Last Name: </label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <label htmlFor="email">Email: </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <Button onClick={handleSubmit}>Submit</Button>
            </form>
        </Container>
    )
}

export default SignUpForm;