// Central icon registry – maps string names to lucide-react components.
// Used across ProductCard, CategoryBar, CartDrawer, Hero, etc.
import {
  Beef,
  Fish,
  Pizza,
  Cookie,
  IceCream,
  Sandwich,
  CakeSlice,
  GlassWater,
  Coffee,
  Leaf,
  Salad,
  UtensilsCrossed,
  Utensils,
  ChefHat,
  LayoutGrid,
  Wine,
  Drumstick,
  Candy,
  Croissant,
  Grape,
  Cherry,
  Sprout,
  Citrus,
  Star,
  Flame,
  Sparkles,
  PartyPopper,
  Bike,
  ShoppingBag,
  Check,
  Package,
  Snowflake,
  Soup,
} from "lucide-react";

export const iconMap = {
  Beef,
  Fish,
  Pizza,
  Cookie,
  IceCream,
  Sandwich,
  CakeSlice,
  GlassWater,
  Coffee,
  Leaf,
  Salad,
  UtensilsCrossed,
  Utensils,
  ChefHat,
  LayoutGrid,
  Wine,
  Drumstick,
  Candy,
  Croissant,
  Grape,
  Cherry,
  Sprout,
  Citrus,
  Star,
  Flame,
  Sparkles,
  PartyPopper,
  Bike,
  ShoppingBag,
  Check,
  Package,
  Snowflake,
  Soup,
};

/**
 * Resolves an icon name string to a lucide component and renders it.
 * Falls back to UtensilsCrossed if the icon name is not found.
 */
export function FoodIcon({ name, className }) {
  const Icon = iconMap[name] ?? UtensilsCrossed;
  return <Icon className={className} />;
}
