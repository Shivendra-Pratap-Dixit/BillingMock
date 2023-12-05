
const { Item } = require("../Model/item");

const addItem = async (req, res) => {
  const { name, price } = req.body;
  try {
    if (!name || !price || isNaN(price) || price < 0) {
        return res.status(400).json({ error: 'Invalid input. Name and price are required, and price should be a non-negative number.' });
      }
  
      const existingItem = await Item.findOne({ name });
      if (existingItem) {
        return res.status(409).json({ error: 'Item with the same name already exists.' });
      }
    const newItem = new Item({ name, price });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { addItem };
