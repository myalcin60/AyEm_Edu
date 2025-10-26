import { useContext, useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GlobalContext } from "../../contexts/GlobalContext";
import axios from "../../../axios.config";

export default function FavoriteButton({ bookId }) {
  const { user, favorites, setFavorites } = useContext(GlobalContext);
  const [liked, setLiked] = useState(false);



  //  Favorilerde bu kitap var mı kontrol et
  useEffect(() => {
    if (favorites && favorites.length > 0) {
      const isLiked = favorites.some(f => f.book_id === bookId);     

      setLiked(isLiked);
    } else {
      setLiked(false);
    }
  }, [favorites]);

  //  Favoriye ekleme fonksiyonu
  const addFavorite = async () => {   
    if (!user) return alert("Please log in");

    try {
      if (liked) {        
        // favoriden çıkar
        await axios.delete('/favorites', {
          data: {
    userId: user.id,
    bookId: bookId
  }

        });
        setFavorites(prev => prev.filter(f => f.book_id !== bookId));
        setLiked(false);
      } else {
        // favoriye ekle
        const res = await axios.post("/favorites", {
          userId: user.id,
          bookId: bookId
        });
        if (res.status === 201) {
          setFavorites(prev => [...prev, { book_id: bookId }]);
          setLiked(true);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={()=>addFavorite()} 
      className="text-red-500 text-xl hover:scale-110 transition-transform ms-2"
      aria-label="Add to favorites" >
      {liked ? <FaHeart /> : <FaRegHeart />}
    </button>
  )
}
