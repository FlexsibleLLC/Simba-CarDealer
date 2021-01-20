import React from 'react';
import { Card } from "react-bootstrap";
import './CarCard.css';

export default function CarCard(props) {
  const { carTransaction, onClick } = props;
  const { __car, manufacturer, model, vin, dealer, imageUrl, time } = carTransaction.payload.inputs;
  return (
    <Card className="CarCard" key={__car} onClick={() => onClick(carTransaction)}>
      <Card.Img variant="top" src={`${imageUrl}`} />
      <Card.Body>
        <Card.Title>{manufacturer} {model}</Card.Title>
        <Card.Text>VIN: {vin}</Card.Text>
        <Card.Text>Dealer: {dealer}</Card.Text>
      </Card.Body>
      <Card.Footer>
        {<small className="text-muted">{new Date(parseInt(time)).toDateString()}</small>}
      </Card.Footer>
    </Card>
  );
}