import React from "react";
import "./BookCard.css";

export default function BookCard({ book }) {

  return (
    <div className="card mx-auto" style={{ width: "18rem" }}>
      <img
       src={`http://localhost:5000${b.cover_image}` || "/default-cover.jpg"}
        className="card-img-top"
        alt={book.title}
      />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
        <p className="card-text">{book.description}</p>
        <h5>Prix : {book.price} €</h5>
        <a href="#" className="btn btn-primary">
          Download
        </a>
      </div>
    </div>
  );
}

