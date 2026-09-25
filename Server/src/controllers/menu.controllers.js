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

const getDefaultImage = (category) => {
  if (category === "espresso") return "/assets/menu_espresso.png";
  if (category === "brewed") return "/assets/menu_brewed.png";
  return "/assets/menu_signature.png";
};

export const addMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, available } = req.body;
    if (!name || price === undefined || !category) {
      return res.status(400).json({ message: "Name, price, and category are required" });
    }

    const finalImageUrl = (imageUrl && typeof imageUrl === "string" && imageUrl.trim()) 
      ? imageUrl.trim() 
      : getDefaultImage(category);

    const newItem = new MenuItem({
      name: name.trim(),
      description: description ? description.trim() : "",
      price: Number(price),
      category: category.toLowerCase().trim(),
      imageUrl: finalImageUrl,
      available: available !== undefined ? Boolean(available) : true,
    });
    await newItem.save();
    res.status(201).json({ message: "Menu item created successfully", item: newItem });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to create menu item" });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { name, description, price, category, imageUrl, available } = req.body;

    const finalImageUrl = (imageUrl && typeof imageUrl === "string" && imageUrl.trim()) 
      ? imageUrl.trim() 
      : getDefaultImage(category);

    const updatedItem = await MenuItem.findByIdAndUpdate(
      itemId,
      {
        name: name ? name.trim() : undefined,
        description: description ? description.trim() : undefined,
        price: price !== undefined ? Number(price) : undefined,
        category: category ? category.toLowerCase().trim() : undefined,
        imageUrl: finalImageUrl,
        available: available !== undefined ? Boolean(available) : undefined,
      },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json({ message: "Menu item updated", item: updatedItem });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to update menu item" });
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
