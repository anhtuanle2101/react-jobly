import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import JoblyApi from "./api.js";
import { useParams } from "react-router-dom";
import JobCard from "./JobCard";

const CompanyDetails = ()=>{
    const [companyDetails, setCompanyDetails] = useState({});
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { company } = useParams();
    useEffect(()=>{
        async function fetchData(){
            const details = await JoblyApi.getCompany(company);
            setJobs(details.jobs);
            delete details.jobs;
            setCompanyDetails(details);
        }
        fetchData();
        setIsLoading(false);
    }, [company])

    if (isLoading){
        return <p>Loading...</p>
    }else{
        return (
            <Container className="CompanyDetails">
                Company Details
                <h2>{companyDetails.name}</h2>
                <p>{companyDetails.description}</p>
                {jobs.map(job=><JobCard key={job.id} title={job.title} salary={job.salary} equity={job.equity}/>)}
            </Container>
        )
    }
    
}

export default CompanyDetails;