import "../styles/TariffsListComponent.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TariffsListComponent() {
    const [tariffs, setTariffs] = useState([]); // Полный список тарифов
    const [filteredTariffs, setFilteredTariffs] = useState([]); // Отфильтрованный список
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // Строка поиска
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("/api/tariffs/")
            .then((response) => {
                const data = response.data;
                console.log("API response:", data); // Для отладки
                if (Array.isArray(data)) {
                    setTariffs(data); // Сохраняем полный список
                    setFilteredTariffs(data); // Инициализируем отфильтрованный список
                } else {
                    console.error("Invalid data format received:", data);
                    setError("Unexpected data format.");
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch tariffs:", err);
                setError("Failed to load tariffs.");
                setLoading(false);
            });
    }, []);

    // Обновляем список при изменении строки поиска
    useEffect(() => {
        const query = searchQuery.toLowerCase(); // Приводим запрос к нижнему регистру
        setFilteredTariffs(
            tariffs.filter(tariff =>
                tariff.name.toLowerCase().includes(query) // Фильтрация по имени
            )
        );
    }, [searchQuery, tariffs]);

    const handleTariffClick = (tariffId) => {
        navigate(`/tariffs/${tariffId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="tariffslist-container">
            <h2 className="tariffslist-h2 roboto-regular">Tariff List - {tariffs.length}</h2>
            <div className="getUser">
                <i className="fas fa-search"></i>
                <input
                    className="nav-input"
                    type="text"
                    placeholder="Search tariff..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="scroll-tarifflist-container">
                {filteredTariffs.length > 0 ? (
                    filteredTariffs.slice().map((tariff) => (
                        <div key={tariff.id} className="tariff-info">
                            <button
                                className="tariff-detail-btn roboto-regular"
                                onClick={() => handleTariffClick(tariff.id)}
                            >
                                {tariff.name} - {tariff.price} som
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No tariffs found.</p>// Сообщение, если ничего не найдено
                )}
            </div>
        </div>
    );
}

export default TariffsListComponent;
