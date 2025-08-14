// @ts-ignore;
import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import DesignStudio from '@/pages/DesignStudio';
import Materials from '@/pages/Materials';
import Projects from '@/pages/Projects';
export default function App() {
  return <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/design" element={<DesignStudio />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
    </Router>;
}