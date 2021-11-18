
import React, { useState, useEffect, useContext } from "react";
import { Container,Button } from "reactstrap";
import JobCard from "./JobCard";
import JoblyApi from "./api";
import { useNavigate } from "react-router-dom";
import currentUserContext from "./currentUserContext";


const JobList = ({ applyJob, getData, filterJob })=>{
    const INIT_DATA = {"jobSearchTerm":""};
    const navigate = useNavigate();

    const [jobList, setJobList] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState(INIT_DATA);

    const { currentUser } = useContext(currentUserContext);

    useEffect(()=>{
        async function fetchData(){
          
            let userDetails;
            try {
                userDetails = await getData();
            } catch (err) {
                console.log(err); 
                navigate("/");
            }
            if (!userDetails) 
                navigate("/jobs");
            else{
                setAppliedJobs(userDetails.applications);
            }
            const jobs = await JoblyApi.getAllJobs();
            setJobList(jobs);
        }
        fetchData();
        setIsLoading(false);
    }, [])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const { jobSearchTerm } = formData;
        const jobs = await filterJob(jobSearchTerm);
        setJobList(jobs);
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
                    <input type="search" placeholder="Enter search term" id="jobSearchTerm" name="jobSearchTerm" onChange={handleChange}/>
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