import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import axios from "../../../axios.config";
import { BsCartPlus, BsCartCheck } from "react-icons/bs";

export default function CartButton({ bookId, price }) {
  const { user, cartBooks, setCartBooks } = useContext(GlobalContext);
  const [added, setAdded] = useState(false);
  const [item, setItem] = useState()




  useEffect(() => {
    const checkCart = async () => {
      if (!user?.id) return;

      try {
        const res = await axios.get(`/cart-items/check`, {
          params: { userId: user.id, bookId },
        });


        res.data[0].quantity == 1 ? setAdded(true) : setAdded(false);
      } catch (err) {
        console.error(err);
      }
    };
    checkCart();
  }, [user, bookId]);

  const addToCart = async () => {
    if (!user) return alert("Please log in");
    try {
      if (added) {
        //remove cart
        await axios.delete('/cart-items', {
          data: {
            userId: user.id,
            bookId: bookId
          }
        })
        setCartBooks(prev => prev.filter(b => b.book_id !== bookId));
        setAdded(false)


      }
      else {
        // add cart
        const res = await axios.post('/cart-items', {
          userId: user.id,
          bookId: bookId
        });
        const updatedCart = await axios.get(`/books/cart/${user.id}`);
        setCartBooks(updatedCart.data);
        setAdded(true)

      }
    } catch (error) {
      console.error(error);
    }


  };

  return (
    <button
      onClick={() => addToCart()}
      className=" bg-transparent"   style={{color:"orange"}}>
      {added ? <BsCartCheck size={20} /> : <BsCartPlus size={20} />}
      <span className="ms-2 text-red" >{added ? "In cart" : "Add To Cart"}</span>
    </button>
  )
}
