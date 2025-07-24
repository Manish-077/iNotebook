// App.js
import './App.css';
import About from './Components/About';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Alert from './Components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import { useState } from 'react';
import UserProfile from './Components/UserProfile';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => setAlert(null), 1500);
  };

  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <div className="container my-3">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<ProtectedRoute><Home showAlert={showAlert} /></ProtectedRoute>} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
            <Route path="/profile" element={<ProtectedRoute><UserProfile showAlert={showAlert} /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;