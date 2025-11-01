import { useEffect, useState } from 'react'
import BookCard from '../../components/BookCard/BookCard'
import axios from '../../../axios.config.js';
import { GlobalContext } from "../../contexts/GlobalContext";
import { useContext } from "react";

export default function Library() {
    const { user } = useContext(GlobalContext);
    const [library, setLibrary] = useState([])

useEffect(() => {
        axios.get(`/library/${user.id}`)
        .then(res => {
            setLibrary(res.data);
            })
        .catch(error => { console.error("There was an error!", error); });

}, [user?.id]);

    console.log(library);


    return (
        <>
            <div className="container grid gap-3 p-3"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                }}>
                {library.map((book) => (
                    <div key={book.id}>
                        <BookCard b={book} />
                    </div>
                ))}
            </div>
        </>

    )
}    