import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignDocument } from './pages/SignDocument';
import { VerifySignature } from './pages/VerifySignature';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-blue-600">
                DigiSign
              </span>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<SignDocument />} />
          <Route path="/verify" element={<VerifySignature />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}