import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/TariffDetailsComponent.css";

function TariffDetailsComponent() {
    const { id } = useParams(); // Получаем id из URL
    const navigate = useNavigate();
    const [tariff, setTariff] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Получение данных тарифа
    useEffect(() => {
        axios.get(`/api/tariffs/${id}/`)
            .then((response) => {
                setTariff(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch tariff details:", err);
                setError("Failed to load tariff details.");
                setLoading(false);
            });
    }, [id]);

    // Удаление тарифа
    const handleDelete = (tariffId) => {
        if (window.confirm("Are you sure you want to delete this tariff?")) {
            axios.delete(`/api/tariffs/${tariffId}/`)
                .then(() => {
                    alert("Tariff deleted successfully.");
                    navigate("/tariffs-list"); // Возвращаемся к списку тарифов
                })
                .catch((err) => {
                    console.error("Failed to delete tariff:", err);
                    alert("Failed to delete tariff.");
                });
        }
    };

    const handleEdit = () => {
        navigate(`/tariffs/${id}/edit`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="tariff-detail-container">
            <h2 className="tariff-details-h2 roboto-regular">Tariff Details</h2>
            {tariff ? (
                <div className="tariff-info">
                    <div className="info-tariff-details roboto-regular">
                        <h3 className="roboto-regular">{tariff.name}</h3>
                        <p><strong className="roboto-regular">Price:</strong> {tariff.price} som</p>
                        <p><strong className="roboto-regular">Max Visits:</strong> {tariff.max_visits}</p>
                        <p><strong className="roboto-regular">Active:</strong> {tariff.is_active ? "Yes" : "No"}</p>
                    </div>
                    <div className="del-container">
                        <button
                            alt="Delete tariff"
                            onClick={() => handleDelete(tariff.id)}
                            aria-label="Delete tariff"
                            className="delete-btn roboto-regular"
                        >
                            Delete
                        </button>
                        <button
                            alt="Edit tariff"
                            onClick={() => handleEdit(tariff.id)}
                            aria-label="Edit tariff"
                            className="edit-btn roboto-regular"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            ) : (
                <p>Tariff not found.</p>
            )}
        </div>
    );
}

export default TariffDetailsComponent;
