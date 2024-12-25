import { useState } from "react";
import axios from "axios";

function QRCodeScanner() {
    const [qrCode, setQrCode] = useState("");
    const [message, setMessage] = useState("");

    const handleScan = () => {
        axios.post("/api/validate-qr-code/", { qr_code: qrCode })
            .then((response) => {
                setMessage(response.data.success);
            })
            .catch((error) => {
                if (error.response) {
                    setMessage(error.response.data.error);
                } else {
                    setMessage("An error occurred. Please try again.");
                }
            });
    };

    return (
        <div>
            <h2>QR Code Scanner</h2>
            <input
                type="text"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
                placeholder="Scan QR Code"
            />
            <button onClick={handleScan}>Validate</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default QRCodeScanner;
