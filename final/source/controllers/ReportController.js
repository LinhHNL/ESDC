const ImportModel = require('../models/Import');
const ExportModel = require('../models/Export');
const ImportDetailModel = require('../models/ImportDetails');
const Inventory = require('../models/Inventory');
const ProductModel = require('../models/Product');
const InventoryDetail = require('../models/InventoryDetail');
const { query } = require('express');
class ReportController {
    static async ReportStatusOfProduct(req, res) {
        try {
            const productMinQuantity = await ProductModel.getAllProductsMaxQuantity();
            const productMaxQuantity = await ProductModel.getAllProductsMinQuantity();
            // return res.render('report', { productMinQunanitty: productMinQunanitty, productMaxQunanitty: productMaxQunanitty });
            return res.render('reportStatus',{ productMinQuantity: productMinQuantity, productMaxQuantity: productMaxQuantity });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    static async getTopProductImport(req, res) {
        const day = req.query.day;
        const year = req.query.year;
        const month = req.query.month;
        const page = req.query.page || 1;
        const per_page = 10;
        try {
            
            const totalImport = await ImportModel.getTotalImport(day, month, year);
            console.log(totalImport);
            const topProductImport = await ImportModel.getTopProductImport(day, month, year,page ,per_page);
            let url = "/report/topImport?"
            if(day){
                url += "day="+day+"&";
            }
            if(month){
                url += "month="+month+"&";
            }
            if(year){
                url += "year="+year+"&";
            }
            url += "page=";
            return res.render('reportImport',{
                totalImport:totalImport,
                topProductImport:topProductImport,
                page : page,
                url : url
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');

        }
    }
    static async getTopProductExport(req, res) {
        const day = req.query.day;
        const year = req.query.day;
        const month = req.query.day;
        const page = req.query.page || 1;
        const per_page = 10;
        try {
            const totalExport = await ExportModel.getTotalExport(day, month, year);
            const topProductExport = await ExportModel.getTopProductExport(day, month, year,page ,per_page);
            console.log(topProductExport);
            let url = "/report/topExport?"
            if(day){
                url += "day="+day+"&";
            }
            if(month){
                url += "month="+month+"&";
            }
            if(year){
                url += "year="+year+"&";
            }
            url += "page=";
            return res.render('reportExport',
                {totalExport:totalExport,topProductExport:topProductExport,
                page : page,
                url : url});
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    

}
module.exports = ReportController;