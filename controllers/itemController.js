import Item from '../models/itemModel.js';
import Category from '../models/categoryModel.js';
import Subcategory from '../models/subCategoryModel.js';

// Controller to create an item
export const createItem = async (req, res) => {
    try {
        const {
            itemName,
            image,
            categoryName,
            subcategoryName,
            description,
            taxApplicability,
            tax,
            baseAmount,
            discount
        } = req.body;
        const totalAmount = baseAmount - discount;

        if (!subcategoryName && !categoryName)
            return res.status(400).json({ message: 'Either subcategory or category should be filled' });

        let exists;
        if (subcategoryName) {
            exists = await Subcategory.findOne({ subcategoryName: subcategoryName });
        } else {
            exists = await Category.findOne({ categoryName: categoryName });
        }
        if (!exists)
            return res.status(404).json({ message: 'Subcategory or category not found' });

        const newItem = new Item({
            itemName,
            image,
            categoryName,
            subcategoryName,
            description,
            taxApplicability,
            tax,
            baseAmount,
            discount,
            totalAmount
        });

        const savedItem = await newItem.save();

        if (subcategoryName) {
            const subcategory = await Subcategory.findOne({ subcategoryName: subcategoryName });
            if (!subcategory) {
                return res.status(404).json({ message: 'Subcategory not found' });
            }
            subcategory.items.push(savedItem);
            await subcategory.save();
        }
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Controller to get all items
export const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        if (!items)
            return res.status(404).json({ message: 'Items not found' });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to get items by category
export const getItemsByCategory = async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        const category = await Category.findOne({ categoryName }).populate('subCategories');
        if (!category)
            return res.status(404).json({ message: 'Category not found' });

        const subcategories = category.subCategories;
        if (!subcategories)
            return res.status(404).json({ message: 'No subcategories under category' });

        let allItems = [];
        for (const subcategory of subcategories) {
            const items = await Item.find({ subcategoryName: subcategory.subcategoryName });
            allItems.push(...items);
        }
        res.status(200).json(allItems);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to get items by subcategory
export const getItemsBySubcategory = async (req, res) => {
    try {
        const subcategoryName = req.params.subcategoryName;
        const subcategory = await Subcategory.findOne({ subcategoryName }).populate('items');
        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }
        res.status(200).json(subcategory.items);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to search items by partial name
export const searchItems = async (req, res) => {
    try {
        const partialName = req.query.name;
        const regexPattern = new RegExp(partialName, "i");
        
        // Find items matching the regex and return only specific fields
        const items = await Item.find({ itemName: { $regex: regexPattern } })
            .select('itemName categoryName subcategoryName description taxApplicability tax baseAmount discount totalAmount');

        if (!items || items.length === 0) {
            return res.status(404).json({ message: "No items found" });
        }

        res.status(200).json(items);
    } catch (error) {
        console.error("Error in searchItems:", error); // Log any errors
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



// Controller to get an item by its name
export const getItemByName = async (req, res) => {
    try {
        const itemName = req.params.itemName;
        const item = await Item.findOne({ itemName });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to get an item by its ID
export const getItemById = async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to update an item
export const updateItem = async (req, res) => {
    try {
        const itemName = req.params.itemName;
        const updates = req.body;
        let totalAmount;
        const itemData = await Item.findOne({ itemName });

        if (updates.baseAmount && updates.discount) {
            totalAmount = updates.baseAmount - updates.discount;
            updates.totalAmount = totalAmount;
        } else if (updates.baseAmount || updates.discount) {
            totalAmount = (updates.baseAmount || itemData.baseAmount) - (updates.discount || itemData.discount);
            updates.totalAmount = totalAmount;
        }

        const updatedItem = await Item.findOneAndUpdate({ itemName }, updates, { new: true });
        if (!updatedItem)
            return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to delete an item
export const deleteItem = async (req, res) => {
    try {
        const itemName = req.params.itemName;
        const item = await Item.findOne({ itemName });
        if (!item)
            return res.status(404).json({ message: 'Item not found' });

        await Item.deleteOne({ itemName });
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to get all items under a category
export const getItemsUnderCategory = async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        const category = await Category.findOne({ categoryName }).populate('subCategories');
        if (!category)
            return res.status(404).json({ message: 'Category not found' });

        let allItems = [];
        for (const subcategory of category.subCategories) {
            const items = await Item.find({ subcategoryName: subcategory.subcategoryName });
            allItems.push(...items);
        }
        res.status(200).json(allItems);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to get all items under a subcategory
export const getItemsUnderSubcategory = async (req, res) => {
    try {
        const subcategoryName = req.params.subcategoryName;
        const subcategory = await Subcategory.findOne({ subcategoryName }).populate('items');
        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }
        res.status(200).json(subcategory.items);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
