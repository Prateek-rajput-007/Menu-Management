# Menu Management Backend

## Overview
This project is a Node.js backend server for managing a menu system. The menu is divided into three levels:
1. **Category**
2. **Subcategory** (A category can have multiple subcategories)
3. **Items** (A subcategory can have multiple items)

APIs are available to create, retrieve, update, and search menu components. The application can be tested using Postman.

---

## Features
- **Project Setup**: Node.js and Express.js backend
- **Database**: Supports any database of choice (MongoDB recommended)
- **CRUD Operations**:
  - Create, Retrieve, Update categories, subcategories, and items
  - Search items by name
- **RESTful APIs**: Well-structured API endpoints for efficient data retrieval and manipulation

---

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (or any preferred database)

### Steps to Run Locally
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/menu-management.git
   cd menu-management
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Setup Environment Variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/menuDB
   ```
4. **Start the server**
   ```bash
   npm start
   ```
   The server will start at `http://localhost:5000`

---

## API Documentation
### **Create APIs**
#### **Create Category**
**Endpoint:** `POST /api/categories`
```json
{
  "name": "Main Course",
  "image": "https://example.com/category.jpg",
  "description": "Delicious main course items",
  "taxApplicability": true,
  "tax": 5,
  "taxType": "Percentage"
}
```
#### **Create Subcategory**
**Endpoint:** `POST /api/subcategories`
```json
{
  "name": "Vegetarian Main Course",
  "categoryId": "category_id_here",
  "image": "https://example.com/subcategory.jpg",
  "description": "Vegetarian delights",
  "taxApplicability": true,
  "tax": 5
}
```
#### **Create Item**
**Endpoint:** `POST /api/items`
```json
{
  "name": "Veg Biryani",
  "subcategoryId": "subcategory_id_here",
  "image": "https://example.com/item.jpg",
  "description": "Aromatic basmati rice with spices",
  "taxApplicability": true,
  "tax": 12,
  "baseAmount": 220,
  "discount": 10,
  "totalAmount": 210
}
```

---

### **Retrieve APIs**
#### **Get Categories**
**Endpoint:** `GET /api/categories`
#### **Get Subcategories by Category**
**Endpoint:** `GET /api/subcategories?categoryId=category_id_here`
#### **Get Items by Subcategory**
**Endpoint:** `GET /api/items?subcategoryId=subcategory_id_here`
#### **Search Items by Name**
**Endpoint:** `GET /api/items/search?name=Veg Biryani`

---

### **Update APIs**
#### **Update Category**
**Endpoint:** `PUT /api/categories/:id`
#### **Update Subcategory**
**Endpoint:** `PUT /api/subcategories/:id`
#### **Update Item**
**Endpoint:** `PUT /api/items/:id`

---

## Testing with Postman
1. Open [Postman](https://www.postman.com/)
2. Import the API collection or manually create requests
3. Use the provided API endpoints to test CRUD operations

---

## Contributing
Feel free to fork the repository, create a new branch, and submit a pull request with your improvements.

---

## License
This project is licensed under the MIT License.

