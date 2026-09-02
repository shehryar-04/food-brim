import menuData from "./menu.json";
import food1 from "../assets/food/food-1.jpg";
import food2 from "../assets/food/food-2.jpg";
import food3 from "../assets/food/food-3.jpg";

const imageMap = {
  food1,
  food2,
  food3,
};

// Curated high-resolution food photography URLs for each menu item
export const itemImages = {
  // Brim Frozen
  1: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80", // Chicken Samosa
  2: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80", // Chicken Rolls
  3: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80", // Chicken Paratha
  4: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80", // Shami Kabab

  // Brim Bites
  5: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80", // Classic Spicy Chicken Momos
  6: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80", // Tandoori Momos
  7: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80", // Kurkure Momos
  8: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80", // Special Loaded Fries

  // Brim Desi
  9: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80", // Hyderabadi Chicken Biryani
  10: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80", // Slow-Cooked Chicken Nihari
  11: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80", // Beef Shahi Haleem
  12: "https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?auto=format&fit=crop&w=800&q=80", // Sarson ka Saag

  // Brim Meetha
  13: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80", // Maa k Hath ki Kheer
  14: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80", // Mango / Strawberry Delight
  15: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80", // Choco Brownies
};

export const categories = menuData.categories;

export const menuItems = menuData.items.map((item) => ({
  ...item,
  image: itemImages[item.id] || itemImages[item.name] || imageMap[item.imageKey] || food1,
  fallbackImage: imageMap[item.imageKey] || food1,
}));


