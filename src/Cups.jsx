
// export default Cups;
import React, { useState } from "react";
import "./Cups.css";

function Cups() {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const fetchData = async (event) => {
        event.preventDefault();
        setError("");
        setData(null);

        const productId = document.getElementById("productid").value;
        if (!productId) {
            setError("Please enter a Product ID.");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:54684/cups/${productId}`);
            if (!response.ok) {
                const errorText = await response.text(); // Get error response text
                throw new Error(`Failed to fetch data: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const jsonData = await response.json();
            setData(jsonData);
        } catch (err) {
            setError(`Error fetching data: ${err.message}`);

            console.error("Error:", err);
        }
    };

    return (
        <div className="container">
            <h1>Cups Service</h1>
            <form onSubmit={fetchData} className="form-group">
                <label htmlFor="productid">Enter Product ID:</label>
                <input type="text" id="productid" placeholder="Enter Product ID" required />

                <button type="submit">Get Product Info</button>
            </form>

            {error && <p className="error">{error}</p>}

            {data && (
                <div className="output">
                    <h3>AR Info:</h3>
                    <pre className="json-data">{JSON.stringify(data.ar_info, null, 2)}</pre>

                    <h3>Related Entities:</h3>
                    <pre className="json-data">{JSON.stringify(data.related_entities, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default Cups;

