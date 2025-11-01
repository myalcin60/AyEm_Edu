import libraryRepositrory from "../repositories/libraryRepositrory.js";

const saveToLibaray=async(req,res, next) =>{    
  try {
   const libraries= await libraryRepositrory.addToLibrary(req.body.cartBooks)
     res.status(201).json({ message: "Book added successfully in the Library"})
  } catch (error) {
    console.error("Error adding  book to library:", error);
    res.status(500).json({ message: "Server error while adding book" })
  }
}

const getLibraryByUserId = async(req, res)=>{
 
  try {   
    const books = await libraryRepositrory.getLibray( req.params.id);   
    res.status(200).json(books)
  } catch (error) {
     res.status(500).json({ message: "Server error while fetching book" });
  }
}


export default {saveToLibaray, getLibraryByUserId}