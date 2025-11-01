import axios from "../../../axios.config";
import { useEffect, useState } from "react"
import { useParams, NavLink } from 'react-router-dom';
import CartButton from "../../components/CartButton/CartButton";
import { BsCart, BsCartCheck } from "react-icons/bs";


export default function BookDetail() {
    const [book, setBook] = useState([])
    const { id } = useParams();

    useEffect(() => {
        axios.get(`/books/details/${id}`)
            .then(response => {
                setBook(response.data[0][0]
                )
            })
            .catch(error => { console.error("There was an error!", error); });

    }, [id])
    return (
        <div className="container mt-5 mb-5">
            <div className="card shadow-sm">
                <div className="row g-0">
                    {/* Görsel Alanı */}
                    <div className="col-md-6">
                        <img
                            src={`http://localhost:5000${book.cover_image}` || "/placeholder.jpg"}
                            alt={book.title}
                            className="img-fluid rounded-start"
                            style={{ height: "100%", objectFit: "cover" }}
                        />
                    </div>

                    {/* Bilgi Alanı */}
                    <div className="col-md-6">
                        <div className="card-body">
                            <h5 className="card-title"> Gendre: {book.gendre}</h5>
                            <h5 className="card-title"> Title: {book.title}</h5>
                            <p className="card-text"><strong> Description:</strong> {book.description}</p>
                            <p className="card-text"><strong>👤 Author Last Name:</strong> {book.lastName}</p>
                            <p>{book.price} €</p>
                        </div>

                        <div className="card-footer text-end">

                            <button className="btn btn-outline-secondary" onClick={() => window.history.back()}>
                                Back
                            </button>
                            <CartButton bookId={book.id} price={book.price} />
                        </div>
                        <div className="d-flex mt-5 bg-warning rounded gap-5 m-1 p-1">
                            <NavLink to={`/books/preview/${book.id}`} className="nav-link" >
                                Take a look
                            </NavLink>
                        </div>

                        <div className="d-flex mt-5 bg-warning rounded gap-5 m-1 p-1 ">
                            <NavLink to="/carts" className="nav-link">{<BsCartCheck size={30} />} Go to Cart</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}