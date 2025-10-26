import { useContext, useState,useEffect } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";


export default function Favorites() {

  const { user, favorites, setFavorites } = useContext(GlobalContext);

   return (
   <div className="book-carousel row my-5 container">
  {favorites.map((b, index) => (
    <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 px-2 mb-4">
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <img
          src={`http://localhost:5000${b.cover_image}` || "/placeholder.jpg"}
          alt={b.title}
          className="card-img-top"
          style={{ height: "250px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h5 className="card-title fw-bold">{b.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{b.lastName} {b.firstName}</h6>
          <p className="card-text text-muted">{b.description}</p>
          <h6>{b.price} €</h6>
          <div className="d-flex justify-content-center gap-2">
            <a href={b.file_path} className="btn btn-primary" download>
              Download
            </a>
            <FavoriteButton bookId={b.id} />
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
  );
}
