import { createContext, useEffect, useState } from "react";
import axios from "../../axios.config";

export const GlobalContext = createContext();

export const Provider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const [authorBooks, setAuthorBooks] = useState([])
    const [favorites, setFavorites] = useState([]);

    const [user, setUser] = useState(() => {
        const savedUser = sessionStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [cartBooks, setCartBooks] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [payment, setPayment] = useState()

    // total price    
    useEffect(() => {
        let total = 0;
        cartBooks.map((b, index) => (
            total += Number(b.price)
        ));

        setTotalPrice(total)
    }, [cartBooks])
    
    //cart items   

    useEffect(() => {
        if (!user?.id) return;
        axios.get(`/books/cart/${user.id}`)
            .then(res => {
                setCartBooks(res.data)

            })
            .catch(error => { console.error("There was an error!", error); });
    }, [user]);

    // user login
    useEffect(() => {
        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
        } else {
            sessionStorage.removeItem('user');
        }
    }, [user]);

    //user books
    useEffect(() => {
        if (user?.id) {
            axios.get(`books/${user.id}`)
                .then(response => {
                    setAuthorBooks(response.data[0]);
                })
                .catch(error => { console.error("There was an error!", error); });
        }
        else {
            setAuthorBooks(null);
        }
    }, [user]);
    // favoraties
    useEffect(() => {
        if (user?.id) {
            axios.get(`favorites/${user.id}`)
                .then(response => {
                    setFavorites(response.data[0]);
                })
                .catch(error => { console.error("There was an error!", error); });
        }
        else {
            setFavorites(null)
        }
    }, [user]);

    // all books books page
    useEffect(() => {
        axios.get("books")
            .then(response => {
                setBooks(response.data[0]);
            })
            .catch(error => { console.error("There was an error!", error); });
    }, []);

    // all Users
    useEffect(() => {
        axios.get("users")
            .then(response => {
                setUsers(response.data[0]);
            })
            .catch(error => { console.error("There was an error!", error); });
    }, []);

    return (
        <GlobalContext.Provider value={{
       
            payment, setPayment,
            totalPrice, setTotalPrice,
            cartBooks, setCartBooks,
            favorites, setFavorites,
            authorBooks, setAuthorBooks, user, setUser, books, setBooks, users, setUsers
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

