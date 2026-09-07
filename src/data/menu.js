import menuData from "./menu.json";
import food1 from "../assets/food/food-1.jpg";
import food2 from "../assets/food/food-2.jpg";
import food3 from "../assets/food/food-3.jpg";

const imageMap = {
  food1,
  food2,
  food3,
};

// Food photography assets for each menu item from design_assets
export const itemImages = {
  // Brim Frozen
  1: "/design_assets/Frozen_chicken_samosas_on_counter_202609071733.jpeg", // Chicken Samosa
  2: "/design_assets/Frozen_chicken_rolls_on_board_202609071733.jpeg", // Chicken Rolls
  3: "/design_assets/Frozen_chicken_parathas_stacked_202609071733.jpeg", // Chicken Paratha
  4: "/design_assets/Frozen_shami_kababs_on_platter_202609071733.jpeg", // Shami Kabab

  // Brim Bites
  5: "/design_assets/Spicy_chicken_momos_in_steamer_202609071733.jpeg", // Classic Spicy Chicken Momos
  6: "/design_assets/Tandoori_momos_served_with_chutney_202609071733.jpeg", // Tandoori Momos
  7: "/design_assets/Kurkure_Momos_on_slate_platter_202609071733.jpeg", // Kurkure Momos
  8: "/design_assets/Special_loaded_fries_served_202609071733.jpeg", // Special Loaded Fries

  // Brim Desi
  9: "/design_assets/Hyderabadi_Chicken_Biryani_in_handi_202609071733.jpeg", // Hyderabadi Chicken Biryani
  10: "/design_assets/Chicken_Nihari_served_with_naan_202609071733.jpeg", // Slow-Cooked Chicken Nihari
  11: "/design_assets/Beef_Shahi_Haleem_in_bowl_202609071733.jpeg", // Beef Shahi Haleem
  12: "/design_assets/Sarson_ka_Saag_and_roti_202609071732.jpeg", // Sarson ka Saag

  // Brim Meetha
  13: "/design_assets/Kheer_served_in_clay_pot_202609071732.jpeg", // Maa k Hath ki Kheer
  14: "/design_assets/Dessert_cup_with_layers_202609071732.jpeg", // Mango / Strawberry Delight
  15: "/design_assets/Box_of_chocolate_brownies_202609071732.jpeg", // Choco Brownies
};

export const categories = menuData.categories;

export const menuItems = menuData.items.map((item) => ({
  ...item,
  image: itemImages[item.id] || itemImages[item.name] || imageMap[item.imageKey] || food1,
  fallbackImage: imageMap[item.imageKey] || food1,
}));


