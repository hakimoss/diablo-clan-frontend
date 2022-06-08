import Navigation from "./components/navigation";
import Home from "./pages/Home";
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Reservation from "./pages/Reservation";
import Guide from "./pages/Guide";
import NotFounds from "./pages/NotFounds";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/Login";



function App() {
  return (
    <Router>
      <Navigation />

      <Routes>
        <Route exact path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route exact path="/reservation" element={<PrivateRoute><Reservation /></PrivateRoute>} />
        <Route exact path="/guide" element={<PrivateRoute><Guide /></PrivateRoute>} />
        <Route exact path="/login" element={<Login />} />
        <Route path="*" element={<NotFounds />} />
      </Routes>
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
