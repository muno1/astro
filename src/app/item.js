import Card from "./card";
import { useEffect, useState } from "react";

export default function Item({ query }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!query) return;
            const response = await fetch(`https://images-api.nasa.gov/search?q=${query}`);
            const data = await response.json();
            setItems(data.collection?.items || []);
        };

        fetchData();
    }, [query]); // Re-fetch when query changes

    return (
        <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
            gap: "16px", 
            padding: "20px" 
        }}>
            {items.map((item, index) => (
                <Card 
                    key={index}
                    title={item.data?.[0]?.title || 'No title'}
                    imageUrl={item.links?.[0]?.href || 'https://via.placeholder.com/300'}
                    description={item.data?.[0]?.description?.substring(0, 100) + "..." || "No description available."}
                />
            ))}
        </div>
    );
}


