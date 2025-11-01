import express, { Router } from 'express';
import shopFlowController from '../controllers/shopFlowController.js';


const router = express.Router();

router.post('/cart-items', shopFlowController.saveCartItems);
router.delete('/cart-items', shopFlowController.deleteCartItems)

router.get('/cart-items/check', shopFlowController.getItemById)
router.get('/books/cart/:id', shopFlowController.getItemByUserId)




export default router;
