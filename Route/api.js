const express = require('express');
const router = express.Router();
const itemController = require('../Controller/ItemController');
const billController = require('../Controller/billController');
const salesController=require("../Controller/SalesController")
// Item routes
router.post('/items', itemController.addItem);

// Bill routes
router.post('/bills', billController.createBill);
router.get('/bills', billController.getAllBills);
//Sales Route
router.get('/sales', salesController.getSalesData);

module.exports = {router};
