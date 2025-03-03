import { useEffect, useState } from "react";
import Card from "./card";

export default function Item({ query }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        const response = await fetch(`https://images-api.nasa.gov/search?q=${query}`);
        const data = await response.json();
        setItems(data.collection?.items || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchData();
  }, [query]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <Card
              key={index}
              id={item.data?.[0]?.nasa_id}
              title={item.data?.[0]?.title}
              imageUrl={item.links?.[0]?.href || "https://via.placeholder.com/300"}
              description={item.data?.[0]?.description?.substring(0, 100) || "No description"}
            />
          ))}
        </div>
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
}
