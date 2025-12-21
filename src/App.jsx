import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tronix365Home from './pages/Tronix365Home';
import Home from './pages/Home';
import Success from './pages/Success';
import Failure from './pages/Failure';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Tronix365Home />} />
                <Route path="/internship" element={<Home />} />
                <Route path="/success" element={<Success />} />
                <Route path="/failure" element={<Failure />} />
            </Routes>
        </Router>
    );
}

export default App;
