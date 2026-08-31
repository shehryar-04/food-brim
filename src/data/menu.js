import menuData from "./menu.json";
import food1 from "../assets/food/food-1.jpg";
import food2 from "../assets/food/food-2.jpg";
import food3 from "../assets/food/food-3.jpg";

const imageMap = {
  food1,
  food2,
  food3,
};

export const categories = menuData.categories;

export const menuItems = menuData.items.map((item) => ({
  ...item,
  image: imageMap[item.imageKey] || food1,
}));

