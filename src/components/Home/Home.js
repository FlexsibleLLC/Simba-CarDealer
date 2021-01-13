import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import CarDisplay from '../CardDisplay/CarDisplay';
import AddCarModalForm from '../Modal/AddCarModalForm';

import SimbaService from '../../services/SimbaService';
import Loader from '../Loader';

const { getCars, saveCar } = SimbaService;

export default function Home() {

    const [showModal, setShowModal] = useState(false);
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        const cars = await getCars();
        setIsLoading(false);
        setCars(cars);
    }, []);

    const onCardClick = (car) => {
        console.log("onCardClick", car);
    };

    const onModalClose = () => {
        setShowModal(false);
    };

    const onModalSave = async carPayload => {
        const car = await saveCar(carPayload);
        setCars([...cars, car]);
    };

    const onNewCarClick = () => {
        setShowModal(true);
    };

    const getBody = () => {
        if(isLoading) {
            return (
                <Loader />
            );
        }
        return <CarDisplay cars={cars} onCardClick={onCardClick} />;
    };

    return (
        <div>
            <Navbar onNewCarClick={onNewCarClick}/>
            {
                getBody()
            }
            <AddCarModalForm
                showModal={showModal}
                onClose={onModalClose}
                onSave={onModalSave}
            />
        </div>
    );
}