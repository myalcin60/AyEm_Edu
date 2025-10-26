import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { GlobalContext } from "../../contexts/GlobalContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "../../../axios.config";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

export default function BookCarousel() {
  const { books, user, favorites, setFavorites } = useContext(GlobalContext);
 
  const settings = {
    dots: true,             // Alt navigasyon noktaları
    infinite: true,         // Sonsuz döngü
    speed: 800,             // Geçiş hızı
    slidesToShow: 4,        // Aynı anda 4 kitap
    slidesToScroll: 1,      // Her kaymada 1 kitap kayacak
    autoplay: true,         // Otomatik kayma
    autoplaySpeed: 2500,    // 2.5 saniye
    responsive: [
      {
        breakpoint: 1200,   // Tablet yatay
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,    // Tablet dikey
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 576,    // Mobil
        settings: { slidesToShow: 1 }
      }
    ]
  };
 

  return (
    <div className="book-carousel my-5 container">
      <h2 className="text-center mb-4 fw-bold"> Books of the Mounth</h2>
      <Slider {...settings}>
        {books.map((b, index) => (
          <div key={index} className="px-2">
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
                <h6>book Id : {b.id}</h6>
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
      </Slider>
    </div>
  );
}
