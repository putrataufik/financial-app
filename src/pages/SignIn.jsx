import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../Configs/FirebaseConfig'; // Sesuaikan dengan path berkas FirebaseConfig Anda
import { GoogleButton } from 'react-google-button';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../Configs/FirebaseConfig'; // Sesuaikan dengan konfigurasi Firebase Anda
import '../CSS/LoginPage.css';
import Home from './Home';

import SignUp from './SignUp'

function SignIn() {
  // Google SignIn
  const { user, login } = useAuth();
  // Email and Password SignIn
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  //navigasi ke page lain
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
      const userEmail = userCredential.user.email;
      console.log('email', userEmail); // Perbarui ini agar Anda mencetak alamat email yang benar
  
      const userDocRef = doc(db, 'Users', userEmail);
      const userDocSnap = await getDoc(userDocRef);
  
      console.log('cek ada gak : ', userDocSnap.exists); // Perbarui ini agar Anda memeriksa apakah dokumen ada
  
      if (userDocSnap.exists) {
        const userData = userDocSnap.data();
        console.log('data Users :', userData);
  
        login(userData);
  
        navigate('/Home');
      } else {
        console.error('Data User Not Found In Firestore');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
  
  
  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider).then((data) => {
      login(data.user);
      console.log('Data User Google', data.user);
      navigate('/Home');
    });
  };

  useEffect(() => {
    if (user) {
      navigate('/Home');
    }
  }, [user, navigate]);

  return (
    <div className='Login'>
      <h1>Welcome MyFinancial</h1>

      <form className='FormLogin' onSubmit={handleFormSubmit}>
        <h1 className='LoginText'>LOGIN</h1>
        <label>Email</label>
        <input 
          type="email" 
          placeholder="Masukkan email Anda"  
          required
          value={email}
          onChange={handleEmailChange}
        />
        <label>Password</label>          
        <input 
          type="password" 
          placeholder="Masukkan kata sandi Anda"  
          required
          value={password}
          onChange={handlePasswordChange}
        />

        <button type='submit'>Login</button>
      </form>
      <div className='SignUp'>
        <p>Belum Punya Akun ?</p>
      </div>
      <div className='GoogleButton'>
        {user ? (<Home />) : (<GoogleButton onClick={handleSignInWithGoogle}/>)} 
      </div>
    </div>
  );
}

export default SignIn