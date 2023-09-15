import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Documentation from './pages/Documentation';
import SignIn from './pages/SignIn'; // Anda bisa mengganti nama berkas login sesuai dengan yang sesuai dengan proyek Anda
import './App.css';
import { AuthProvider } from './context/AuthContext'; // Impor AuthProvider dari berkas konteks autentikasi

function App() {
  return (
    <Router>
      <AuthProvider> {/* Letakkan AuthProvider di sekitar seluruh aplikasi */}
        <div>
          <Routes>
            <Route path="/" element={<SignIn />} /> {/* Misalnya, Anda memiliki komponen SignIn */}
            <Route path="/Home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/documentation" element={<Documentation />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
