import React, {useEffect, useState} from "react";
import {Container, Card, CardBody, CardTitle, CardText, Button} from "reactstrap";


const JobCard = ({id, title, equity, salary, applyJob, applied})=>{
    const [data, setData] = useState(applied);
    return (
        <Container className="JobCard">
            <Card >
                <CardBody>
                    <CardTitle>{title}</CardTitle>
                    <CardText>Salary: {salary}</CardText>
                    <CardText>Equity: {equity}</CardText>
                    {data?<Button disabled>Applied</Button>:<Button onClick={()=>{applyJob(id);}}>Apply</Button>} 
                </CardBody>
            </Card>
        </Container>
    )
}

export default JobCard;