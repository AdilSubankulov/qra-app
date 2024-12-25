import Auth from "../components/Auth"

function Register(){
    return(
        <>
            <Auth route="/api/user/register/" method="register" />
        </>
    )
}

export default Register