import { useNavigate } from "react-router-dom";
import "../styles/RightNavbar.css";

function RightNavbar() {
    const navigate = useNavigate(); // Инициализируем навигатор

    return (
        <>
            <div className="right-navbar-container">
                <h2 className="menu-h2 roboto-regular">Menu</h2>
                <div className="right-navbar-btns">
                    <button
                        className="new-client-btn"
                        onClick={() => navigate('/client-form')} // Перенаправляем на страницу ClientForm
                    >
                        New client
                    </button>
                    <button
                        className="new-tariff-btn"
                        onClick={() => navigate('/tariff-form')} // Добавьте этот маршрут, если нужно
                    >
                        New tariff
                    </button>
                    <button
                        className="tariff-list-btn"
                        onClick={() => navigate('/tariffs-list')} // Добавьте этот маршрут, если нужно
                    >
                        Tariff list
                    </button>
                    
                    <button
                        className="tariff-list-btn"
                        onClick={() => navigate('/home')} // Добавьте этот маршрут, если нужно
                    >
                        Client list
                    </button>
                </div>
            </div>
        </>
    );
}

export default RightNavbar;
