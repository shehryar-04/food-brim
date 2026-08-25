import { create } from "zustand";
import { siteConfig } from "../data/siteConfig";
import { createWhatsAppOrder } from "../utils/whatsapp";

const useCartStore = create((set, get) => ({
  items: [],
  isCartOpen: false,
  isCheckoutOpen: false,
  orderPlaced: false,
  orderDetails: null,
  orderId: null,

  addItem: (product, qty = 1) => {
    const items = get().items;
    const existing = items.find((i) => i.id === product.id);
    if (existing) {
      set({
        items: items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        ),
      });
    } else {
      set({ items: [...items, { ...product, quantity: qty }] });
    }
  },

  removeItem: (id) => {
    set({ items: get().items.filter((i) => i.id !== id) });
  },

  incrementQuantity: (id) => {
    set({
      items: get().items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    });
  },

  decrementQuantity: (id) => {
    const items = get().items;
    const item = items.find((i) => i.id === id);
    if (item?.quantity === 1) {
      set({ items: items.filter((i) => i.id !== id) });
    } else {
      set({
        items: items.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        ),
      });
    }
  },

  clearCart: () => set({ items: [] }),

  getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  getTotalPrice: () =>
    get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  openCheckout: () => set({ isCheckoutOpen: true, isCartOpen: false }),
  closeCheckout: () => set({ isCheckoutOpen: false }),

  /**
   * Compiles the order details, generates the WhatsApp text link,
   * redirects the user to WhatsApp, and updates the local state.
   */
  placeOrder: async (formData) => {
    const items = get().items;
    const subtotal = get().getTotalPrice();
    const deliveryFee = siteConfig.deliveryFee;
    const total = subtotal + deliveryFee;

    // Generate order ID
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `FB-${randomNum}`;

    try {
      // 1. Generate the WhatsApp Order Link
      const whatsappUrl = createWhatsAppOrder(items, { ...formData, orderId }, siteConfig);

      // 2. Open WhatsApp in a new tab
      window.open(whatsappUrl, "_blank");

      // 3. Update local state
      set({
        orderPlaced:    true,
        orderDetails:   { ...formData, total },
        orderId:        orderId,
        isCheckoutOpen: false,
        items:          [], // Empty the cart
      });

      return { id: orderId, total };
    } catch (err) {
      throw new Error(err.message || "Failed to generate WhatsApp order.");
    }
  },

  resetOrder: () =>
    set({ orderPlaced: false, orderDetails: null, orderId: null }),
}));

export default useCartStore;
