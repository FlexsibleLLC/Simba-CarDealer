import React from "react";
import { Modal, Button } from 'react-bootstrap';

export default function CarDealerModal(props) {
    const { title, children, onClose, onSave, show, showActionButtons = true } = props;
    return (
    <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>{ title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            { children }
        </Modal.Body>
        {
            !showActionButtons ? null : (
                <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
                <Button variant="primary" onClick={onSave}>Save</Button>
                </Modal.Footer>
            )
        }
        
    </Modal>
    );
}
