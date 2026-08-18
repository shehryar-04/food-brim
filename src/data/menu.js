import food1 from "../assets/food/food-1.jpg";
import food2 from "../assets/food/food-2.jpg";
import food3 from "../assets/food/food-3.jpg";

export const categories = [
  { id: "all", name: "All", iconName: "LayoutGrid" },
  { id: "biryani", name: "Biryani", iconName: "Soup" },
  { id: "rice", name: "Rice", iconName: "ChefHat" },
  { id: "chicken", name: "Chicken", iconName: "Flame" },
  { id: "sides", name: "Sides", iconName: "UtensilsCrossed" },
  { id: "drinks", name: "Drinks", iconName: "Coffee" },
  { id: "combos", name: "Combos", iconName: "Package" },
];

export const menuItems = [
  // ─── BIRYANI ──────────────────────────────────────────────────────────────
  {
    id: 1,
    category: "biryani",
    category_id: "biryani",
    name: "Special Hyderabadi Chicken Biryani",
    description: "Fragrant basmati rice layered with juicy marinated chicken, saffron, caramelised onions, and fresh mint. Cooked to perfection in a sealed clay pot.",
    price: 650,
    rating: 5.0,
    reviews: 545,
    portion: "Single Serving | 500g",
    calories: 680,
    tags: ["Biryani", "Desi", "Bestseller"],
    image: food2, // Pot/biryani portrait photo
    is_available: true,
    is_popular: true,
    highlights: ["Slow Cooked", "Fragrant Saffron", "Tender Chicken"]
  },
  {
    id: 2,
    category: "biryani",
    category_id: "biryani",
    name: "Premium Beef Shahi Biryani",
    description: "Richly spiced beef shank layered with premium long-grain rice, infused with traditional spices and slow-steamed for ultimate tenderness.",
    price: 780,
    rating: 4.9,
    reviews: 328,
    portion: "Single Serving | 550g",
    calories: 740,
    tags: ["Biryani", "Beef", "Premium"],
    image: food1, // Square food/biryani photo
    is_available: true,
    is_popular: true,
    highlights: ["Shank Meat", "Aromatic Spices", "Rich Flavor"]
  },

  // ─── RICE ─────────────────────────────────────────────────────────────────
  {
    id: 3,
    category: "rice",
    category_id: "rice",
    name: "Aromatic Zafran Pulao",
    description: "Light, fragrant basmati rice cooked in chicken broth, infused with high-grade saffron threads and garnished with roasted almonds.",
    price: 420,
    rating: 4.7,
    reviews: 114,
    portion: "Regular Bowl | 400g",
    calories: 410,
    tags: ["Rice", "Saffron", "Light"],
    image: food1,
    is_available: true,
    highlights: ["Real Saffron", "Almond Garnish", "Chicken Broth Cooked"]
  },
  {
    id: 4,
    category: "rice",
    category_id: "rice",
    name: "Egg Fried Rice",
    description: "Premium wok-tossed basmati rice with scrambled eggs, fresh green scallions, carrots, and a dash of white pepper.",
    price: 380,
    rating: 4.6,
    reviews: 98,
    portion: "Regular Bowl | 400g",
    calories: 450,
    tags: ["Chinese", "Rice", "Classic"],
    image: food1,
    is_available: true,
    highlights: ["Wok Fried", "Fresh Veggies", "Light Soy Touch"]
  },

  // ─── CHICKEN ──────────────────────────────────────────────────────────────
  {
    id: 5,
    category: "chicken",
    category_id: "chicken",
    name: "Fiery Tandoori Chicken Tikka",
    description: "Juicy chicken leg marinated in yogurt and red-hot spices, skewered and charred to smoky perfection in our traditional tandoor.",
    price: 490,
    rating: 4.8,
    reviews: 289,
    portion: "1 Leg Quarter",
    calories: 340,
    tags: ["Chicken", "Spicy", "Smoky"],
    image: food2,
    is_available: true,
    is_popular: true,
    highlights: ["Smoky Char", "Yogurt Marinade", "Freshly Grilled"]
  },
  {
    id: 6,
    category: "chicken",
    category_id: "chicken",
    name: "Chicken Karahi (Brim Style)",
    description: "Diced chicken wok-cooked with fresh tomatoes, ginger, garlic, and freshly crushed black pepper. Garnished with coriander and green chilies.",
    price: 890,
    rating: 4.9,
    reviews: 412,
    portion: "Half Handi | 500g",
    calories: 580,
    tags: ["Chicken", "Desi", "Spicy"],
    image: food2,
    is_available: true,
    highlights: ["Fresh Tomatoes", "Ginger Juliennes", "Wok Stirred"]
  },

  // ─── SIDES ────────────────────────────────────────────────────────────────
  {
    id: 7,
    category: "sides",
    category_id: "sides",
    name: "Crispy Samosa Platter",
    description: "Our signature ready-to-eat triangular pastries stuffed with spiced chicken filling. Extremely crispy outside and juicy inside.",
    price: 250,
    rating: 4.7,
    reviews: 186,
    portion: "4 Pieces",
    calories: 310,
    tags: ["Sides", "Crispy", "Snack"],
    image: food3, // Delivery box / snacks portrait
    is_available: true,
    highlights: ["Extra Crispy", "Spiced Minced Filling", "With Mint Chutney"]
  },
  {
    id: 8,
    category: "sides",
    category_id: "sides",
    name: "Brim Cheese Loaded Fries",
    description: "Golden crisp French fries drenched in rich liquid cheddar, topped with shredded chicken tikka chunks and jalapeño slices.",
    price: 390,
    rating: 4.8,
    reviews: 224,
    portion: "350g Sharing Box",
    calories: 620,
    tags: ["Sides", "Cheesy", "Fries"],
    image: food3,
    is_available: true,
    highlights: ["Liquid Cheddar", "Spicy Jalapenos", "Shredded Tikka"]
  },
  {
    id: 9,
    category: "sides",
    category_id: "sides",
    name: "Mint Raita & Salad Cup",
    description: "Cool, whipped yogurt blend with fresh mint and roasted cumin, served alongside a crisp cucumber-tomato salad cup.",
    price: 120,
    rating: 4.9,
    reviews: 310,
    portion: "200ml Cup",
    calories: 80,
    tags: ["Sides", "Cool", "Fresh"],
    image: food1,
    is_available: true,
    highlights: ["Whipped Yogurt", "Fresh Mint", "Crisp Veggies"]
  },

  // ─── DRINKS ───────────────────────────────────────────────────────────────
  {
    id: 10,
    category: "drinks",
    category_id: "drinks",
    name: "Premium Mango Lassi",
    description: "Rich, creamy whipped yogurt drink made with sweet premium Alphonso mangoes and cardamom extract. Served chilled.",
    price: 180,
    rating: 4.9,
    reviews: 175,
    portion: "300ml Glass",
    calories: 220,
    tags: ["Drinks", "Sweet", "Creamy"],
    image: food1,
    is_available: true,
    highlights: ["Alphonso Mango", "Chilled Yogurt", "Cardamom Twist"]
  },
  {
    id: 11,
    category: "drinks",
    category_id: "drinks",
    name: "Brim Special Soft Drink",
    description: "Classic cola served ice-cold with a fresh lemon wedge to perfectly balance out a rich biryani meal.",
    price: 80,
    rating: 4.5,
    reviews: 90,
    portion: "250ml Can",
    calories: 140,
    tags: ["Drinks", "Cold"],
    image: food1,
    is_available: true,
    highlights: ["Ice Chilled", "Fresh Lemon Wedge"]
  },

  // ─── COMBOS ───────────────────────────────────────────────────────────────
  {
    id: 12,
    category: "combos",
    category_id: "combos",
    name: "Single Biryani Feasting Box",
    description: "1x Special Hyderabadi Chicken Biryani + 1x Chicken Tikka Leg + 1x Mint Raita & Salad Cup + 1x Soft Drink Can. Perfectly packed in our premium heat-insulated box.",
    price: 1150,
    rating: 5.0,
    reviews: 642,
    portion: "Complete Meal Box",
    calories: 1160,
    tags: ["Combos", "Bestseller", "Save Big"],
    image: food3, // Heat insulated delivery box packaging
    is_available: true,
    is_popular: true,
    highlights: ["Complete Meal", "Insulated Delivery Box", "Best Value"]
  },
  {
    id: 13,
    category: "combos",
    category_id: "combos",
    name: "Brim Family Feast Box",
    description: "2x Hyderabadi Chicken Biryani + 1x Chicken Karahi (Half) + 4x Plain Naan + 1x Samosa Platter + 2x Mint Raita & Salad Cups + 1x 1.5L Soft Drink.",
    price: 2650,
    rating: 4.9,
    reviews: 185,
    portion: "Feeds 3-4 People",
    calories: 2800,
    tags: ["Combos", "Family Size", "Mega Value"],
    image: food3,
    is_available: true,
    highlights: ["Feeds 3-4", "Huge Variety", "Premium Presentation"]
  }
];
