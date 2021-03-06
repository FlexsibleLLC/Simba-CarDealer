import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import CarDisplay from '../CardDisplay/CarDisplay';
import AddCarModalForm from '../Modal/AddCarModalForm';

import SimbaService from '../../services/SimbaService';
import Loader from '../Loader';
import CarDealFlowModal from '../CarDealFlow/CarDealFlowModal';

const { getCarsTransactions, saveCar } = SimbaService;

export default function Home(props) {

    const [showModal, setShowModal] = useState(false);
    const [showCarFlowModal, setShowCarFlowModal] = useState(false);
    const [carFlowModalCar, setCarFlowModalCar] = useState(null);
    const [carsTransactions, setCarsTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCarsTransactions = async () => {
            const carsTransactions = await getCarsTransactions();
            setIsLoading(false);
            setCarsTransactions(carsTransactions);
        };
        loadCarsTransactions();
    }, []);

    const onCardClick = (carTransaction) => {
        setCarFlowModalCar(carTransaction);
        setShowCarFlowModal(true);
    };

    const onModalClose = () => {
        setShowModal(false);
    };

    const onModalSave = async carPayload => {
        setIsLoading(true);
        const carTransaction = await saveCar(carPayload);
        setShowModal(false);
        setCarsTransactions([carTransaction, ...carsTransactions]);
        setIsLoading(false);
        props.displayToast('Saved car info successfully.');
    };

    const onNewCarClick = () => {
        setShowModal(true);
    };

    const onCarDealFlowModalClose = () => {
        setShowCarFlowModal(false);
        setIsLoading(false);
    };

    return (
        <div>
            <Navbar onNewCarClick={onNewCarClick} />
            {
                isLoading && <Loader />
            }
            <CarDisplay carsTransactions={carsTransactions} onCardClick={onCardClick} />
            <AddCarModalForm
                showModal={showModal}
                onClose={onModalClose}
                onSave={onModalSave}
            />
            {
                carFlowModalCar && (
                    <CarDealFlowModal
                        carTransaction={carFlowModalCar}
                        show={showCarFlowModal}
                        onClose={onCarDealFlowModalClose}
                        displayToast={props.displayToast}
                        showLoader={show => setIsLoading(show)}
                    />
                )
            }

        </div>
    );
}