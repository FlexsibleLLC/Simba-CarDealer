import React from 'react';
import Modal from '../Modal';
import CarForm from '../CarForm';
export default function AddCarModalForm(props) {
    const { showModal, onClose, onSave } = props;

    const onSubmit = carPayload => {
        onSave(carPayload);
    };

    return (
        <Modal
            show={showModal}
            title={'Register Car'}
            onClose={onClose}
            showActionButtons={false}
        >
            <CarForm
                onSubmit={onSubmit}
            />
        </Modal>
    )
}