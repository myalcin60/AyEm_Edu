import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { GlobalContext } from "../../contexts/GlobalContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import BookCard from "../BookCard/BookCard";

export default function BookSlider() {
  const { books, user } = useContext(GlobalContext);

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
      <h2 className="text-center mb-4 fw-bold">Books of the Month</h2>
      <Slider {...settings}>
        {books.map((book) => (
          <div key={book.id} className="px-2">
            <BookCard b={book} />
          </div>
        ))}
      </Slider>
    </div>
  );
}


