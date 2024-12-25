import Navbar from "../components/Navbar"
import RightNavbar from "../components/RightNavbar"
import ClientDetailsComponent from "../components/ClientDetailsComponent"

function ClientDetails(){
    return(
        <>
            <Navbar />
            <div className="tariff-details-page-container">
                <ClientDetailsComponent />
                <RightNavbar />
            </div>
        </>
    )
}

export default ClientDetails