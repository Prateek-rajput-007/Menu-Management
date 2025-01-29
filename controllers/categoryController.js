import Category from '../models/categoryModel.js';

// Controller to create a new category
export const createCategory = async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        const saveCategory = await newCategory.save();
        if (!saveCategory)
            return res.status(404).json({ message: 'Error creating category' });
        res.status(201).json(saveCategory);
    } catch (error) {
        res.status(400).json({ error: "Internal Server Error" });
    }
};

// Controller to get all categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories)
            return res.status(404).json({ message: 'No categories found' });
        res.status(201).json(categories);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Controller to get a category by its name
export const getCategoryByName = async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        const category = await Category.findOne({ categoryName });
        if (!category)
            return res.status(404).json({ message: 'No such category found' });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Controller to get a category by its ID
export const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
        if (!category)
            return res.status(404).json({ message: 'No such category found' });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Controller to update a category
export const updateCategory = async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        const updates = req.body;
        const updatedCategory = await Category.findOneAndUpdate({ categoryName }, updates, { new: true });
        if (!updatedCategory)
            return res.status(404).json({ message: 'Category not found' });
        res.status(201).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to delete a category
export const deleteCategory = async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        const findcategory = await Category.findOne({ categoryName });
        if (!findcategory)
            return res.status(404).json({ message: 'Category not found' });
        await Category.deleteOne({ categoryName });
        res.status(201).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
