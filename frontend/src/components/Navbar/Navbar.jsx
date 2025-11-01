import { NavLink, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useContext } from "react";
import { BsCartPlus, BsCartCheck } from "react-icons/bs";


export default function Navbar() {
    const { user } = useContext(GlobalContext);


    return (
        <div className="mt-5 box-shadow d-flex justify-content-between">

            <ul className="nav" >

                <li className="nav-item" >
                    <NavLink to="/library" className="nav-link">My Library</NavLink>
                </li>
                {(user.role==='author' || user.role==='teacher') &&
                    <li className="nav-item">
                        <NavLink to='/addbook' className="nav-link" >Add Book</NavLink>
                    </li>
                }

                <li className="nav-item">
                    <NavLink to="/favorites" className="nav-link">Favorites</NavLink>
                </li>

            </ul>
            <ul className="nav">
                <li className="nav-item">
                    <NavLink to="/carts" className="nav-link">{<BsCartCheck size={20} color="orange" />}</NavLink>
                </li>
            </ul>
        </div>
    )
}