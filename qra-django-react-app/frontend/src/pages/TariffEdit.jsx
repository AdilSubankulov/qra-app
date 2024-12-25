import Navbar from "../components/Navbar";
import RightNavbar from "../components/RightNavbar";
import TariffEditComponent from "../components/TariffEditComponent";
import "../styles/TariffEdit.css"

function TariffEdit(){
    return(
        <>
        <Navbar />
        <div className="tariff-edit-page-container">
            <TariffEditComponent />
            <RightNavbar />
        </div>
        </>
    )
}

export default TariffEdit