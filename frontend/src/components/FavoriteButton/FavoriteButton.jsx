import { useContext, useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GlobalContext } from "../../contexts/GlobalContext";
import axios from "../../../axios.config";

export default function FavoriteButton({ bookId }) {
  const { user, favorites, setFavorites } = useContext(GlobalContext);
  const [liked, setLiked] = useState(false);
  // control favorite
  useEffect(() => {
    if (favorites && favorites.length > 0) {
      const isLiked = favorites.some(f => f.book_id === bookId);
      setLiked(isLiked);
    } else {
      setLiked(false);
    }
  }, [favorites, bookId]);

  useEffect(() => {
  const isLiked = favorites?.some(f => f.book_id === bookId) || false;
  if (isLiked !== liked) setLiked(isLiked);
}, [favorites, bookId]);


  const addFavorite = async () => {
    if (!user) return alert("Please log in");

    try {
      if (liked) {
        // remove favorite
        await axios.delete('/favorites', {
          data: {
            userId: user.id,
            bookId: bookId
          }

        });

        setFavorites(prev => prev.filter(f => f.book_id !== bookId));
        setLiked(false);
      } else {
        // add favorite
        const res = await axios.post("/favorites", {
          userId: user.id,
          bookId: bookId
        });

        if (res.status === 201) {
          const updatedFavorites = await axios.get(`/favorites/${user.id}`);
          setFavorites(updatedFavorites.data[0]);
          // setFavorites(prev => [...prev, { book_id: bookId }]);
          setLiked(true);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={() => addFavorite()}
      className="text-red-500 text-xl hover:scale-110 transition-transform ms-2"
      aria-label="Add to favorites" >
      {liked ? <FaHeart /> : <FaRegHeart />}
    </button>
  )
}
