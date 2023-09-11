import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Menggunakan Routes bukan Switch
import Home from './pages/Home';
import Profile from './pages/Profile';
import Documentation from './pages/Documentation';
import Login from './pages/SignIn'
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/Home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/documentation" element={<Documentation />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
