import {React, useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
import NoteState from "./contexts/NoteState" // Context API
import Footer from "./components/Footer";

function App() {
  const [alert, setAlert] = useState(null);

  // Alert and notification component 
  const showAlert = (msg, type) => {
      setAlert({
          message: msg,
          type: type
      })
      setTimeout(() => {
        setAlert(null);
      }, 1500);
  }

  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
          <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
        </Routes>
        <Footer />
      </Router>
    </NoteState>
  );
}

export default App;
