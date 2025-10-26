import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import './Access.css';
import axios from '../../../axios.config';
import { GlobalContext } from "../../contexts/GlobalContext";
import { useContext } from "react";


export default function Access() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { user, setUser } = useContext(GlobalContext);

    const access = async (formData) => {
        try {
            const res = await axios.post('/login', formData);
            
            if (res.status === 200) {
                setUser(res.data.user);
                sessionStorage.setItem('user', JSON.stringify(res.data.user));
                //localStorage.setItem('user', JSON.stringify(res.data.user));          
               // localStorage.setItem('token', res.data.token);
                navigate('/dashboard');
            }
        } catch (error) {
            alert("Login failed. Please check your credentials and try again.");
            console.error("There was an error!", error);
        }
    }

    return (

        <div className="wrapper">
            <main className="content">
                <form onSubmit={handleSubmit(access)}>
                    <div className=" compte container d-flex justify-content-center mt-5">
                        <div className=" p-4 border rounded text-dark">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" {...register("email")} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" {...register("password")} />
                            </div>
                            <button type="submit" className="btn btn-outline-success w-100">Login</button>
                        </div>
                    </div>
                </form>
            </main>

        </div>

    )
}