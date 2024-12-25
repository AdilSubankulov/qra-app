import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Auth.css";
import LoadingIndicator from "./LoadingIndicator";

function Auth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [method, setMethod] = useState("register");

    const navigate = useNavigate();
    const route = method === "login" ? "/api/token/" : "/api/user/register/";
    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            console.log(res.data);
            console.log(res.data.username);
            if (method === "login") {
                localStorage.setItem("username", res.data.username);
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/home");
                window.location.reload();
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }

    };

    return (
        <form onSubmit={handleSubmit} className="form-container roboto-regular">
            <h1 className="form-auth-h1">{name}</h1>
            <input
                className="form-input roboto-regular"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                className="form-input roboto-regular"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {loading && <LoadingIndicator />}
            <button className="form-button roboto-regular" type="submit">
                {name}
            </button>
            <button
                className="toggle-button roboto-regular"
                type="button"
                onClick={() => setMethod(method === "login" ? "register" : "login")}
            >
                {method === "login" ? "No account? Register" : "Already have an account? Login"}
            </button>
        </form>
    );
}

export default Auth;
