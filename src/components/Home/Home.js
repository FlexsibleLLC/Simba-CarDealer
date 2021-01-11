import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import CarDisplay from '../CardDisplay/CarDisplay';
import AddCarModalForm from '../Modal/AddCarModalForm';

import sampleCars from '../../util/cars';
import SimbaService from '../../services/SimbaService';

const { getCars, saveCar } = SimbaService;

export default function Home() {

    const [showModal, setShowModal] = useState(false);
    const [cars, setCars] = useState([]);

    useEffect(async () => {
        const cars = await getCars();
        setCars(cars);
    }, []);

    const onCardClick = (car) => {
        console.log("onCardClick");
    };

    const onModalClose = () => {
        setShowModal(false);
    };

    const onModalSave = carPayload => {
        console.log("carPayload: ", carPayload)
        saveCar(carPayload);
    };

    const onNewCarClick = () => {
        setShowModal(true);
    };

    return (
        <div>
            <Navbar onNewCarClick={onNewCarClick}/>
            <CarDisplay cars={cars} onCardClick={onCardClick} />
            <AddCarModalForm
                showModal={showModal}
                onClose={onModalClose}
                onSave={onModalSave}
            />
        </div>
    );
}