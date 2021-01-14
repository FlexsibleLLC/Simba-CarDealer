import React, { useState } from 'react';
import Modal from '../Modal';
import CarDealFlow from './CarDealFlow';
import './CarDealFlow.css';

export default function CarDealFlowModal(props) {
    const { show, carTransaction } = props;
    const carData = carTransaction.payload.inputs;

    const title = (
        <>
            <h1>{carData.make} {carData.model}</h1>
            <p>VIM: 123</p>
        </>
    );
    return (
        <div>
            <Modal
                title={title}
                show={show}
                showActionButtons={false}
                {...props}
            >
                <CarDealFlow
                    carTransaction={carTransaction}
                />
            </Modal>
        </div>
        
    )
}