import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import axios from "../../../axios.config.js";

export default function Paypal() {
  const navigate = useNavigate();

  const { user, cartBooks, setCartBooks, totalPrice, setTotalPrice, payment, setPayment } = useContext(GlobalContext);
  const checkout = async () => {
    try {
      const res = await axios.get('/payments');
      setPayment(res.data);

      if (res.data === true) {
        try {
          const res = await axios.post('/library', { cartBooks })
          alert('Payment successful');
          setCartBooks([])
           //remove cart
           for (let i = 0; i < cartBooks.length; i++) {
             await axios.delete('/cart-items', {
          data: {
            userId: user.id,
            bookId: cartBooks[i].book_id
          }
        })
            
           }
      
          //  await axios.delete('/cart-items', {   cartBooks   })
          navigate('/library');

        } catch (error) {
          console.error("Add to library error:", error);
        }

      } else {
        navigate('/carts');
        alert('Payment failed ')
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };



  return (
    <>
      <button onClick={checkout}>
        Pay with Paypal
      </button>

    </>
  )
}