import Navbar from "../components/Navbar";
import RightNavbar from "../components/RightNavbar";
import ClientsList from "../components/ClientsList";
import "../styles/Home.css"

function Home() {
    
    return (
        <>
            <Navbar />
            <div className="home-container">
                <ClientsList/>
                <RightNavbar/>
            </div>
        </>
    );
}

export default Home;
