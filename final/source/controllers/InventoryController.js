const { param } = require('jquery');
const inventoryModel = require('../models/Inventory');
const inventoryDetailModel = require('../models/InventoryDetail');
const importModel = require('../models/Import');
const exportModel = require('../models/Export');

class InventoryController {
  static async getAllInventories(req, res) {
    try {
      var liststatus;
        const importStatus = await importModel.getImportStatusNearly();
        const exportStatus = await exportModel.getExportStatus();
        const markedImportStatus = importStatus.map(status => ({ type: 'import', ...status }));
        const markedExportStatus = exportStatus.map(status => ({ type: 'export', ...status }));
        const combinedStatusList = [...markedImportStatus, ...markedExportStatus];
        combinedStatusList.sort((a, b) => new Date(a.Date) - new Date(b.Date));
        liststatus = combinedStatusList;
      const inventories = await inventoryModel.getAllInventories();
      const StatusCapacity = await inventoryModel.getStatusCapacityInventory();
      const QuantityProduct = await inventoryModel.getQuantityProductInventory();
  
      res.render('warehouse', {
        inventories: inventories,
        StatusCapacity: Number(StatusCapacity.StatusCapacity.toFixed(2)),
        QuantityProduct: QuantityProduct.QuantityProduct,
        liststatus: liststatus
      });
      // res.status(200).json( {
      //   inventories: inventories,
      //   StatusCapacity: Number(StatusCapacity.StatusCapacity.toFixed(2)),
      //   QuantityProduct: QuantityProduct.QuantityProduct,
      //   liststatus: liststatus
      // });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
static async findProductInInventory(req, res) {
  const {InventoryName , Barcode, Quantity} = req.params;
  try {
    const result = await inventoryDetailModel.findProductInInventoryDetails(InventoryName,Barcode,Quantity);
    if(!result) {
      return res.status(200).json({ success: false, message: 'Ô hàng không tồn tại hoặc sản phẩm không có hoặc không đủ để bạn xuất kho trong ô hàng' });
    }
    return res.status(200).json({ success: true ,data : result});
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}
static async findInventoryByName(req, res) {
  const  nameInventory = req.params.name;
  try {
    const inventories = await inventoryModel.findInventoryByName(nameInventory);
    if(!inventories){
    return  res.status(200).json({ success: false, message: 'Inventory not found'});
     }else{
     return res.status(200).json({ success: true, data: inventories });
     }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
static async getAllProductInInventoryByID(req, res) {
    
    const inventoryId = req.params.inventoryId;
    try {
      const inventoryDetailsData = await inventoryDetailModel.getAllProductInInventoryByID(inventoryId);
   return  res.status(200).json({
        success: true,
       data: inventoryDetailsData
      });
    } catch (error) {
      console.error('Error:', error);
      return  res.status(500).json({ error: 'Internal Server Error' });
    }
  }
    static async getInventoryById(req, res) {
        const inventoryId = req.body.inventoryId;
        try {
        const inventory = await inventoryModel.getInventoryById(inventoryId);
        res.status(200).json(inventory);
        } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async addInventory(req, res) {
        const inventoryData = req.body;
        try {
        const newInventoryId = await inventoryModel.addInventory(inventoryData);
        res.status(201).json({ success: true, inventoryId: newInventoryId });
        } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }
    static async updateInventory(req, res) {
    const inventoryId = req.body.inventoryId;
    const updatedInventoryData = req.body;
    try {
      const success = await inventoryModel.updateInventory(inventoryId, updatedInventoryData);
      if (success) {
        res.status(200).json({ success: true, message: 'Inventory updated successfully' });
      } else {
        res.status(404).json({ success: false, message: 'Inventory not found or not updated' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
    static async deleteInventory(req, res) {
    const inventoryId = req.body.inventoryId;
    try {
      const success = await inventoryModel.deleteInventory(inventoryId);
      if (success) {
        res.status(200).json({ success: true, message: 'Inventory deleted successfully' });
      } else {
        res.status(404).json({ success: false, message: 'Inventory not found or not deleted' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
}

module.exports = InventoryController;
