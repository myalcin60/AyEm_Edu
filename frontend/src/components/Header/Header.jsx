import { NavLink, useNavigate } from "react-router-dom";
import '../../App.css'
import { GlobalContext } from "../../contexts/GlobalContext";
import { useContext } from "react";
import Navbar from "../Navbar/Navbar";

export default function Header() {
    const { user, setUser } = useContext(GlobalContext);
    const navigate = useNavigate();

    function logout() {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/access');
    }
    return (
        <><nav className=" box-shadow navbar navbar-expand-lg navbar-warning-subtle  bg-light fixed-top mb-5">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand ms-3">Ay&Em </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link active" aria-current="page">Welcome</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/books" className="nav-link active" aria-current="page">Books</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="#" className="nav-link active" aria-current="page">Teachers</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="#" className="nav-link active" aria-current="page">Authors</NavLink>
                        </li>

                    </ul>

                    <form className="d-flex mx-auto my-2 my-lg-0" >

                        <div className="position-relative">
                            <input
                                className="form-control me-2 ps-1"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <i className="bi bi-search position-absolute top-50 end-0 p-1 translate-middle-y ms-3 text-muted"></i>
                        </div>
                    </form>

                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">


                        <li className="nav-item d-flex align-items-center me-3">
                            {!user &&
                                <NavLink to={'/account'} className="nav-link">Account</NavLink>
                            }
                            {user &&
                                <><NavLink to={'/dashboard'} className="nav-link">Account</NavLink>
                                    <span className="ms-2">{user.lastName}</span>
                                </>

                            }
                        </li>


                        {!user &&
                            <li className="nav-item d-flex align-items-center me-3">
                                <NavLink to="/access" className="nav-link">Access</NavLink>
                            </li>

                        }
                        {user &&
                            <li className="nav-item d-flex align-items-center me-3">
                                <span className="nav-link"> { } </span>
                                <button className="nav-link btn btn-link" onClick={logout}> Sign Out </button>
                            </li>
                        }
                    </ul>

                </div>
            </div>
        </nav >
            {user &&
                <Navbar />
            }
        </>

    )
}