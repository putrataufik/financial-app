import NavBar from "../components/NavigationBar";
function Home(){

    const displayName = localStorage.getItem("displayName");
    return(
        <div>
            <NavBar/>
            <h1>Welcome {displayName}</h1>
        </div>
    )
}
export default Home;