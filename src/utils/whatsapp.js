/**
 * Generates a WhatsApp API link with a pre-filled message.
 */
export function getWhatsAppURL(message, phoneNumber) {
  const cleanedPhone = phoneNumber.replace(/[^\d+]/g, ""); // remove spaces, brackets, or dashes
  return `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Formats a shopping cart order and customer information into a readable text message
 * and generates the WhatsApp checkout URL.
 */
export function createWhatsAppOrder(items, formData, siteConfig) {
  const currency = siteConfig.currency || "Rs.";
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = siteConfig.deliveryFee || 0;
  const total = subtotal + delivery;

  let msg = `Hello *${siteConfig.name}*!\n\n`;
  msg += `I would like to place an order:\n\n`;

  items.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    msg += `${index + 1}. *${item.name}* × ${item.quantity} (${currency}${itemTotal.toFixed(0)})\n`;
  });

  msg += `\n`;
  msg += `────────────────────────\n`;
  msg += `Subtotal: ${currency}${subtotal.toFixed(0)}\n`;
  msg += `Delivery Fee: ${currency}${delivery.toFixed(0)}\n`;
  msg += `*Estimated Total: ${currency}${total.toFixed(0)}*\n`;
  msg += `────────────────────────\n\n`;

  msg += `*Customer Details*:\n`;
  msg += `- *Name*: ${formData.name.trim()}\n`;
  msg += `- *Phone*: ${formData.phone.trim()}\n`;
  msg += `- *Delivery Address*: ${formData.address.trim()}\n\n`;
  if (formData.notes && formData.notes.trim()) {
    msg += `*Special Instructions*:\n_${formData.notes.trim()}_\n\n`;
  }

  msg += `Please confirm my order. Thank you!`;

  return getWhatsAppURL(msg, siteConfig.whatsappNumber);
}

/**
 * Formats a generic inquiry message.
 */
export function createGenericWhatsAppMessage(siteConfig) {
  const msg = `Hello ${siteConfig.name}, I would like to place an order.`;
  return getWhatsAppURL(msg, siteConfig.whatsappNumber);
}
