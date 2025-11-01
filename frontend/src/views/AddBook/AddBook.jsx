import React from 'react'
import { useForm } from "react-hook-form";
import axios from '../../../axios.config';
import { GlobalContext } from "../../contexts/GlobalContext";
import { useContext, useState, useEffect } from "react";
import './AddBook.css';
import { useNavigate } from "react-router-dom";


export default function AddBook() {
  const navigate = useNavigate();
  const { user, authorBooks, setAuthorBooks } = useContext(GlobalContext);
  const { register, handleSubmit, reset } = useForm();

  async function suprimer(bookId) {
    try {
      await axios.delete(`/books/delete/${bookId}`)
      setAuthorBooks(prev => prev.filter(b => b.id !== bookId));
      alert('Book deleted successfully');
      navigate('/addbook');

    } catch (error) {
      console.error(error);
      alert('Film could not be deleted')
      navigate('/addbook');
    }

  }

  function modifier(bookId) {
    return async (event) => {
      event.preventDefault();
      try {

      } catch (error) {

      }
    }
  }
  const addBook = async (data) => {
    try {
      const formData = new FormData();
      formData.append('gendre', data.gendre);
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('price', data.price);
      formData.append('bookFile', data.bookFile[0]);
      formData.append('author_id', user.id);

      const res = await axios.post('/add-book', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.status === 201) {
        const updatedBooks = await axios.get(`books/${user.id}`);
        setAuthorBooks(updatedBooks.data[0]);
        alert('Book added successfully!');
        reset();
      }
    } catch (error) {
      console.error('Error uploading book:', error);
      alert('Failed to add book');
    }
  }
  return (
    <>
      <form className='border p-3 box-shadow' onSubmit={handleSubmit(addBook)}>
        <div className='d-flex gap-3'>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">Gendre  </label>
            <input type="text" className="form-control" id="gendre" placeholder="Example input placeholder" {...register("gendre", { required: true })} />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">Title  </label>
            <input type="text" className="form-control" id="title" placeholder="Example input placeholder" {...register("title", { required: true })} />
          </div>

          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">Prix</label>
            <input type="number" className="form-control" id="price" placeholder="Another input placeholder" {...register("price", { required: true })} />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">Upload Book ( PDF )</label>
            <input type="file" className="form-control" id="bookFile" placeholder="Another input placeholder" {...register("bookFile", { required: true })} />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">Description</label>
          <textarea type="text" className="form-control" id="description" placeholder="Another input placeholder" {...register("description", { required: true })} />
        </div>
        <button type="submit" className="btn btn-primary w-100">Save</button>
      </form>

      <>

        <div className="container p-1 w-100 mt-5 text-light border rounded bg-dark justify-content-center align-items-center">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-primary text-light border rounded bg-dark">
                <tr>
                  <th>Gendre</th>
                  <th>Titre</th>
                  <th>Description</th>
                  <th>Date Sortie</th>
                  <th>Image</th>
                  <th className="text-end">Supprimer</th>
                  <th className="text-end">Modifier</th>
                </tr>
              </thead>

              <tbody>
                {authorBooks &&
                  authorBooks.map((f, ind) => (
                    <tr key={f.id}>
                      <td>
                        <input type="text" className="form-control" name="genre" defaultValue={f.gendre} />
                      </td>
                      <td>
                        <input type="text" className="form-control" name="titre" defaultValue={f.title} />
                      </td>
                      <td>
                        <input type="text" className="form-control" name="description" defaultValue={f.description} />
                      </td>
                      <td>
                        <input
                          type="date" className="form-control" name="created_at"
                          defaultValue={f.created_at ? new Date(f.created_at).toISOString().split("T")[0] : ""}
                        />
                      </td>
                      <td>
                        <input type="hidden" name="image" defaultValue={f.cover_image} />
                        <img src={`http://localhost:5000${f.cover_image}` || "/default-cover.jpg"} alt="film" style={{ width: "50px", height: "50px", borderRadius: "2px" }} />
                      </td>
                      <td className="text-end">
                        <form onSubmit={modifier(f.id)}>
                          <button type="submit" className="btn btn-success"> Modifier </button>
                        </form>
                      </td>
                      <td className="text-end">
                        <button onClick={() => suprimer(f.id)} className="btn btn-danger"> Supprimer  </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </>
    </>
  )
}