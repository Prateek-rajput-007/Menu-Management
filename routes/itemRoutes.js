import express from 'express';
import { 
    createItem, 
    getItems, 
    getItemsByCategory, 
    getItemsBySubcategory, 
    searchItems, 
    getItemByName, 
    updateItem, 
    deleteItem, 
    getItemById, 
    getItemsUnderCategory, 
    getItemsUnderSubcategory 
} from '../controllers/itemController.js';

const router = express.Router();

// Route to create an item
router.post("/items", createItem);

// Route to get all items
router.get("/items", getItems);

// Route to get items by category
router.get("/items/category/:categoryName", getItemsUnderCategory);

// Route to get items by subcategory
router.get("/items/subcategory/:subcategoryName", getItemsUnderSubcategory);

// Route to search items by partial name
router.get("/items/search", searchItems);

// Route to get an item by its name
router.get("/items/:itemName", getItemByName);

// Route to get an item by its ID
router.get("/items/id/:id", getItemById);

// Route to update an item
router.patch("/items/:itemName", updateItem);

// Route to delete an item
router.delete("/items/:itemName", deleteItem);

export default router;
