const CategoryModel = require('../models/Category');

class CategoryController {
  static getAddCategoryPage(req,res) 
  {
    res.render('addcategory');
  }
  static async getEditCategoryPage(req,res) 
  {
    const categoryId = req.params.categoryId;
    try {
   
   const  category =  await CategoryModel.getCategoryById(categoryId);
      console.log(category);
   return res.render('editcategory', { category:category});

    } catch (error) {
      console.error('Error:', error);
      return   res.status(500).send('Internal Server Error');
    }

  }

  static async getAllCategories(req, res) {
    try {
      const categories = await CategoryModel.getAllCategories();
      console.log(categories);

      res.render('categorylist', { categories:categories
      
        });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async getCategoryById(req, res) {
    const categoryId = req.params.categoryId;
    try {
      const category = await CategoryModel.getCategoryById(categoryId);
      if (!category) {
        res.status(404).json({ message: 'Category not found' });
      } else {
        res.status(200).json(category);
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async addCategory(req, res) {
    const categoryData = req.body;
    try {
      const categoryId = await CategoryModel.addCategory(categoryData);
      return res.status(201).json({ 
        success: true,
        message: 'Category added successfully',
       });
    } catch (error) {
      console.error('Error:', error);
      return res.status(201).json({ 
        success: true,
        message: 'Category added failed',
       });    }
  }

  static async updateCategory(req, res) {
    const categoryId = req.body.categoryId;
    const updatedCategoryData = req.body;
    try {
      const result = await CategoryModel.updateCategory(categoryId, updatedCategoryData);
      if (result) {
        res.status(200).json({ success: true, message: 'Category updated successfully' });
      } else {
        res.status(404).json({ success: false, message: 'Category not found' });
      }
    } catch (error) {
      return res.status(201).json({ 
        success: true,
        message: 'Category update failed',
       });        res.status(500).send('Internal Server Error');
    }
  }

  static async deleteCategory(req, res) {
    const categoryId = req.params.categoryId;
    try {
      const result = await CategoryModel.deleteCategory(categoryId);
      if (result) {
        res.status(200).json({ success: true, message: 'Category deleted successfully' });
      } else {
        res.status(404).json({ success: false, message: 'Category not found' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = CategoryController;
