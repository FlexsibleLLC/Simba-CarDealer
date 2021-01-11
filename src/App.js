import './App.css';

import Home from './components/Home';
import dotenv from 'dotenv';
dotenv.config();

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
