import { GlobalContext } from "../../contexts/GlobalContext";
import { useContext } from "react";
import BookCard from "../../components/BookCard/BookCard";

export default function Books() {
    const { books } = useContext(GlobalContext);
    console.log(books);
    
    return (
        <>
            <div className="container grid gap-3 p-3"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                }}>
                {books.map((book) => (
                    <div key={book.id}>
                        <BookCard b={book} />
                    </div>
                ))}
            </div>

        </>
    )
}