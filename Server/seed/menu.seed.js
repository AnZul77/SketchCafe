import mongoose from "mongoose";
import dotenv from "dotenv";

import MenuItem from "../src/models/Menu.js";

dotenv.config();

const menuItems = [
  // espresso
  {
    name: "The Roman Morning",
    price: 180,
    description: "Our signature blend espresso. High intensity with a charcoal finish.",
    category: "espresso",
    imageUrl: "/assets/menu_espresso.png"
  },
  {
    name: "The Architect's Pull",
    price: 220,
    description: "Double shot, precision-tamped. Notes of golden ochre and hazelnut.",
    category: "espresso",
    imageUrl: "/assets/menu_espresso.png"
  },
  {
    name: "Trastevere Mist",
    price: 240,
    description: "Steam-infused ristretto with a hint of local lemon zest.",
    category: "espresso",
    imageUrl: "/assets/menu_espresso.png"
  },
  // brewed
  {
    name: "Alleyway V60",
    price: 260,
    description: "Slow drip through handmade ceramic. Clear, poetic, lingering.",
    category: "brewed",
    imageUrl: "/assets/menu_brewed.png"
  },
  {
    name: "Charcoal Steep",
    price: 230,
    description: "Overnight cold brew. Deep, dark, and resilient.",
    category: "brewed",
    imageUrl: "/assets/menu_brewed.png"
  },
  // signatures
  {
    name: "The Vicolo Gold",
    price: 320,
    description: "Ochre-infused syrup, velvety oat milk, and a dusting of dark cocoa.",
    category: "signatures",
    imageUrl: "/assets/menu_signature.png"
  },
  {
    name: "Inked Affogato",
    price: 360,
    description: "House vanilla bean gelato drowned in our Ristretto Nero.",
    category: "signatures",
    imageUrl: "/assets/menu_signature.png"
  }
];

const seedMenu = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await MenuItem.deleteMany();

  await MenuItem.insertMany(menuItems);

  console.log("Menu seeded successfully");

  mongoose.connection.close();
};

seedMenu().catch((error) => {
  console.log(error);
});
