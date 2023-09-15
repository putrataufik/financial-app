import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import fungsi onAuthStateChanged dan signOut dari Firebase Auth
import { auth } from '../Configs/FirebaseConfig'; // Sesuaikan dengan konfigurasi Firebase Anda

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Menambahkan state loading

  // Fungsi untuk login dipanggil di login.jsx
  
  const login = (userData) => {
    setUser(userData);
  };

  // Fungsi untuk logout
  const logout = async () => {
    try {
      await signOut(auth); // Logout dari Firebase
      setUser(null); // Hapus data pengguna dari konteks autentikasi
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Fungsi untuk memeriksa apakah pengguna sudah login
  const isAuthenticated = () => {
    return !!user;
  };

  // Efek samping untuk memeriksa status login ketika komponen dimuat
  useEffect(() => {
    // Gunakan onAuthStateChanged dari Firebase Auth untuk memeriksa status login
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        login(firebaseUser); // Setel status login berdasarkan status Firebase Auth
      } else {
        setUser(null); // Logout jika tidak ada pengguna yang terautentikasi
      }
      setLoading(false); // Setelah selesai memeriksa status login, set loading menjadi false
    });

    // Kembalikan fungsi berhenti berlangganan (unsubscribe) jika diperlukan
    return () => unsubscribe();
  }, []);

  // Nilai yang akan disediakan oleh konteks autentikasi
  const contextValue = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  // Tampilkan loading jika masih dalam proses memeriksa status login
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
