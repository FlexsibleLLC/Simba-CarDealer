import Modal from '../Modal';
import CarDealFlow from './CarDealFlow';
import './CarDealFlow.css';

export default function CarDealFlowModal(props) {
    const { show, carTransaction } = props;
    const { make, model, vin } = carTransaction.payload.inputs;

    const title = (
        <>
            <h1>{make} {model}</h1>
            <p>VIN: {vin}</p>
        </>
    );
    return (
        <div>
            <Modal
                title={title}
                show={show}
                showActionButtons={false}
                {...props}
            >
                <CarDealFlow
                    carTransaction={carTransaction}
                    displayToast={props.displayToast}
                    showLoader={props.showLoader}
                />
            </Modal>
        </div>

    )
}