
import React, { useState, useEffect } from "react";
import { Container,Button } from "reactstrap";
import JobCard from "./JobCard";
import JoblyApi from "./api";

const JobList = ()=>{
    const INIT_DATA = {"jobSearch":""};

    const [jobList, setJobList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(INIT_DATA);

    useEffect(()=>{
        async function fetchData(){
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
                JobList
                {/* Search Box */}
                <form>
                    <input type="search" placeholder="Enter search term" id="jobSearch" name="jobSearch" onChange={handleChange}/>
                    <Button onClick={handleSubmit}>Submit</Button>
                </form>
                {/* Jobs List */}
                {jobList.map(job=><JobCard key={job.id} title={job.title} salary={job.salary} equity={job.equity}/>)}
            </Container>
        )
    }
    
}

export default JobList;