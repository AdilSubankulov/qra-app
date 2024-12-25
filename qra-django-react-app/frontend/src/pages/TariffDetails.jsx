import Navbar from "../components/Navbar"
import TariffDetailsComponent from "../components/TariffDetailsComponent"
import RightNavbar from "../components/RightNavbar"
import "../styles/TariffDetails.css"

function TariffDetails(){
    return(
        <>
            <Navbar />
            <div className="tariff-details-page-container">
                <TariffDetailsComponent />
                <RightNavbar />
            </div>
        </>
    )
}

export default TariffDetails