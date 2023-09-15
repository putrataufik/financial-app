import React from 'react';
import { useAuth } from '../context/AuthContext'; // Import file authContext
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuth(); // ambil funtion logout dari file AuthContext

  const handleLogout = () => {
    // jadi di function ini, dia akan menjalankan function logout dulu. setelah 
    // perintah di logout selesai baru dia jalankan perintah navigate ke path "/"
    logout().then(() => {
      navigate('/'); 
    }).catch((error) => {
      console.error('Error during logout:', error);
    });
  };

  return (
    <div>

      <button className='Button' onClick={handleLogout}>Logout</button>

    </div>
  );
}

export default LogoutButton;
