const ImportModel = require('../models/Import');
const ImportDetailModel = require('../models/ImportDetails');
const Inventory = require('../models/Inventory');
const ProductModel = require('../models/Product');
const InventoryDetail = require('../models/InventoryDetail');
const { query } = require('express');
class ImportController {

  static async searchImport(req,res){
    const search = req.query.search;
    try {
      const {page = 1} = req.query;
      const per_page = 3;
      const imports = await ImportModel.searchImport(search,page,per_page);

      // res.status(200).json(imports);
      res.render('stockreceivinglist', { imports:imports ,
      page,
    url:"import/search?search="+search+"&"})
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  }
    static async getImportDetailsById(req, res) {
      const importId = req.params.importID;
      try {
        const resultimport = await ImportModel.getImportById(importId);
        if(!resultimport){
          return  res.status(200).json({ success: false, message: 'Import not found'});
        }
        console.log(importId)
        const resultimportDetail = await ImportDetailModel.getImportDetailsByImportID(importId);
        res.render('stockreceiving-details',{
          success: true,
          message: 'Import details retrieved successfully',
          importDetail: resultimportDetail,
          import: resultimport,
        });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
      }
    }

    //Request Export 
    static async requestImportProduct(req,res){
      const barcode = req.body.Barcode;
      const Quantity = req.body.Quantity;
    

      try {
      let Product = await ProductModel.getProductByBarcode(barcode);
      if (!Product) {
        return res.status(404).json({ message: "Product not found" });
      }

      let listAllInventory = await Inventory.getAllInventories();
      // console.log("product"+json(Product));
      console.log("product",
       Product
      );
      // console.log("list",listAllInventory);
      listAllInventory.sort((a, b) => {
        // Extract the letter and number from the name
        const matchA = a.Name.match(/([A-Z])(\d+)/);
        const matchB = b.Name.match(/([A-Z])(\d+)/);
      
        // Compare the letters
        if (matchA[1] < matchB[1]) {
          return -1;
        }
        if (matchA[1] > matchB[1]) {
          return 1;
        }
      
        // If the letters are the same, compare the numbers
        return parseInt(matchA[2], 10) - parseInt(matchB[2], 10);
      });

        for (let inventory of listAllInventory) {
          inventory.details = await InventoryDetail.getAllProductInInventoryByID(inventory.Inventory_ID);
          inventory.score = 0;
        }
        let listInventoryAvaiQuantity = [];

        const capacity = Product.Width*Product.Length*Product.Height*Quantity;
        const Weight = Product.Weight*Quantity;
        console.log("capacity",capacity);
        console.log("Weight",Weight);
        for (let inventory of listAllInventory) {
          if(inventory.is_Full ===0 && inventory.Blank > Weight  && inventory.capacity > capacity ){
            listInventoryAvaiQuantity.push(inventory);
          }
        }
      // console.log("avai",listInventoryAvaiQuantity);

        if(listInventoryAvaiQuantity.length ==1){
          let { Inventory_ID, Name } = listInventoryAvaiQuantity[0];

          return res.status(200).json({
            success: true,
            message: 'Export request successfully',
            result: { Inventory_ID, Name },
            type: 1 
          });
        }
        if(listInventoryAvaiQuantity.length >1){
        
          for(let inventory of listInventoryAvaiQuantity) {
            const hasProduct = inventory.details.some(detail => detail.Product_ID === Product.Product_ID);
              if(hasProduct){
                inventory.score +=2;
              }else{
                const hasCategory = inventory.details.some(detail => detail.Category_ID === Product.Category_ID);
                  if(hasCategory){
                  inventory.score +=1;
                  }
              }
                  if(inventory.Max_Weight===inventory.Blank){
                    let tempName = inventory.Name.match(/([A-Z])(\d+)/);                      
                    let numberName = parseInt(tempName[2], 10);
                    const tempNumberName = [-1,1,100,-100,+99,+101,-99,-101];
                    for(let t of tempNumberName){
                      const tempInventory = listInventoryAvaiQuantity.find(inven => inven.Name === tempName[1]+(numberName+t).toString());
                      if(tempInventory){
                        if(hasProduct){
                          inventory.score +=0.2;
                        }else{
                          const hasCategory = inventory.details.some(detail => detail.Category_ID === Product.Category_ID);
                            if(hasCategory){
                            inventory.score +=0.2;
                            }
                        }
                      }
                    }


                  }
            }
            listInventoryAvaiQuantity.sort((a, b) => {
              return b.score - a.score;
            });
            return res.status(200).json({
              success: true,
              message: 'Export request successfully',
              result: listInventoryAvaiQuantity.slice(0, 5).map(item => ({ Inventory_ID: item.Inventory_ID, Name: item.Name })),
            type: 2 
              });
          }else{
            if(Quantity > 1){
              let difference = listAllInventory.filter(x => !listInventoryAvaiQuantity.includes(x));
              difference.sort((a, b) => {
                if (a.capacity === b.capacity) {
                  // Nếu capacity giống nhau, sắp xếp theo blank
                  return b.blank - a.blank;
                }
                // Sắp xếp theo capacity
                return b.capacity - a.capacity;
              });
              let result = [];
              const capacityProduct = Product.Width*Product.Length*Product.Height*Quantity;
              for(let inventory of difference){
                if(Quantity===0){
                  break;
                }
                if(inventory.capacity >  capacityProduct && inventory.blank >  Product.Weight ){
                  let number1 = inventory.capacity/capacityProduct;
                  let number2 = inventory.blank/Product.Weight;
                  let number = Math.floor(Math.min(number1, number2));                  
                  Quantity = Quantity - number;
                  result.push({Inventory_ID: inventory.Inventory_ID, Name: inventory.Name, Quantity: number});
                
                }
              }
              return res.status(200).json({
                success: true,
                message: 'Export request successfully',
                result: result,
                type: 3 
                });
            }
          }
        

          return res.status(200).json({
            success: false,
            message: 'Inventory is full or not enough space to store product',
            });

      } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
      }
    }

