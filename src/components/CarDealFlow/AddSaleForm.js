import { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import RequiredLabel from '../CarForm/RequiredLabel';

export default function AddSaleForm(props) {

    const [buyer, setBuyer] = useState('');
    const [price, setPrice] = useState(null);

    const onBuyerChange = event => {
        const buyer = event.target.value;
        setBuyer(buyer);
    };

    const onPriceChange = event => {
        const price = event.target.value;
        setPrice(price);
    };

    const onSubmit = event => {
        const payload = {
            buyer,
            price,
        };
        props.onSubmit(payload);
        event.preventDefault();
    };

    return (
        <div>
            <hr />
            <p className="text-primary">Add an inspection report as an intent for sale</p>
            <Form onSubmit={onSubmit}>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>
                            <RequiredLabel text="Buyer" />
                        </Form.Label>
                        <Form.Control type="text" required onChange={onBuyerChange} value={buyer} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>
                            <RequiredLabel text="Price" />
                        </Form.Label>
                        <Form.Control type="text" required onChange={onPriceChange} value={price} />
                    </Form.Group>
                </Form.Row>
                <div className="mt-3">
                    <RequiredLabel text="" /> indicates a required field
                </div>
                <div className="text-right">
                    <Button variant="primary" type="submit" className="mt-3">Submit</Button>
                </div>
            </Form>
        </div>
    );

};