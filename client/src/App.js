import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import ExploreModels from './components/models/ExploreModels';
import Favorites from './components/favorites/Favorites';
import AboutUs from './components/about/AboutUs';
import ContactUs from './components/contact/ContactUs';
import UploadModel from './components/uploadModel/UploadModel';
import ModelDetails from './components/models/ModelDetails';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/models" element={<ExploreModels/>} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/upload" element={<UploadModel />} />
          <Route exact path="/model/:modelId" element={<ModelDetails/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
