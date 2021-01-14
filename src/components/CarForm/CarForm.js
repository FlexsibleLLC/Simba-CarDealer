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

  const onSubmit = event => {
    const carPayload = {
        manufacturer,
        model,
        vin,
        dealer,
        imageFile
    };
    props.onSubmit(carPayload);
    event.preventDefault();
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>
            <Required text="Manufacturer" />
        </Form.Label>
        <Form.Control type="text" required onChange={onManufacturerChange} />
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
