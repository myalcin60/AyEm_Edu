import React from "react";
import "./TeacherCard.css";
export default function TeacherCard() {
     const authors = [
        { "book": "Math Basics", "name": "John Doe", "price": 10 },
        { "book": "English Grammar", "name": "Jane Smith", "price": 15 },
        { "book": "World History", "name": "Alice Brown", "price": 20 },
        { "book": "World History", "name": "Alice Brown", "price": 20 },
        { "book": "World History", "name": "Alice Brown", "price": 20 },
        { "book": "World History", "name": "Alice Brown", "price": 20 }
    ];
     return (
        <div className="books-container mt-3 mb-5">
            <div className="books d-flex gap-4 flex-nowrap overflow-auto">
                {authors.map((b, ind) => (
                    <div key={ind} className="card flex-shrink-0" style={{ width: "18rem" }}>
                        <img src="..." className="card-img-top" alt={b.name} />
                        <div className="card-body">
                            <h5 className="card-title">{b.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{b.author}</h6>
                            <p className="card-text">
                                Some quick example text to build on the card title and make up the bulk of the card’s content.
                            </p>
                            <h5>Prix : {b.price} €</h5>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}