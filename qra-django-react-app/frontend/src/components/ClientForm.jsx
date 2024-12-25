import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Импорт useNavigate
import "../styles/ClientForm.css";

function ClientForm() {
    const [tariffs, setTariffs] = useState([]); // Данные тарифов
    const [clientName, setClientName] = useState(""); // Имя клиента
    const [selectedTariff, setSelectedTariff] = useState(""); // Выбранный тариф
    const [visitCount, setVisitCount] = useState(0); // Начальное количество посещений
    const [status, setStatus] = useState(null); // Статус ответа

    const navigate = useNavigate(); // Для навигации

    // Загрузка тарифов
    useEffect(() => {
        fetch("/api/tariffs/")
            .then((response) => response.json())
            .then((data) => setTariffs(data));
    }, []);

    // Обработка отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Шаг 1: Создание клиента
            const clientResponse = await fetch("/api/clients/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    full_name: clientName,
                }),
            });

            if (!clientResponse.ok) {
                const errorData = await clientResponse.json();
                throw new Error(errorData.detail || "Failed to create client");
            }

            const createdClient = await clientResponse.json();

            // Шаг 2: Создание членства для созданного клиента
            const membershipResponse = await fetch("/api/memberships/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    client: createdClient.id,
                    tariff: selectedTariff,
                    visit_count: visitCount || 0,
                }),
            });

            if (!membershipResponse.ok) {
                const errorData = await membershipResponse.json();
                throw new Error(errorData.detail || "Failed to create membership");
            }

            setStatus("Client and Membership created successfully!");
            setClientName("");
            setSelectedTariff("");
            setVisitCount(0);
            navigate("/home")
        } catch (error) {
            setStatus(`Error: ${error.message}`);
        }
    };

    // Обработка кнопки Cancel
    const handleCancel = () => {
        navigate("/home"); // Перенаправление на /home
    };

    return (
        <div className="client-form-container">
            <h2 className="new-client-h2 roboto-regular">New client</h2>
            <form onSubmit={handleSubmit} className="client-membership-form roboto-regular">
                <div className="form-group">
                    <label htmlFor="client-name">Client: </label>
                    <input
                        id="client-name"
                        type="text"
                        className="full_name-input roboto-regular"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Full name"
                        required
                    />
                    <label htmlFor="tariff">Tariff: </label>
                    <select
                        id="tariff"
                        className="tariff-select roboto-regular"
                        value={selectedTariff}
                        onChange={(e) => setSelectedTariff(e.target.value)}
                        required
                    >
                        <option value="">Select a tariff</option>
                        {tariffs.map((tariff) => (
                            <option key={tariff.id} value={tariff.id}>
                                {tariff.name} - {tariff.price} som
                            </option>
                        ))}
                    </select>
                    <label htmlFor="visit-count">Visit Count: </label>
                    <input
                        className="visit-count-input roboto-regular"
                        type="number"
                        id="visit-count"
                        value={visitCount}
                        onChange={(e) => setVisitCount(e.target.value)}
                        min="0"
                        placeholder="Enter initial visit count"
                    />
                </div>

                <div className="form-buttons">
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="create-btn">
                        Create
                    </button>
                </div>
            </form>

            {/* Отображение статуса */}
            {status && <div className="status-message">{status}</div>}
        </div>
    );
}

export default ClientForm;