  static async getAllImports(req, res) {
    try {
      const {page = 1} = req.query;
      const per_page = 3;
      const imports = await ImportModel.getAllImports(page,per_page);

      // res.status(200).json(imports);
      res.render('stockreceivinglist', { imports:imports ,
      page,
    url:"import?"})
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async getImportById(req, res) {
    const importId = req.body.importId;
    try {
      const result = await ImportModel.getImportById(importId);
      res.status(200).json({
        success: true,
        message: 'Import details retrieved successfully',
        import: result,
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async addImport(req, res) {
    const Employee_ID = req.user.userId;
    let importData = req.body;
    console.log(Employee_ID);
    console.log(importData);

    try {
        // Thêm hóa đơn nhập và nhận ImportID mới được tạo
        const importResult = await ImportModel.addImport(Employee_ID);

        if (!importResult.success) {
            return res.status(401).json({
                success: false,
                message: 'Import added failed'
            });
        }

        const newImportId = importResult.ImportId;
        
        // Thêm chi tiết nhập hàng với ImportID mới
        for (let detail of importData) {
            let product =  await ProductModel.getProductByBarcode(detail.barcode); // Thêm ProductID vào chi tiết
            detail.Import_ID = newImportId; // Thêm ImportID vào chi tiết
            detail.Product_ID = product.Product_ID; // Thêm ProductID vào chi tiết
            
     
           
            const detailResult = await ImportDetailModel.addImportDetails(detail);
                console.log(detailResult);
            }
        // Trả về kết quả
        return res.status(200).json({
            success: true,
            message: 'Import added successfully',
            importId: newImportId
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Internal Server Error');
    }
}

  static async updateImport(req, res) {
    const importId = req.body.importId;
    const updatedImportData = req.body;
    try {
      const result = await ImportModel.updateImport(importId, updatedImportData);
      if (result) {
        res.status(200).json({
          success: true,
          message: 'Import updated successfully',
        });
      } else {
        res.status(401).json({
          success: false,
          message: 'Import update failed',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async deleteImport(req, res) {
    const importId = req.body.importId;
    try {
      const result = await ImportModel.deleteImport(importId);
      if (result) {
        res.status(200).json({
          success: true,
          message: 'Import deleted successfully',
        });
      } else {
        res.status(401).json({
          success: false,
          message: 'Import deletion failed',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = ImportController;
