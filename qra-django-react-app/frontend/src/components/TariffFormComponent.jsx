import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Импорт useNavigate
import "../styles/TariffFormComponent.css";

function TariffFormComponent() {
    const [name, setName] = useState(""); // Название тарифа
    const [price, setPrice] = useState(""); // Цена тарифа
    const [maxVisits, setMaxVisits] = useState(""); // Максимальное количество посещений
    const [isActive, setIsActive] = useState(true); // Статус тарифа (активен/неактивен)
    const [status, setStatus] = useState(null); // Статус ответа

    const navigate = useNavigate(); // Для навигации

    // Обработка отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/tariffs/", {
                method: "POST",
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
                throw new Error(errorData.detail || "Failed to create tariff");
            }

            setStatus("Tariff created successfully!");
            setName("");
            setPrice("");
            setMaxVisits("");
            setIsActive(true);
            navigate("/tariffs-list")
        } catch (error) {
            setStatus(`Error: ${error.message}`);
        }
    };

    // Обработка кнопки Cancel
    const handleCancel = () => {
        navigate("/tariffs-list"); // Перенаправление на /tariffs
    };

    return (
        <div className="tariff-form-container">
            <h2 className="new-tariff-h2 roboto-regular">New Tariff</h2>
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
                        Create
                    </button>
                </div>
            </form>

            {/* Отображение статуса */}
            {status && <div className="status-message">{status}</div>}
        </div>
    );
}

export default TariffFormComponent;
