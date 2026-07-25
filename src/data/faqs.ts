import type { FAQ } from "@/types";

const faqs: FAQ[] = [
  {
    id: "faq-1",
    question: "How do I place an order on Chowdeck?",
    answer:
      "Simply open the Chowdeck app, select your city and area, browse restaurants or grocery stores, add items to your cart, choose your delivery address, and proceed to checkout. You can pay with your card, wallet, or choose cash on delivery.",
    category: "Ordering",
  },
  {
    id: "faq-2",
    question: "What areas does Chowdeck deliver to?",
    answer:
      "Chowdeck currently delivers in Lagos (Yaba, Ikeja, Lekki, Victoria Island, Surulere, Ogudu, Gbagada, Festac, Egbeda, Alimosho), Abuja (Wuse, Gwarinpa, Maitama, Garki, Jabi, Utako, Mabushi, Katampe, Asokoro), and Accra (Osu, East Legon, Labone, Cantonments, Airport Residential). We're constantly expanding to new areas.",
    category: "Delivery",
  },
  {
    id: "faq-3",
    question: "What payment methods are accepted?",
    answer:
      "We accept debit cards (Visa, Mastercard, Verve), bank transfers, Chowdeck Wallet, and cash on delivery. All online payments are secured with bank-level encryption.",
    category: "Payment",
  },
  {
    id: "faq-4",
    question: "How can I track my order?",
    answer:
      "Once your order is confirmed, you'll receive a real-time tracking link via SMS and in-app notification. You can watch your rider on the map from pickup to delivery right in the app.",
    category: "Tracking",
  },
  {
    id: "faq-5",
    question: "Can I cancel my order after placing it?",
    answer:
      "You can cancel your order within 2 minutes of placing it, as long as the restaurant hasn't started preparing it. Go to your active order and tap 'Cancel Order'. After preparation has begun, cancellation may not be possible.",
    category: "Cancellation",
  },
  {
    id: "faq-6",
    question: "How do refunds work?",
    answer:
      "If your order was cancelled or you experienced an issue, refunds are processed within 24-48 hours back to your original payment method. For wallet payments, the refund is instant. Contact support if you haven't received your refund.",
    category: "Refunds",
  },
  {
    id: "faq-7",
    question: "How do I use a promo code?",
    answer:
      "During checkout, you'll see a 'Promo Code' field. Enter your code and tap 'Apply'. The discount will be reflected in your order total. Note that promo codes have minimum order requirements and expiry dates.",
    category: "Promos",
  },
  {
    id: "faq-8",
    question: "I can't log into my account. What should I do?",
    answer:
      "Try resetting your password using the 'Forgot Password' link on the login page. If that doesn't work, ensure you're using the correct email or phone number. For persistent issues, contact our support team via the in-app chat or call +234 800 CHOWDECK.",
    category: "Account",
  },
  {
    id: "faq-9",
    question: "How can I become a Chowdeck rider?",
    answer:
      "Download the Chowdeck Rider app, sign up with your details, upload the required documents (valid ID, vehicle papers, and proof of address), and complete the onboarding process. Once verified, you can start accepting deliveries!",
    category: "Rider",
  },
  {
    id: "faq-10",
    question: "How do I list my restaurant on Chowdeck?",
    answer:
      "Visit vendor.chowdeck.com or contact our vendor onboarding team at vendors@chowdeck.com. We'll guide you through the registration process, which includes providing your business documents, menu setup, and a brief orientation on using the vendor portal.",
    category: "Vendor",
  },
  {
    id: "faq-11",
    question: "How long does delivery take?",
    answer:
      "Delivery times vary by restaurant and your location, but typically range from 15-45 minutes. You'll see the estimated delivery time before you place your order. Peak hours (12pm-2pm and 6pm-8pm) may see slightly longer wait times.",
    category: "Delivery",
  },
  {
    id: "faq-12",
    question: "How do I contact customer support?",
    answer:
      "You can reach us through the in-app chat (tap the chat icon), call +234 800 CHOWDECK (available 8am-10pm daily), or email support@chowdeck.com. For urgent order issues, the in-app chat is the fastest way to get help.",
    category: "Support",
  },
  {
    id: "faq-13",
    question: "Can I schedule an order for later?",
    answer:
      "Yes! During checkout, tap 'Schedule for Later' and select your preferred delivery date and time. Scheduled orders are guaranteed to be delivered within your chosen time window.",
    category: "Ordering",
  },
  {
    id: "faq-14",
    question: "Is there a Chowdeck subscription?",
    answer:
      "Yes, ChowPass is our subscription service that gives you free delivery, exclusive discounts, and priority access to promos. Plans start from ₦2,000/month. Subscribe via the app under 'ChowPass'.",
    category: "Subscription",
  },
];

export default faqs;
export { faqs };
