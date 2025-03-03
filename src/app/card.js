export function Card({ title, imageUrl, description, id, onCardClick }) {
  return (
    <div
      className="border border-gray-300 rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onCardClick(id)}
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

export default Card;

