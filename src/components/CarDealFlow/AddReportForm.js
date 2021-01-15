import { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import RequiredLabel from '../CarForm/RequiredLabel';

export default function AddReportForm(props) {

    const [inspector, setInspector] = useState('');
    const [condition, setCondition] = useState('');

    const onInspectorChange = event => {
        const inspector = event.target.value;
        setInspector(inspector);
    };

    const onConditionChange = event => {
        const condition = event.target.value;
        setCondition(condition);
    };

    const onSubmit = event => {
        const payload = {
            inspector,
            condition,
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
                            <RequiredLabel text="Inspector" />
                        </Form.Label>
                        <Form.Control type="text" required onChange={onInspectorChange} value={inspector} />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>
                            <RequiredLabel text="Condition" />
                        </Form.Label>
                        <Form.Control type="text" required onChange={onConditionChange} value={condition} />
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