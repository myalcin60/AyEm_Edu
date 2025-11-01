import { useContext} from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

import BookCard from "../../components/BookCard/BookCard";


export default function Favorites() {

  const { favorites } = useContext(GlobalContext);
  console.log(favorites);
  

  return (

    <>
      <div className="container grid gap-3 p-3"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}>
        {favorites.map((book) => (
          <div key={book.book_id}>
            <BookCard b={book} />
          </div>
        ))}
      </div>
    </>
  );
}
