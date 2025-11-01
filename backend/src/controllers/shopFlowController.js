import shopFlowRepository from "../repositories/shopFlowRepository.js";

const saveCartItems= async(req,res, next) =>{
  try {
   const cartItem= await shopFlowRepository.addToCart(req.body)
     res.status(201).json({ message: "Book added successfully in the Cart", item: cartItem })
  } catch (error) {
    console.error("Error adding book to cart:", error);
    res.status(500).json({ message: "Server error while adding book" })
  }
}
//remove item
const deleteCartItems = async (req, res, next) => {   
  try {
    await shopFlowRepository.removeCartitems(req.body);
    res.status(200).json({ message: "Book deleted successfully in the Cart" });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting book" });
  }
};
// check cart 
const getItemById = async(req, res)=>{
 
  try {   
    const book = await shopFlowRepository.getItemById(req.query.bookId, req.query.userId);    
    res.status(200).json(book)
  } catch (error) {
     res.status(500).json({ message: "Server error while fetching book" });
  }
}

//check user cart
const getItemByUserId = async(req, res)=>{
 
  try {   
    const items = await shopFlowRepository.getItemByUserId( req.params.id);   
    res.status(200).json(items)
  } catch (error) {
     res.status(500).json({ message: "Server error while fetching book" });
  }
}

export default  {saveCartItems , deleteCartItems, getItemById, getItemByUserId}