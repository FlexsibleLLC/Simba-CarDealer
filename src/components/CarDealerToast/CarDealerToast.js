import {
  Toast
} from "react-bootstrap";
import './CarDealerToast.css';

export default function CarDealerToast(props) {
  const { title, message, onClose, show } = props;
  return (
    <Toast
      className="CarDealerToast"
      style={{
        position: 'absolute',
        top: 60,
        right: 20,
      }}
      show={show}
      onClose={onClose}
      delay={4000}
      autohide
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <strong className="mr-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}