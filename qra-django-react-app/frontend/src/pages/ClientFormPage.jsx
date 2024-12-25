import ClientForm from "../components/ClientForm";
import Navbar from "../components/Navbar"
import RightNavbar from "../components/RightNavbar"
import "../styles/ClientFormPage.css"

function ClientFormPage(){
    return(
        <>  
            <Navbar />
            <div className="client-form-page-container">
                <ClientForm />
                <RightNavbar />
            </div>
        </>
    )
}

export default ClientFormPage