import express from 'express';
import { 
    createCategory, 
    getCategories, 
    getCategoryByName, 
    getCategoryById, 
    updateCategory, 
    deleteCategory 
} from '../controllers/categoryController.js';

const router = express.Router();

// Route to create a new category
router.post("/category", createCategory);

// Route to get all categories
router.get("/category", getCategories);

// Route to get a category by its name
router.get("/category/name/:categoryName", getCategoryByName);

// Route to get a category by its ID
router.get("/category/id/:id", getCategoryById);

// Route to update category attributes
router.patch("/category/:categoryName", updateCategory);

// Route to delete a category
router.delete("/category/:categoryName", deleteCategory);

export default router;
