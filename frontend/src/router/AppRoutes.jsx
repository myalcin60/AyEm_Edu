import { Route, Routes } from "react-router-dom"
import Home from '../views/Home/Home.jsx'
import Favorites from '../views/Favorites/Favorites.jsx'
import Access from "../views/Access/Access.jsx"
import Account from "../views/Account/Account.jsx"
import Dashboard from "../views/Dashboard/Dashboard.jsx"
import AddBook from "../views/AddBook/AddBook.jsx"
import Library from "../views/Library/Library.jsx"

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

        </Routes>

    )
}

export default AppRoutes;