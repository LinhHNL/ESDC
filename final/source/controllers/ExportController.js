const ExportModel = require('../models/Export');
const ExportDetailModel = require('../models/ExportDetails');
const Inventory = require('../models/Inventory');
const ProductModel = require('../models/Product');
const InventoryDetail = require('../models/InventoryDetail');

class ExportController {
  static async getExportDetailsById(req, res) {
    const ExportId = req.params.ExportID;
    try {
      const resultExport = await ExportModel.getExportById(ExportId);
      if(!resultExport) {
        return res.status(200).json({success: false, message: 'Không tìm thấy phiếu xuất kho'});
      }

      const resultExportDetail = await ExportDetailModel.getExportDetailsByExportID(ExportId);
      res.render('exportdetails',{
        success: true,
        message: 'Export details retrieved successfully',
        exportDetail: resultExportDetail,
        export: resultExport,
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  static async searchExport(req,res){
    const search = req.query.search;
    try {
      const {page = 1} = req.query;
      const per_page = 3;
      const Exports = await ExportModel.searchExport(search,page,per_page);

      // res.status(200).json(Exports);
      res.render('stockreceivinglist', { export:Exports ,
      page,
    url:"export/search?search="+search+"&"})
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  static async ExportProduct(req, res) {
    const data = req.body;
    try {
        const Employee_ID = 17;
        const resultAddNewExport = await ExportModel.addExport(Employee_ID);
        if(!resultAddNewExport) {
          return res.status(200).json({success: false, message: "Có lỗi xảy ra khi thêm xuất kho mới"});
        }
        const dataExportResult= []
        for (const iterator of data) {
          console.log(iterator);
          const resultAddNewExportDetail = await ExportDetailModel.addExportDetails({
            Export_ID: resultAddNewExport,
            Product_ID: iterator.Product_ID,
            Quantity: iterator.Quantity,
            Inventory_ID: iterator.Inventory_ID
          });
            if(!resultAddNewExportDetail) {
              dataExportResult.push(
                {success: false, 
                  message: 
                  "Không thể Xuất kho sản phẩm có mã vạch: " 
                  + iterator.ProductName + 
                  " với số lượng: " + 
                  iterator.Quantity+ 
                  " vào Box: " 
                  + iterator.InventoryName         
                });
             
            }
          }
          return res.status(200).json({success: true, message: "Xuất kho thành công", data: dataExportResult});
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  static async requestExportProduct(req, res) {
      const barcode = req.body.Barcode;
      let Quantity = req.body.Quantity;
      console.log(barcode);
      console.log(Quantity);

    try {
      let Product = await ProductModel.getProductByBarcode(barcode);
      if (Product.Quantity < Quantity) {
        return res.status(200).json( { success :false, message: "Hàng hóa trong kho không đủ để xuất hàng theo yêu cầu của bạn" });
      }
      let inventoriesByProduct =await InventoryDetail.getAllInventoriesByProduct(barcode)
    
      // let invenAvai = inventoriesByProduct.filter(items => items.Quantity >= Quantity);
      // if(invenAvai.length != 0){
      //   return res.status(200).json({success:true, message: "Product available",data: invenAvai[0] });
      // }
      if(inventoriesByProduct.length === 0){
        return res.status(200).json( { success :false, message: "Hàng hóa trong kho không đủ để xuất hàng theo yêu cầu của bạn" });

      }
      let result = [] ;

      for (const iterator of inventoriesByProduct) {
          if(Quantity===0){
            break;
          }
          let exportQuantity = Quantity - iterator.Quantity >=0 ? iterator.Quantity : Quantity;
          Quantity = Quantity - iterator.Quantity >=0 ? Quantity - iterator.Quantity : 0

          result.push(
            {
              Inventory_ID: iterator.Inventory_ID,
              InventoryName: iterator.InventoryName,
              Date: iterator.Date,
              Import_ID: iterator.Import_ID,
              Quantity: exportQuantity,
            }
          );
       
      }
      return res.status(200).json({success:true, message: "Product available",data: result ,Product: Product});
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  }
  //End
  static async getAllExports(req, res) {
    try {
      const {page = 1} = req.query;
      const per_page = 3;
      const Export = await ExportModel.getAllExports(page,per_page);

      // res.status(200).json(Export);
      res.render('export-list', { exports:Export ,
      page,
      url:"export?"})
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  }




  static async addExport(req, res) {
    const exportData = req.body;
    try {
      const result = await ExportModel.addExport(exportData);
      res.status(200).json({
        success: true,
        message: 'Export added successfully',
        exportId: result,
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async updateExport(req, res) {
    const exportId = req.params.exportId;
    const updatedExportData = req.body;
    try {
      const result = await ExportModel.updateExport(exportId, updatedExportData);
      if (result) {
        res.status(200).json({
          success: true,
          message: 'Export updated successfully',
        });
      } else {
        res.status(401).json({
          success: false,
          message: 'Export update failed',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async deleteExport(req, res) {
    const exportId = req.params.exportId;
    try {
      const result = await ExportModel.deleteExport(exportId);
      if (result) {
        res.status(200).json({
          success: true,
          message: 'Export deleted successfully',
        });
      } else {
        res.status(401).json({
          success: false,
          message: 'Export deletion failed',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = ExportController;
