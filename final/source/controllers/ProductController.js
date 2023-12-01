const sendEmail = require('../middleware/sendemail');
const product = require('../models/Product');
const Category = require('../models/Category');
const InventoryDetails = require('../models/InventoryDetail');
class ProductController {
  
    static async getProducts(req,res){
        const page = req.query.page || 1;
        const per_page = 10;

        try {
            const products = await product.getAllProducts(page*per_page-per_page,per_page);
            const url = "/product?page="

            res.render('productlist', { products:products ,page:page,url:url });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    static async getProductsSearch(req,res){

        try {
            const products = await product.getAllProductSearch();
            

           res.status(200).json({ data: products});
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    static async deleteProduct(req,res){
        const productID = req.params.productID;
        try {
            const result = await product.deleteProduct(productID);
            if(result.success){
                res.status(200).json({
                    success: true,
                    message: 'Product delete succcess',
                });
            }else{
                res.status(401).json({
                    success: false,
                    message: 'Product delete failed',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    static async getPageAddProduct(req,res){
        const categories = await Category.getAllCategories();
        res.render('addproduct', { categories:categories})
    }
    static async searchProducts(req,res){
        const search = req.query.search;
        const page = req.query.page || 1;
        const per_page = 10;

        try {
            const products = await product.searchProducts(search,page*per_page-per_page,per_page);
            const url = "/product/search?search="+search+"&page="
            console.log(products);

            res.render('productlist', { products:products ,page:page,url:url});
        } catch (error) {
             console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async addProduct(req, res){
        const ProductData = req.body;
        try {
            const result = await product.addProduct(ProductData);
            if(!result.success) {
                console.error('Product add failed:', result);
                res.status(401).json({
                    success: false,
                    message: 'Product add failed',
                });
            }else{
                console.error('Product add success');
                res.status(200).json({
                    success: true,
                    message: 'Product add succcess',
                });
            }

        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }   
    }
    static async getEditPageProduct(req, res){
        const productID = req.params.productID;
        try {
        const categories = await Category.getAllCategories();

            const result = await product.getProductByID(productID);
         return   res.render('editproduct', { product:result,categories:categories});
            
        } catch (error) {
            console.error('Error:', error);
            return  res.status(500).send('Internal Server Error');
        }
    }
    static async getProductByID(req,res){
        const productID = req.params.productID;
        try {
            const result = await product.getProductByID(productID);
            const barcode = result.Barcode;
            const Inventorys = await InventoryDetails.getAllInventoriesByProduct(barcode);
                 res.render('product-details', { product:result ,Inventorys:Inventorys});
               // res.status(200).json( { product:result ,Inventorys:Inventorys});

        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    static async updateProduct(req,res){
        const productId = req.body.productID;
        const productData = req.body;
        console.log(productData);

        try {
            const result = await product.updateProduct(productId, productData);
                console.log(result);
            if(result.success){
            
                return   res.status(200).json({
                    success: true,
                    message: 'Product updatge succcess',
                });

             }else{
                return    res.status(401).json({
                    success: false,
                    message: 'Product updatge failed',
                });
             }
        } catch (error) {
            console.error('Error:', error);
            return    res.status(500).send('Internal Server Error');
        }
    }

}
module.exports = ProductController;
