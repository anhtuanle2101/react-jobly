import React from "react";
import { Link } from "react-router-dom";
import { Container, Card, CardBody,
    CardTitle, CardText } from "reactstrap";

const CompanyCard = ({ companyHandle, companyName, description, logo })=>{
    
    return (
        <Container className="CompanyCard">
            <Link to={`/companies/${companyHandle}`}>
                <Card >
                    <CardBody>
                        <CardTitle>{companyName}</CardTitle>
                        <CardText>
                        {description}
                        </CardText>
                        <img src={logo} alt={companyName}/>
                    </CardBody>
                </Card>
            </Link>
            
        </Container>
    )
}

export default CompanyCard;