import React, { useState, useEffect } from "react";
import { Container, Button } from "reactstrap";
import CompanyCard from "./CompanyCard";
// Api helper
import JoblyApi from "./api";

const CompanyList = ({ filterCompany })=>{
    const INIT_DATA = {"companySearchTerm":""};

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

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const { companySearchTerm } = formData;
        const companies = await filterCompany(companySearchTerm);
        setCompanyList(companies);
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
            <h1>Company List</h1>
            {/* Search Box */}
            <form>
                <input type="search" placeholder="Enter search term" id="companySearchTerm" name="companySearchTerm" onChange={handleChange}/>
                <Button onClick={handleSubmit}>Submit</Button>
            </form>
            {/* Company List */}
            {companyList.map(company=><CompanyCard key={company.id} companyHandle={company.handle} companyName={company.name} description={company.description} logo={company.logoUrl}/>)}
        </Container>
    )
}

export default CompanyList;