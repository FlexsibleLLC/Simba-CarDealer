import { useState } from 'react';
import './App.css';
import Home from './components/Home';

import dotenv from 'dotenv';
import CarDealerToast from './components/CarDealerToast';

dotenv.config();

function App() {

  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const displayToast = (message, title) => {
    const finalTitle = title ? title : 'Car Dealer';
    setToastTitle(finalTitle);
    setToastMessage(message);
    setShowToast(true);
  };

  const handleOnToastClose = () => {
    setToastTitle('');
    setToastMessage('');
    setShowToast(false)
  };

  return (
    <div className="App">
      <CarDealerToast
        show={showToast}
        onClose={handleOnToastClose}
        title={toastTitle}
        message={toastMessage}
      />
      <Home displayToast={displayToast} />
    </div>
  );
}

export default App;

