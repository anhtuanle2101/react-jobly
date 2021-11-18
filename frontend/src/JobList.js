
import React, { useState, useEffect } from "react";
import { Container,Button } from "reactstrap";
import JobCard from "./JobCard";
import JoblyApi from "./api";
import { useNavigate } from "react-router-dom";


const JobList = ({ applyJob, getData })=>{
    const INIT_DATA = {"jobSearch":""};
    const navigate = useNavigate();

    const [jobList, setJobList] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState(INIT_DATA);


    useEffect(()=>{
        async function fetchData(){
          
          let userDetails;
          try {
            userDetails = await getData();
          } catch (err) {
            console.log(err); 
            navigate("/");
          }
          if (!userDetails) navigate("/jobs");
          else{
            setAppliedJobs(userDetails.applications);
          }
          const jobs = await JoblyApi.getAllJobs();
          setJobList(jobs);
        }
        fetchData();
        setIsLoading(false);
    }, [])

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(formData);
    }

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData(data=>({...data, [name]:value}));
    }

    if (isLoading){
        return <p>Loading... </p>
    }else{
        return (
            <Container className="JobList">
                <h1>Job List</h1>
                {/* Search Box */}
                <form>
                    <input type="search" placeholder="Enter search term" id="jobSearch" name="jobSearch" onChange={handleChange}/>
                    <Button onClick={handleSubmit}>Submit</Button>
                </form>
                {/* Jobs List */}
                {jobList.map(job=>(!appliedJobs.includes(job.id))?<JobCard key={job.id} id={job.id} title={job.title} salary={job.salary} equity={job.equity} applyJob={applyJob} applied={false}/>
                                                                :<JobCard key={job.id} id={job.id} title={job.title} salary={job.salary} equity={job.equity} applied={true} />)}
            </Container>
        )
    }
    
}

export default JobList;