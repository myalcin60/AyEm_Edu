import React, { useContext } from "react";
import Slider from "react-slick";
import { GlobalContext } from "../../contexts/GlobalContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { NavLink } from "react-router-dom";
import TeacherCard from "../TeacherCard/TeacherCard";

export default function TeacherSlider() {
    const { users } = useContext(GlobalContext);   
    let teachers = [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].role == 'teacher') {
            teachers.push(users[i])
        }

    }

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
         <h2 className="text-center fw-bold mb-4">Authors & Teachers of the Month</h2>
            <Slider {...settings}>
                {teachers.map((b, index) => (
                    <div key={index} className="px-2">
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">

                            <div className="card-body text-center">
                                <h6 className="card-subtitle mb-2 text-muted">{b.lastName} </h6>
                                <h6 className="card-subtitle mb-2 text-muted"> {b.firstName}</h6>
                                <h6>Specialite</h6>
                                <h6>{b.price} €</h6>
                                <div className="d-flex justify-content-center gap-2">

                                    <NavLink to={`/books/details/${b?.id}`} className="btn btn-primary">
                                        View Profile
                                    </NavLink>
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
