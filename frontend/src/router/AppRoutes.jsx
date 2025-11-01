import { Route, Routes } from "react-router-dom"
import Home from '../views/Home/Home.jsx'
import Favorites from '../views/Favorites/Favorites.jsx'
import Access from "../views/Access/Access.jsx"
import Account from "../views/Account/Account.jsx"
import Dashboard from "../views/Dashboard/Dashboard.jsx"
import AddBook from "../views/AddBook/AddBook.jsx"
import Library from "../views/Library/Library.jsx"
import BookDetail from "../views/BookDetail/BookDetail.jsx"
import Books from "../views/Books/Books.jsx"
import Cart from "../views/Cart/Cart.jsx"
import BookPreview from "../views/BookPreview/BookPreview.jsx"
import Payment from "../views/Payment/Payment.jsx"
import BookViewer from "../views/BookViewer/Bookviewer.jsx";



const AppRoutes = () => {

    return (
        <Routes>      
                <Route path="/" element={<Home />} />
                <Route path="/access" element={<Access />} />
                <Route path="/account" element={<Account />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/addbook" element={<AddBook />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/library" element={<Library />} />
                <Route path="/books/details/:id" element={<BookDetail />} />
                <Route path="/books" element={<Books />} />
                <Route path="/carts" element={<Cart />} />
                <Route path="/checkout" element={<Payment />} />
                <Route path="/books/preview/:id" element={<BookPreview />} />
                <Route path="/library/view/:id" element={<BookViewer />} />

            
        </Routes>

    )
}

export default AppRoutes;