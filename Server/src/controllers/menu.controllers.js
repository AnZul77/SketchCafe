import MenuItem from "../models/Menu.js";

export const getMenuItems = async (req, res) => {
  try {
    // If admin, they might want to see unavailable items too, but let's stick to simple implementation.
    // However, if we pass a query param ?all=true we can return all.
    const filter = req.query.all ? {} : { available: true };
    const menuItems = await MenuItem.find(filter);
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, available } = req.body;
    const newItem = new MenuItem({ name, description, price, category, imageUrl, available });
    await newItem.save();
    res.status(201).json({ message: "Menu item created successfully", item: newItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { name, description, price, category, imageUrl, available } = req.body;
    const updatedItem = await MenuItem.findByIdAndUpdate(
      itemId,
      { name, description, price, category, imageUrl, available },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json({ message: "Menu item updated", item: updatedItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const deletedItem = await MenuItem.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
