

const { Bill } = require("../Model/bill");
const { Item } = require("../Model/item");
const {Sales} = require("../Model/sales");


const createBill = async (req, res) => {
    const { items } = req.body;
  //hi
    try {
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Invalid input. Items array is required.' });
          }
      const itemsDetails = await Item.find({ name: { $in: items.map(item => item.name) } });
  
    
      if (itemsDetails.length !== items.length) {
        return res.status(400).json({ error: 'One or more items not found' });
      }
  
 
      const totalCost = items.reduce((total, item) => {
        const itemDetails = itemsDetails.find(i => i.name === item.name);
        if (!itemDetails) {
          throw new Error(`Item details not found for ${item.name}`);
        }
        return total + itemDetails.price * item.quantity;
      }, 0);
  
      const newBill = new Bill({ items, totalCost, date: new Date() });
      await newBill.save();
      //Update the sales hear
      const salesData = await Sales.findOne();
    if (salesData) {
      salesData.totalRevenue += totalCost;
      salesData.numberOfSales += 1;
      await salesData.save();
    } else {
      // Create initial sales data if not present (this may happen on the first bill)
      const initialSalesData = new Sales({ totalRevenue: totalCost, numberOfSales: 1 });
      await initialSalesData.save();
    }
      res.status(201).json(newBill);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createBill, getAllBills };

