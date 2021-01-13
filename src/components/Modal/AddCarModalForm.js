import React, { useState } from 'react';
import Modal from '../Modal';
import CarForm from '../CarForm';

export default function AddCarModalForm(props) {
    const { showModal, onClose } = props;

    const onSubmit = carPayload => {
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
            />
        </Modal>
    )
}