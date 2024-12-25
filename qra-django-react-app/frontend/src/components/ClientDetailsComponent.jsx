import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ClientDetailsComponent.css";
import deleteIcon from "../assets/deleteIcon.svg";

function ClientDetailComponent() {
    const { id } = useParams(); // Получаем id из URL
    const navigate = useNavigate();
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Получение данных клиента
    useEffect(() => {
        axios.get(`/api/clients/${id}/`)
            .then((response) => {
                setClient(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch client details:", err);
                setError("Failed to load client details.");
                setLoading(false);
            });
    }, [id]);

    // Удаление клиента
    const handleDelete = (clientId) => {
        if (window.confirm("Are you sure you want to delete this client?")) {
            axios.delete(`/api/clients/${clientId}/`)
                .then(() => {
                    alert("Client deleted successfully.");
                    navigate("/home"); // Возвращаемся к списку клиентов
                })
                .catch((err) => {
                    console.error("Failed to delete client:", err);
                    alert("Failed to delete client.");
                });
        }
    };

    // Добавление посещения
    const handleAddVisit = (membershipId) => {
        axios.post(`/api/memberships/${membershipId}/add-visit/`)
            .then(() => {
                alert("Visit added successfully.");
                axios.get(`/api/clients/${id}/`)
                    .then((response) => setClient(response.data))
                    .catch((err) => console.error("Failed to reload client data:", err));
            })
            .catch((err) => {
                console.error("Failed to add visit:", err);
                alert("Failed to add visit.");
            });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="client-detail-container">
            <h2 className="client-details-h2 roboto-regular">Client Details</h2>
            {client ? (
                <div className="client-info">
                    {client.memberships && client.memberships.length > 0 ? (
                        client.memberships.map((membership) => (
                            <div key={membership.id} className="membership-info">
                                <div className="info-client-tariff">
                                        <div className="full_name-visits">
                                            <h3 className="roboto-regular">{client.full_name}</h3>
                                            <p className="roboto-regular">
                                                <strong className="roboto-regular">Visits: </strong>
                                                {membership.visit_count}/{membership.tariff.max_visits}
                                            </p>
                                        </div>

                                        <div className="membership-info-p roboto-regular">
                                            <h3 className="roboto-regular">Tariff</h3>
                                            <p className="roboto-regular"><strong className="roboto-regular">Name:</strong> {membership.tariff.name}</p>
                                            <p className="roboto-regular"><strong className="roboto-regular">Price:</strong> {membership.tariff.price} som</p>
                                            <p className="roboto-regular"><strong className="roboto-regular">Active:</strong> {membership.tariff.is_active ? "Yes" : "No"}</p>
                                        </div>
                                </div>

                                <div className="del-add-container">
                                    <button
                                        src={deleteIcon}
                                        alt="Delete client"
                                        onClick={() => handleDelete(client.id)}
                                        aria-label="Delete client"
                                        className="delete-btn roboto-regular"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleAddVisit(membership.id)}
                                        aria-label="Add Visit"
                                        className="add-visit-btn roboto-regular"
                                    >
                                        Add Visit
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No memberships found.</p>
                    )}
                </div>
            ) : (
                <p>Client not found.</p>
            )}
        </div>
    );
}

export default ClientDetailComponent;
