import React, { useState } from 'react';
import Modal from '../Modal';
import CarForm from '../CarForm';

export default function AddCarModalForm(props) {
    const { showModal, onClose } = props;

    const [manufacturer, setManufacturer] = useState('');
    const [model, setModel] = useState('');
    const [vin, setVin] = useState('');
    const [dealer, setDealer] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const onManufacturerChange = event => {
        const manufacturer = event.target.value;
        setManufacturer(manufacturer);
    };
    const onModelChange = event => {
        const model = event.target.value;
        setModel(model);
    };
    const onVINChange = event => {
        const vin = event.target.value;
        setVin(vin);
    };
    const onDealerChange = event => {
        const dealer = event.target.value;
        setDealer(dealer);
    };
    const onCarImageChange = event => {
        const image = event.target.files[0];
        setImageFile(image);
    };

    const onSubmit = () => {
        const carPayload = {
            manufacturer,
            model,
            vin,
            dealer,
            imageFile
        };
        props.onSave(carPayload);
    };

    return (
        <Modal
            show={showModal}
            title={'Register Car'}
            onClose={onClose}
            //onSave={onModalSave}
            showActionButtons={false}
        >
            <CarForm
                onSubmit={onSubmit}
                onManufacturerChange={onManufacturerChange}
                onModelChange={onModelChange}
                onVINChange={onVINChange}
                onDealerChange={onDealerChange}
                onCarImageChange={onCarImageChange}
            />
        </Modal>
    )
}