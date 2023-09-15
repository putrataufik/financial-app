import NavBar from "../components/NavigationBar";
import LogoutButton from "../components/LogOutButton";
import '../CSS/HomePage.css'
import { useAuth } from '../Context/AuthContext'

function Home() {
  const { user } = useAuth();
  
  // Mencetak seluruh objek pengguna (user) ke konsol
  console.log('user', user);
  
  const displayName = user?.displayName;

  return (
    <div>
      <NavBar />
      <div className="Home">
        <h1 className="">Hallo, {displayName}</h1>
        <LogoutButton/>
      </div>
    </div>
  )
}

export default Home;
