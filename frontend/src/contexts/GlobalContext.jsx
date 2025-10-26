import { createContext, useEffect, useState } from "react";
import axios from "../../axios.config";

export const GlobalContext = createContext();

export const Provider = ({ children }) => {
   
    const [books, setBooks] = useState([]);
    const [authorBooks, setAuthorBooks] = useState([])
    const [favorites, setFavorites] = useState([]);

    const [user, setUser] = useState(() => {
        const savedUser = sessionStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
        } else {
            sessionStorage.removeItem('user');
        }
    }, [user]);

    useEffect(() => {    
        if (user?.id) {
            axios.get(`books/${user.id}`)
                .then(response => {
                    setAuthorBooks(response.data[0]);
                })
                .catch(error => { console.error("There was an error!", error); });
        }
        else{
            setAuthorBooks(null);
        }
    }, [authorBooks,user]);

    useEffect(() => {
             if (user?.id) {                
        axios.get(`favorites/${user.id}`)
            .then(response => {
                setFavorites(response.data[0]);
            })
            .catch(error => { console.error("There was an error!", error); });
        }
        else{
            setFavorites(null)
        }
    }, [favorites,user]);


    useEffect(() => {
        axios.get("books")
            .then(response => {
                setBooks(response.data[0]);
            })
            .catch(error => { console.error("There was an error!", error); });
    }, [books]);



    return (
        <GlobalContext.Provider value={{
           favorites, setFavorites,
            authorBooks, setAuthorBooks, user, setUser, books, setBooks }}>
            {children}
        </GlobalContext.Provider>
    );
}

