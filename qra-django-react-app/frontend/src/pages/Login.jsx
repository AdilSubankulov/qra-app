import Auth from "../components/Auth"

function Login(){
    return(
        <>
            <Auth route="/api/token/" method="login" />
        </>
    )
}

export default Login