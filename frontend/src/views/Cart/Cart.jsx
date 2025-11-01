import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import axios from "../../../axios.config";
import { NavLink } from "react-router-dom";
import { BsCartPlus, BsCartCheck } from "react-icons/bs";
import './Cart.css'
import CartButton from '../../components/CartButton/CartButton'

export default function Cart() {
    const { user ,cartBooks, setCartBooks, totalPrice, setTotalPrice} = useContext(GlobalContext);   
    
    return (
        <div className="container my-5">
            <h2 className="fw-bold text-start mb-4"> Your Shopping Cart</h2>

            {cartBooks.length === 0 ? (
                <div className="text-center p-5">
                    <h5 className="text-muted">Your cart is empty.</h5>
                    <NavLink to="/books" className="btn btn-primary mt-3">
                        Browse Books
                    </NavLink>
                </div>
            ) : (
                <>
                    <div className="list-group shadow-sm rounded-4">
                        {cartBooks.map((b, index) => (
                            <div
                                key={index}
                                className="list-group-item list-group-item-action d-flex flex-row flex-md-row align-items-center py-3 px-4 border-0 border-bottom "
                            >
                                 <NavLink to={`/books/details/${b.id}`}   >                                  
                                   
                                {/* Kapak Görseli */}
                                <img
                                    src={`http://localhost:5000${b.cover_image}` || "/placeholder.jpg"}
                                    alt={b.title}
                                    className="rounded me-4"
                                    style={{ width: "50px", height: "60px", objectFit: "cover" }}
                                />
                                </NavLink>

                                {/* Kitap Bilgileri */}
                                <div className="flex-grow-1 text-start">
                                    <p className="mb-1">{b.gendre}</p>
                                    <p className="mb-1 ">{b.title}</p>
                                    <p className="text-muted mb-1">
                                        {b.lastName} {b.firstName}
                                    </p>
                                </div>

                                {/* Fiyat ve Buton */}
                                <div className="text-end">      
                                    <h5 className="text-primary fw-semibold mb-2">{b.price} €</h5>
                                    <div className=" bg-transparent">
                                        <CartButton  bookId={b.id}  />
                                    </div>
                                    
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Toplam Alanı */}
                    <div className=" d-flex justify-content-between">
                        <div className="text-center p-5">
                            <NavLink to="/books" className="btn btn-success mt-3">
                                Browse Books
                            </NavLink>
                        </div>
                        <div className="p-5 text-center">
                            <h4 className="fw-bold">
                                Total: <span className="text-success">{totalPrice.toFixed(2)} €</span>
                            </h4>
                            <NavLink to="/checkout" className="btn btn-success btn-lg mt-3 rounded-pill px-5">
                                Pay
                            </NavLink>
                        </div>
                        
                    </div>

                </>
            )}
        </div>
    );
}