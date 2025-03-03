"use client"
import { useState, useEffect } from "react";
import Card from "./card";
import ItemModal from "./itemModal";

export default function Home() {
  const [query, setQuery] = useState(""); 
  const [items, setItems] = useState([]); 
  const [selectedItemId, setSelectedItemId] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleCardClick = (id) => {
    setSelectedItemId(id); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
    setSelectedItemId(null); 
  };

  const fetchItems = async () => {
    if (!query) return; 

    const response = await fetch(`https://images-api.nasa.gov/search?q=${query}`);
    const data = await response.json();
    setItems(data.collection?.items || []);
  };

  useEffect(() => {
    fetchItems();
  }, [query]); 

  return (
    <div className="bg-gray-100 min-h-screen">

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">NASA Explorer</h1>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex justify-center mb-6"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search NASA images..."
            className="border p-2 rounded-md w-72 text-black shadow-md"
          />
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <Card
              key={index}
              title={item.data?.[0]?.title || "No Title"}
              imageUrl={item.links?.[0]?.href || "https://via.placeholder.com/300"}
              description={
                item.data?.[0]?.description?.substring(0, 100) + "..." || "No description available."
              }
              id={item.data?.[0]?.nasa_id || "No ID"}
              onCardClick={handleCardClick} 
            />
          ))}
        </div>

        <ItemModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          itemId={selectedItemId}
        />
      </div>
    </div>
  );
}