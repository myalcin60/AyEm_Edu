import { NavLink, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useContext } from "react";


export default function Navbar() {
    const { user } = useContext(GlobalContext);


    return (
        <div className="mt-5 box-shadow ">

            <ul className="nav">

                <li className="nav-item">
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
        </div>
    )
}