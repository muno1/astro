export function Card({ title, imageUrl, description }) {
    return (
        <div style={{ 
            border: "1px solid #ddd", 
            borderRadius: "8px", 
            padding: "10px", 
            textAlign: "center", 
            boxShadow: "2px 2px 10px rgba(0,0,0,0.1)" 
        }}>
            <img 
                src={imageUrl} 
                alt={title} 
                style={{ 
                    width: "100%", 
                    height: "200px", 
                    objectFit: "cover", 
                    borderRadius: "8px" 
                }} 
            />
            <h3 style={{ fontSize: "1.1rem", margin: "10px 0" }}>{title}</h3>
            <p style={{ fontSize: "0.9rem", color: "#555" }}>{description}</p>
        </div>
    );
}

export default Card;
