import "../styles/TariffEditComponent.css"
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TariffEditComponent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState(""); // Название тарифа
    const [price, setPrice] = useState(""); // Цена тарифа
    const [maxVisits, setMaxVisits] = useState(""); // Максимальное количество посещений
    const [isActive, setIsActive] = useState(true); // Статус тарифа (активен/неактивен)
    const [status, setStatus] = useState(null); // Статус ответа
    const [loading, setLoading] = useState(true); // Состояние загрузки

    // Получение данных тарифа для редактирования
    useEffect(() => {
        fetch(`/api/tariffs/${id}/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch tariff details.");
                }
                return response.json();
            })
            .then((data) => {
                setName(data.name);
                setPrice(data.price);
                setMaxVisits(data.max_visits);
                setIsActive(data.is_active);
                setLoading(false);
            })
            .catch((error) => {
                setStatus(`Error: ${error.message}`);
                setLoading(false);
            });
    }, [id]);

    // Обработка отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/tariffs/${id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    price,
                    max_visits: maxVisits,
                    is_active: isActive,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to update tariff");
            }

            setStatus("Tariff updated successfully!");
            setTimeout(() => navigate(`/tariffs/${id}`), 1000); // Перенаправление через 1 секунды
        } catch (error) {
            setStatus(`Error: ${error.message}`);
        }
    };

    // Обработка кнопки Cancel
    const handleCancel = () => {
        navigate("/tariffs-list");
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="tariff-form-container">
            <h2 className="new-tariff-h2 roboto-regular">Edit Tariff</h2>
            <form onSubmit={handleSubmit} className="tariff-form roboto-regular">
                <div className="form-group">
                    <label htmlFor="tariff-name">Name: </label>
                    <input
                        id="tariff-name"
                        type="text"
                        className="tariff-name-input roboto-regular"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tariff name"
                        required
                    />

                    <label htmlFor="tariff-price">Price: </label>
                    <input
                        id="tariff-price"
                        type="number"
                        className="tariff-price-input roboto-regular"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price in som"
                        min="0"
                        step="0.01"
                        required
                    />

                    <label htmlFor="max-visits">Max Visits: </label>
                    <input
                        id="max-visits"
                        type="number"
                        className="max-visits-input roboto-regular"
                        value={maxVisits}
                        onChange={(e) => setMaxVisits(e.target.value)}
                        placeholder="Maximum visits"
                        min="0"
                    />

                    <label htmlFor="is-active">Active: </label>
                    <select
                        id="is-active"
                        className="is-active-select roboto-regular"
                        value={isActive}
                        onChange={(e) => setIsActive(e.target.value === "true")}
                        required
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
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
                        Save
                    </button>
                </div>
            </form>

            {/* Отображение статуса */} 
            {status && <div className="status-message">{status}</div>}
        </div>
    );
}

export default TariffEditComponent;