import { useEffect, useState } from "react";

export default function ItemModal({ isOpen, closeModal, itemId }) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!itemId) return;

    const fetchItemDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://images-api.nasa.gov/search?q=${itemId}`);
        const data = await response.json();
        setItem(data.collection?.items?.[0] || null);
      } catch (error) {
        console.error("Error fetching item details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetail();
  }, [itemId]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-lg w-3/4 sm:w-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">{item?.data?.[0]?.title || "No Title"}</h2>
            <img
              src={item?.links?.[0]?.href || "https://via.placeholder.com/600"}
              alt={item?.data?.[0]?.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p>{item?.data?.[0]?.description || "No description available."}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
