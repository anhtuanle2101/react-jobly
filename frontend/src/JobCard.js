import React from "react";
import {Container, Card, CardBody, CardTitle, CardText} from "reactstrap";

const JobCard = ({title, equity, salary})=>{
    return (
        <Container className="JobCard">
            <Card >
                <CardBody>
                    <CardTitle>{title}</CardTitle>
                    <CardText>Salary: {salary}</CardText>
                    <CardText>Equity: {equity}</CardText>
                </CardBody>
            </Card>
        </Container>
    )
}

export default JobCard;