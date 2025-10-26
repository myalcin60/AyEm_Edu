import { useRef } from "react";
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import axios from '../../../axios.config';
import './Account.css';

export default function Account() {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    async function account(formData) {      
        try {
            await axios.post("/signup", formData);
            navigate("/account");
            reset();
        } catch (err) {
            console.error(err);
        }
    }

    return (

        <div className="wrapper">
            <main className="content mt-5">
                <form onSubmit={handleSubmit(account)}>
                    <div className="container d-flex justify-content-center mt-5">
                        <div className=" p-4 border rounded">

                            <div className="mb-3 ">
                                <label htmlFor="nom" className="form-label">Nom</label>
                                <input type="text" className="form-control" id="nom" {...register("nom")} />
                            </div>
                            <div className="mb-3 ">
                                <label htmlFor="prenom" className="form-label">Prenom</label>
                                <input type="text" className="form-control" id="prenom"  {...register("prenom")} />
                            </div>
                            <div className="mb-3 ">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" {...register("email")} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" {...register("password")} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="role" className="form-label">Role</label>
                                <select className="form-select" id="role" {...register("role")}>
                                    <option value="author">Author</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="student">Student</option>
                                    <option value="reader">Reader</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-outline-success w-100">Enregistrer</button>
                        </div>
                    </div>
                </form>

            </main>
        </div>



    )
}