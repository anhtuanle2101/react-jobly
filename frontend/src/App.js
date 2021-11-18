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
import React, { useEffect } from "react";
// React Router
import {BrowserRouter, Route, Routes} from "react-router-dom";
// Contexts
import currentUserContext from "./currentUserContext";
// // Api helper
import JoblyApi from "./api";
// Custom hook
import useLocalStorage from "./useLocalStorage";


function App() {

  const [token, setToken, setTokenToLocalStorage, getTokenFromLocalStorage] = useLocalStorage("token");
  const [currentUser, setCurrentUser, setUserToLocalStorage, getUserFromLocalStorage] = useLocalStorage("user");

  // signUp function which utilizes the JoblyApi userSignUp function
  // Sign Up parameters: { username, password, firstName, lastName, email }
  // Returns {token} 
  const signUp = async ({ username, password, firstName, lastName, email })=>{
    const tokenResult = await JoblyApi.userSignUp({ username, password, firstName, lastName, email });
    setCurrentUser(username);
    setToken(tokenResult);
  }

  // signIn function which utilizes the JoblyApi userSignIn function
  // parameters: { username, password }
  // Returns { token } if authenticates
  const signIn = async ({ username, password })=>{
    const tokenResult = await JoblyApi.userSignIn({ username, password });
    setCurrentUser(username);
    setToken(tokenResult);
    setUserToLocalStorage(username);
    setTokenToLocalStorage(tokenResult);
  }

  // updateInfo function updates user information input with correct password
  const updateInfo = async ({ firstName, lastName, email, password })=>{
    // password has to match
    const token = await JoblyApi.userSignIn({ username: currentUser, password });
    if (!token){
      return;
    }else{
      console.log(token);
      const userDetails = await JoblyApi.userUpdate({ username: currentUser, firstName, lastName, email });
      return userDetails;
    }
  }

  // logOut function which log out the currentUser and clears the localStorage;
  const logOut = async ()=>{
    setToken();
    setCurrentUser();
    JoblyApi.token = null;
    await localStorage.clear();
  }

  // getData function collects user information of the currentUser
  const getData = async ()=>{
    const userDetails = await JoblyApi.getUser(currentUser);
    return userDetails;
  }

  // applyJob function which register the currentUser to the job
  const applyJob = async (jobId)=>{
    await JoblyApi.apply(currentUser, jobId);
  }

  useEffect(()=>{
    getTokenFromLocalStorage();
    getUserFromLocalStorage();
  })

  useEffect(()=>{
    JoblyApi.token = token;
  },[token]);

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
            <Route path="/jobs" element={<JobList applyJob={applyJob} getData={getData}/>}/>
            <Route path="/profile" element={<Profile getData={getData} updateInfo={updateInfo}/>}/>
            <Route path="/logout" element={<LogOut logOut={logOut}/>}/>
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
      </currentUserContext.Provider>
      
    </div>
  );
}

export default App;
