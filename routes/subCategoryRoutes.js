import express from 'express';
import { 
    createSubcategory, 
    getAllSubcategories, 
    getSubcategoriesByCategory, 
    getSubcategoryByName, 
    getSubcategoryById,
    updateSubcategory, 
    deleteSubcategory 
} from '../controllers/subCategoryController.js';

const router = express.Router();

// Post request to create a new subcategory
router.post("/subcategories", createSubcategory);

// Get request to get all subcategories
router.get("/subcategories", getAllSubcategories);

// Get request to get all subcategories under a category
router.get("/subcategories/:categoryName", getSubcategoriesByCategory);

// Get request to get a subcategory by its name
router.get("/subcategory/:subcategoryName", getSubcategoryByName);

// Get request to get a subcategory by its ID
router.get("/subcategory/id/:id", getSubcategoryById);

// Patch request to update a subcategory
router.patch("/subcategories/:subcategoryName", updateSubcategory);

// Delete request to delete a subcategory
router.delete("/subcategories/:subcategoryName", deleteSubcategory);

export default router;
