import Navbar from "../components/Navbar"
import RightNavbar from "../components/RightNavbar"
import TariffsListComponent from "../components/TariffsListComponent"
import "../styles/TariffsList.css"

function TariffsList(){
    return(
        <>
            <Navbar />
            <div className="tariffs-list-container">
                <TariffsListComponent />
                <RightNavbar />
            </div>
        </>
    )
}

export default TariffsList