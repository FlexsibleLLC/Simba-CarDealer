import React from "react";
import CarCard from "../CarCard/CarCard";
import {
  Container,
  CardColumns
} from "react-bootstrap";

export default function CarDisplay(props) {
  const { cars, onCardClick } = props;
  return (
    <Container>
      <CardColumns>
        {
          cars.map(car => <CarCard key={car.__car} car={car} onClick={onCardClick} />)
        }
      </CardColumns>
    </Container>
  );
}
