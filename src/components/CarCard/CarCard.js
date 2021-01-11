import React from 'react';
import { Card } from "react-bootstrap";
import './CarCard.css';

export default function CarCard(props) {
    const { car, onClick } = props;
    const { __car, manufacturer, model, vin, dealer, imageUrl, time } = car;
    console.log("imageUrl: ", imageUrl)
    //https://source.unsplash.com/1XSIFHhH1Cg/100px160
    return (
        <Card className="CarCard" key={__car} onClick={() => onClick(car)}>
          <Card.Img variant="top" src={`${imageUrl}`} />
          <Card.Body>
            <Card.Title>{manufacturer} {model}</Card.Title>
            <Card.Text>VIN: {vin}</Card.Text>
            <Card.Text>Dealer: {dealer}</Card.Text>
          </Card.Body>
          <Card.Footer>
            {<small className="text-muted">{new Date(parseInt(time)).toDateString()}</small> }
          </Card.Footer>
        </Card>
    );
}