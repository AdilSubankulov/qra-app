import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom"; // Добавлен useNavigate
import "../styles/Navbar.css";
import logo from "../assets/logo.svg";

function Navbar({ onSearchChange = () => {} }) {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("username"); // Очистка перед выходом
        navigate("/logout"); // Перенаправление на /logout
    };

    return (
        <nav className="nav-container">
            <img src={logo} className="nav-logo" alt="Logo" />
            <h1 className="nav-h1">
                {username ? (
                    <>
                        Welcome: <span className="username roboto-regular">{username}</span> !
                    </>
                ) : (
                    "Welcome!"
                )}
            </h1>
            <button className="logout-btn roboto-regular" type="button" onClick={handleLogout}>
                Logout
            </button>
        </nav>
    );
}

export default Navbar;
