// components/Item.js
"use client"
import { useEffect, useState } from "react";
import Card from "./card";

export default function Item({ query }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data for query:", query); // Log the query value

      if (!query) return; // Do nothing if there's no query

      setLoading(true);

      try {
        console.log("Fetching data from NASA API..."); // Log that we're fetching data
        const response = await fetch(`https://images-api.nasa.gov/search?q=${query}`);
        const data = await response.json();
        
        // Log the entire data object returned from NASA API
        console.log("Fetched data:", data);

        setItems(data.collection?.items || []);
        console.log("Items set:", data.collection?.items); // Log the items set in state
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]); // Re-fetch when the 'query' changes

  if (loading) return <div className="text-center text-lg">Loading...</div>;

  return (
    <div>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item, index) => {
            console.log("Rendering item:", item); // Log each item being rendered
            
            return (
              <Card
                key={index}
                id={item.data?.[0]?.nasa_id}  // Pass the 'nasa_id' or any unique ID to Card
                title={item.data?.[0]?.title || "No title"}
                imageUrl={item.links?.[0]?.href || "https://via.placeholder.com/300"}
                description={item.data?.[0]?.description?.substring(0, 100) + "..." || "No description available."}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center text-lg">No results found</div>
      )}
    </div>
  );
}




