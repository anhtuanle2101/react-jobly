import React, { useState, useEffect } from "react";
import { Container, Button } from "reactstrap";
import CompanyCard from "./CompanyCard";
// Api helper
import JoblyApi from "./api";

const CompanyList = ()=>{
    const INIT_DATA = {"companySearch":""};

    const [companyList, setCompanyList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(INIT_DATA);
    

    useEffect(()=>{
        async function fetchData(){
          const companies = await JoblyApi.getAllCompanies();
          setCompanyList(companies);
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
        return (<p>Loading...</p>)
    }
    return (
        <Container className="CompanyList">
            Company List
            {/* Search Box */}
            <form>
                <input type="search" placeholder="Enter search term" id="companySearch" name="companySearch" onChange={handleChange}/>
                <Button onClick={handleSubmit}>Submit</Button>
            </form>
            {/* Company List */}
            {companyList.map(company=><CompanyCard key={company.id} companyHandle={company.handle} companyName={company.name} description={company.description} logo={company.logoUrl}/>)}
        </Container>
    )
}

export default CompanyList;