import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./Pages/Home/Home";
import Menu from "./Pages/Menu/menu";
import About from "./Pages/About/About"; 
import Reservation from "./Pages/Reservations/Reservation"
import Contact from "./Pages/Contact/contact"

import AOS from "aos";
import 'aos/dist/aos.css'


function App() {
  useEffect(() =>{
  AOS.init({ duration: 1000 });
  }, []);
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/Menu" element={<Menu />} />
       <Route path="/About" element={<About />} />
         <Route path="/reservations" element={<Reservation />} />
         <Route path="/contact" element={<Contact />} />
    
      </Routes>
    </div>
  );
}

export default App;