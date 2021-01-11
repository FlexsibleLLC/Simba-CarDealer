import React from "react";
import { Navbar } from "react-bootstrap";
import './Navbar.css';

export default function CarDealerNavbar(props) {
  const { onNewCarClick } = props;
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home" className="mr-auto">Car Dealer</Navbar.Brand>
        
        <div>
            <i className="addCarIcon fas fa-plus text-primary h2 mr-3" title="Add new car" onClick={onNewCarClick}></i>
            <i className="walletIcon fas fa-wallet text-info h2" title="See wallet"></i>
        </div>
        
      </Navbar>
    </>
  );
}
