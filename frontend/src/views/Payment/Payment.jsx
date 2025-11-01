import CreditCart from "../../components/PeymantMethod/CreditCart";
import GooglePay from "../../components/PeymantMethod/GooglePay";
import Paypal from "../../components/PeymantMethod/Paypal";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";



export default function Payment() {
    const { user, cartBooks, totalPrice, setTotalPrice, payment, setPayment } = useContext(GlobalContext);
    const navigate = useNavigate();




    return (
        <>
            <h2 className="mt-5">Select payment method</h2>
            <div className=" mb-5">
                <div className="btn btn-success btn-lg mt-3 rounded-pill px-5">
                    <Paypal />
                    TOTAL PRICE : {totalPrice}


                </div>
                <div><button className="btn btn-success btn-lg mt-3 rounded-pill px-5">
                    <GooglePay />
                </button>
                </div>
                <div><button className="btn btn-success btn-lg mt-3 rounded-pill px-5">
                    <CreditCart />
                </button>
                </div>
            </div>

        </>
    )
}