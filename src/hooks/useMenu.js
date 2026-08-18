import { useState, useEffect } from "react";
import { categories as localCategories, menuItems as localMenuItems } from "../data/menu";
import { iconMap } from "../icons/iconMap";

/**
 * Hook to load menu items and categories locally.
 * Maps category iconName strings to actual lucide-react components.
 */
export function useMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating a fast local load to match loading transitions if needed,
    // or resolving immediately.
    try {
      const mappedCategories = localCategories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        Icon: iconMap[cat.iconName] ?? iconMap.UtensilsCrossed,
      }));

      setCategories(mappedCategories);
      setMenuItems(localMenuItems);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to load local menu.");
      setLoading(false);
    }
  }, []);

  return { menuItems, categories, loading, error };
}
