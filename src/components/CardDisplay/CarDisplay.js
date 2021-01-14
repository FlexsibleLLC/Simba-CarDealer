import React from "react";
import CarCard from "../CarCard/CarCard";
import {
  Container,
  CardColumns
} from "react-bootstrap";

export default function CarDisplay(props) {
  const { carsTransactions, onCardClick } = props;
  console.log("carsTransactions: ", carsTransactions)
  const getCarCard = carTransaction => {
    const carData = carTransaction.payload.inputs;
    return (
      <CarCard key={carData.__car} carTransaction={carTransaction} onClick={onCardClick} />
    );
  };
  return (
    <Container>
      <CardColumns>
        {
          carsTransactions.map(getCarCard)
        }
      </CardColumns>
    </Container>
  );
}
