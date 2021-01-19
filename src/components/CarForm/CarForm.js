import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import RequiredLabel from "./RequiredLabel";

export default function AddCarForm(props) {
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [vin, setVin] = useState("");
  const [dealer, setDealer] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const onManufacturerChange = (event) => {
    const manufacturer = event.target.value;
    setManufacturer(manufacturer);
  };
  const onModelChange = (event) => {
    const model = event.target.value;
    setModel(model);
  };
  const onVINChange = (event) => {
    const vin = event.target.value;
    setVin(vin);
  };
  const onDealerChange = (event) => {
    const dealer = event.target.value;
    setDealer(dealer);
  };
  const onCarImageChange = (event) => {
    const image = event.target.files[0];
    setImageFile(image);
  };

  const onSubmit = (event) => {
    const carPayload = {
      manufacturer,
      model,
      vin,
      dealer,
      imageFile,
    };
    props.onSubmit(carPayload);
    event.preventDefault();
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>
          <RequiredLabel text="Manufacturer" />
        </Form.Label>
        <Form.Control
          type="text"
          required
          onChange={onManufacturerChange}
          value={manufacturer}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          <RequiredLabel text="Model" />
        </Form.Label>
        <Form.Control
          type="text"
          required
          onChange={onModelChange}
          value={model}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          <RequiredLabel text="VIN" />
        </Form.Label>
        <Form.Control
          type="text"
          required
          title={"Vehicle Identification Number"}
          onChange={onVINChange}
          value={vin}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          <RequiredLabel text="Car Dealer Name" />
        </Form.Label>
        <Form.Control
          type="text"
          required
          onChange={onDealerChange}
          value={dealer}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="carImageInput">
          <RequiredLabel text="Choose Car Image" />
        </Form.Label>
        <Form.Control
          type="file"
          id="carImageInput"
          required
          accept="image/*"
          onChange={onCarImageChange}
        />
      </Form.Group>
      <div className="mt-3">
        <RequiredLabel text="" /> indicates a required field
      </div>
      <div className="text-right">
        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </div>
    </Form>
  );
}
