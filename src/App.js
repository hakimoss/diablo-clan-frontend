import Navigation from "./components/navigation";
import Home from "./pages/Home";
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Reservation from "./pages/Reservation";
import Guide from "./pages/Guide";
import NotFounds from "./pages/NotFounds";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/Login";
import { useState } from "react";
import Footer from "./components/footer";



function App() {

  const [email, setEmail] = useState('')
  const [profil, setProfil] = useState([]);
  const [signalForNav, setSignalForNav] = useState(0);

  const getEmailFromLogin = (email) => {
    console.log(email)
    setEmail(email)
  }

  const getProfilFromLogin = (profilFromLogin) => {
    setProfil(profilFromLogin)
  }

  const signalFromReservation = (signal) => {
    setSignalForNav(signal)
  }
 
  return (
    <Router>
      <Navigation signalFromReservation={signalForNav} getProfilFromLogin={profil} />

      <Routes>
        <Route exact path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route exact path="/reservation" element={<PrivateRoute><Reservation signalFromReservation={signalFromReservation} getProfilFromLogin={profil} getEmailFromLogin={email} /></PrivateRoute>} />
        <Route exact path="/guide" element={<PrivateRoute><Guide /></PrivateRoute>} />
        <Route exact path="/login" element={<Login getProfilFromLogin={getProfilFromLogin} getEmailFromLogin={getEmailFromLogin} />} />
        <Route path="*" element={<NotFounds />} />
      </Routes>

      <Footer />

      {/* <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path="/reservation" element={<Reservation />} />
        <Route exact path="/guide" element={<Guide />} />
        <Route path="*" element={<NotFounds />} />
      </Routes> */}



    </Router>
     
  );
}

export default App;
