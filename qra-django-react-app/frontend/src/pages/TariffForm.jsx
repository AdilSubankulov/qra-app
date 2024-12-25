import Navbar from "../components/Navbar"
import RightNavbar from "../components/RightNavbar"
import TariffFormComponent from "../components/TariffFormComponent";
import "../styles/TariffForm.css"

function TariffForm(){
    return(
        <>  
            <Navbar />
            <div className="tariff-form-page-container">
                <TariffFormComponent />
                <RightNavbar />
            </div>
        </>
    )
}

export default TariffForm