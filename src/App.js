import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Note: No Switch component
import CurioConnect from './connect';
import SpeechToTextApp from './SpeechToText';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CurioConnect />} />
        <Route path="/speechToText" element={<SpeechToTextApp />} />
      </Routes>
    </Router>
  );
};

export default App;