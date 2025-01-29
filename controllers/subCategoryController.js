import Category from '../models/categoryModel.js';
import Subcategory from '../models/subCategoryModel.js';

// Controller function to create a new subcategory
export const createSubcategory = async (req, res) => {
    try {
        const newSubCategory = new Subcategory(req.body);
        const savedSubcategory = await newSubCategory.save();
        const categoryName = req.body.categoryName;
        const category = await Category.findOne({ categoryName: categoryName });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        category.subCategories.push(savedSubcategory); // Push subcategory into the category
        await category.save();
        res.status(201).json(savedSubcategory);
    } catch (error) {
        res.status(400).json({ error: "Internal Server Error" });
    }
};

// Controller function to get all subcategories
export const getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await Subcategory.find();
        if (!subcategories) {
            return res.status(404).json({ message: 'No subcategories found' });
        }
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Controller function to get subcategories under a category
export const getSubcategoriesByCategory = async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        const category = await Category.findOne({ categoryName }).populate('subCategories');
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const subcategories = category.subCategories;
        if (!subcategories) {
            return res.status(404).json({ message: 'No subcategories found under this category' });
        }
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Controller function to get a subcategory by its name
export const getSubcategoryByName = async (req, res) => {
    try {
        const subcategoryName = req.params.subcategoryName;
        const subcategory = await Subcategory.findOne({ subcategoryName });
        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }
        res.status(200).json(subcategory);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Controller to get a subcategory by its ID
export const getSubcategoryById = async (req, res) => {
    try {
        const subcategoryId = req.params.id;
        const subcategory = await Subcategory.findById(subcategoryId);
        if (!subcategory)
            return res.status(404).json({ message: 'No such subcategory found' });
        res.status(200).json(subcategory);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Controller function to update a subcategory
export const updateSubcategory = async (req, res) => {
    try {
        const subcategoryName = req.params.subcategoryName;
        const updates = req.body;
        const updatedSubcategory = await Subcategory.findOneAndUpdate({ subcategoryName }, updates, { new: true });
        if (!updatedSubcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }
        res.status(200).json(updatedSubcategory);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller function to delete a subcategory
export const deleteSubcategory = async (req, res) => {
    try {
        const subcategoryName = req.params.subcategoryName;
        const findSubcategory = await Subcategory.findOne({ subcategoryName });
        if (!findSubcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }
        await Subcategory.deleteOne({ subcategoryName });
        res.status(200).json({ message: 'Subcategory deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
