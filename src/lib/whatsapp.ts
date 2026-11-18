// Voi Home's WhatsApp number (same as the floating button and footer).
export const WHATSAPP_NUMBER = "905527971000";

/** WhatsApp chat link with an optional pre-filled message. */
export const whatsappLink = (text?: string) =>
  `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}${
    text ? `&text=${encodeURIComponent(text)}` : ""
  }&type=phone_number&app_absent=0`;
