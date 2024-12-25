import "../styles/ClientsList.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ClientsList() {
    const [clients, setClients] = useState([]); // Полный список клиентов
    const [filteredClients, setFilteredClients] = useState([]); // Отфильтрованный список
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // Строка поиска
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/api/clients/")
            .then((response) => {
                const data = response.data;
                console.log("API response:", data);
                if (typeof data === "object" && data !== null) {
                    const clientsData = Array.isArray(data) ? data : [data];
                    setClients(clientsData); // Сохраняем полный список
                    setFilteredClients(clientsData); // Инициализируем отфильтрованный список
                } else {
                    console.error("Invalid data format received:", data);
                    setError("Unexpected data format.");
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch clients:", err);
                setError("Failed to load clients.");
                setLoading(false);
            });
    }, []);

    // Обновляем список при изменении строки поиска
    useEffect(() => {
        const query = searchQuery.toLowerCase(); // Приводим запрос к нижнему регистру
        setFilteredClients(
            clients.filter(client =>
                client.full_name.toLowerCase().includes(query) // Фильтрация по имени
            )
        );
    }, [searchQuery, clients]); // Обновляем фильтр при изменении данных или строки поиска

    const handleClientClick = (clientId) => {
        navigate(`/clients/${clientId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="clientslist-container">
            <h2 className="clientlist-h2 roboto-regular">
                Client list - {clients.length}
            </h2>
            <div className="getUser">
                <i className="fas fa-search"></i>
                <input
                    className="nav-input"
                    type="text"
                    placeholder="Search client..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="scroll-clientlist-container">
                {filteredClients.slice().map((client) => (
                    <div key={client.id} className="client-info">
                        <button
                            className="client-detail-btn roboto-regular"
                            onClick={() => handleClientClick(client.id)}
                        >
                            {client.full_name}
                        </button>
                    </div>
                ))}
                {filteredClients.length === 0 && <p>No clients found.</p>}
            </div>
        </div>
    );
}

export default ClientsList;
