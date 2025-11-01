import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useLocation,useNavigate } from 'react-router-dom';

import { NavLink } from "react-router-dom";
import { useEffect, useState, } from "react";
import axios from "../../../axios.config.js";
import BookViewer from "../../views/BookViewer/Bookviewer.jsx";


export default function BookCard({ b }) {
  const navigate = useNavigate()

  let bookId = 0;

  const location = useLocation();
  const pathname = location.pathname
  console.log("URL:", pathname)

  pathname == '/favorites' ? bookId = b.book_id : bookId = b.id;

  let link = `/books/preview/${bookId}`
  pathname == '/library' ? link = `/library/view/${bookId}` : link = link;

  return (
    <div className="book-carousel my-5 container">
      <div className="row g-4 justify-content-center">

        <div className="card border-0 shadow-sm rounded-4 overflow-hidden w-100">
          <NavLink to={link} className="nav-link" >
            <img
              src={`http://localhost:5000${b.cover_image}` || "/placeholder.jpg"}
              alt={b.title}
              className="card-img-top"
              style={{ height: "250px", objectFit: "cover" }}
            />
          </NavLink>
          <div className="card-body text-center">
            <h5 className="card-title fw-bold">{b.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {b.lastName} {b.firstName}
            </h6>
            {!(pathname == '/library') &&
              <h6>{b.price} €</h6>
            }
            {!(pathname == '/library') &&
              <div>
                <NavLink to={`/books/details/${bookId}`} className="btn btn-primary">
                  View Book
                </NavLink>
                <FavoriteButton bookId={bookId} />
              </div>
            }

          </div>
          {/* {(pathname == '/library') &&
             <button
            onClick={() => navigate(`/library/view/${bookId}`)}
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Read Book
          </button>

          } */}
         
        </div>
      </div>
    </div >

  );

}
