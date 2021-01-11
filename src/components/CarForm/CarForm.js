import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';

const Required = ({ text }) => {
    return (
        <span title={`${text} is required`}>
            {text}<i className="text-danger">*</i>
        </span>
    );
};

export default function AddCarForm(props) {
    const { onManufacturerChange, onModelChange, onVINChange, onDealerChange, onCarImageChange } = props;
    const onSubmit = event => {
        console.log("on submit event", event);
        event.preventDefault();
    };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>
            <Required text="Manufacturer" onChange={onManufacturerChange} />
        </Form.Label>
        <Form.Control type="text" required />
      </Form.Group>
      <Form.Group>
        <Form.Label>
            <Required text="Model" />
        </Form.Label>
        <Form.Control type="text" required onChange={onModelChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>
            <Required text="VIN" />
        </Form.Label>
        <Form.Control type="text" required title={'Vehicle Identification Number'} onChange={onVINChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>
            <Required text="Car Dealer Name" />
        </Form.Label>
        <Form.Control type="text" required onChange={onDealerChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="carImageInput">
            <Required text="Choose Car Image" />
        </Form.Label>
        <Form.Control type="file" id="carImageInput" required accept="image/*" onChange={onCarImageChange} />
      </Form.Group>
      <div className="mt-3">
          <Required text="" /> indicates a required field
      </div>
    <Button variant="primary" type="submit" className="mt-3">
        Submit
    </Button>
    </Form>
  );
}
