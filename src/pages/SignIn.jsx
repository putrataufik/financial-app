import { auth, provider } from "../Configs/FirebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import Home from "./Home";

function SignIn() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const handleSignIn = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("displayName", data.user.displayName);
      navigate('/Home');
    });
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setValue(email);
    }
    
  }, []);

  return (
    <div>
      {value ? (
        <Home />
      ) : (
        <button onClick={handleSignIn}>
          Sign In
        </button>
      )}
    </div>
  );
}

export default SignIn;
