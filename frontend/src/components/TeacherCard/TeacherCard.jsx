import React from "react";
import "./TeacherCard.css";

export default function TeacherCard() {
  const authors = [
    { book: "Math Basics", name: "John Doe", price: 10 },
    { book: "English Grammar", name: "Jane Smith", price: 15 },
    { book: "World History", name: "Alice Brown", price: 20 },
    { book: "Science Made Easy", name: "Tom White", price: 25 },
    { book: "Programming 101", name: "Lisa Black", price: 30 },
    { book: "Art of Logic", name: "Michael Green", price: 18 },
  ];

  return (
    <div className="books-container mt-4 mb-5 container">
      <div className="row g-4 justify-content-center">
        {authors.map((b, ind) => (
          <div key={ind} className="col-12 col-sm-6 col-lg-3 d-flex">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden w-100">
              <img
                src="https://via.placeholder.com/300x200"
                className="card-img-top"
                alt={b.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title fw-bold">{b.book}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{b.name}</h6>
                <p className="card-text text-secondary small">
                  Some quick example text to build on the card title and make up the bulk of the card’s content.
                </p>
                <h6 className="fw-semibold mb-3">Price: {b.price} €</h6>
                <a href="#" className="btn btn-primary px-4">
                  View Book
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
