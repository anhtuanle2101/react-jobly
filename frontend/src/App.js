// importing application components
import Home from "./Home";
import Nav from "./Nav";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import CompanyList from "./CompanyList";
import CompanyDetails from "./CompanyDetails";
import JobList from "./JobList";
import Profile from "./Profile";
import NotFound from "./NotFound";
import LogOut from "./LogOut";
// importing styles
import './App.css';
// React
import React, { useEffect, useState } from "react";
// React Router
import {BrowserRouter, Route, Routes} from "react-router-dom";
// Contexts
import currentUserContext from "./currentUserContext";
// // Api helper
import JoblyApi from "./api";


function App() {
  // const [isLoading, setIsLoading] = useState(false);
  
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // if (isLoading){
  //   return <h1>Loading</h1>
  // }
  
  // signUp function which utilizes the JoblyApi userSignUp function
  // Sign Up parameters: { username, password, firstName, lastName, email }
  // Returns {token} 
  const signUp = async ({ username, password, firstName, lastName, email })=>{
    const tokenResult = await JoblyApi.userSignUp({ username, password, firstName, lastName, email });
    setToken(tokenResult);
    setCurrentUser({username, token});
    console.log(token);
  }

  // signIn function which utilizes the JoblyApi userSignIn function
  // parameters: { username, password }
  // Returns { token } if authenticates
  const signIn = async ({ username, password })=>{
    const tokenResult = await JoblyApi.userSignIn({ username, password });
    setToken(tokenResult);
    setCurrentUser({username, token});
  }

  // logOut function which log out the currentUser
  // Returns { message: "success" } on success log out
  const logOut = async ()=>{
    if (token)
      setToken(null);
  }

  useEffect(()=>{
    if (!token){
      setCurrentUser(null);
      JoblyApi.token = null;
    }else{
      JoblyApi.token = token;
    }
  },[token])
  return (
    <div className="App">
      <currentUserContext.Provider value={{currentUser}}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<LoginForm signIn={signIn}/>}/>
            <Route path="/signup" element={<SignUpForm signUp={signUp}/>}/>
            <Route path="/companies">
              <Route path="" element={<CompanyList />}/>
              <Route path=":company" element={<CompanyDetails />}/>
            </Route>
            <Route path="/jobs" element={<JobList />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/logout" element={<LogOut logOut={logOut}/>}/>
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
      </currentUserContext.Provider>
      
    </div>
  );
}

export default App;
