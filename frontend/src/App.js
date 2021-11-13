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
// importing styles
import './App.css';
// React
import React, {useEffect, useState} from "react";
// React Router
import {BrowserRouter, Route, Routes} from "react-router-dom";
// Contexts
import companyListContext from "./companyListContext";
// Api helper
import JoblyApi from "./api";


function App() {
  const [companyList, setCompanyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    async function fetchData(){
      const companies = await JoblyApi.getAll();
    }
    fetchData();
    setIsLoading(false);
  }, [])

  if (isLoading){
    return <h1>Loading</h1>
  }
  return (
    <div className="App">
      <companyListContext.Provider value={companyList}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<LoginForm />}/>
            <Route path="/signup" element={<SignUpForm />}/>
            <Route path="/companies">
              <Route path="" element={<CompanyList />}/>
              <Route path=":company" element={<CompanyDetails />}/>
            </Route>
            <Route path="/jobs" element={<JobList />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
      </companyListContext.Provider>
    </div>
  );
}

export default App;
