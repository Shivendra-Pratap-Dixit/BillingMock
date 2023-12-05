

// const {Sales} = require("../Model/sales");

const { Sales } = require("../Model/sales");

const getSalesData = async (req, res) => {
  try {
    const salesData = await Sales.findOne(); // Assuming there is only one record for overall sales
    res.status(200).json(salesData || { totalRevenue: 0, numberOfSales: 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getSalesData };
