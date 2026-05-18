import MenuItem from "../models/Menu.js";

export const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ available: true });
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
