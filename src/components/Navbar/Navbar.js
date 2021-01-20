import React from "react";
import { Navbar } from "react-bootstrap";
import './Navbar.css';
import WalletOverlayButton from './WalletOverlayButton';

export default function CarDealerNavbar(props) {
  const { onNewCarClick } = props;
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home" className="mr-auto">Car Dealer</Navbar.Brand>

        <div>
          <i className="addCarIcon fas fa-plus text-primary h2 mr-3" title="Add new car" onClick={onNewCarClick}></i>
          <WalletOverlayButton />
        </div>

      </Navbar>
    </>
  );
}
