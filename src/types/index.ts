export interface City {
  id: string;
  name: string;
  country: string;
  flag: string;
  areas: Area[];
}

export interface Area {
  id: string;
  name: string;
  cityId: string;
}

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  image: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  isOpen: boolean;
  cityId: string;
  areaId: string;
  address: string;
  latitude?: number;
  longitude?: number;
  categories: string[];
  description: string;
  isFeatured: boolean;
  isPromoted?: boolean;
  promoCode?: string | null;
  promoDescription?: string | null;
  promoDiscount?: number;
  phone?: string;
  openingHours?: { open: string; close: string };
  cuisine?: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
  isPopular: boolean;
  isVegetarian?: boolean;
  spicyLevel?: number;
  calories?: number;
  addOns?: AddOn[];
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedAddOns: AddOn[];
  specialInstructions?: string;
  restaurantId: string;
  restaurantName: string;
}

export interface Cart {
  items: CartItem[];
  restaurantId: string | null;
  restaurantName: string | null;
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  discount: number;
  total: number;
  promoCode: string | null;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  discount: number;
  total: number;
  promoCode: string | null;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  deliveryAddress: string;
  createdAt: string;
  estimatedDelivery: string;
  deliveredAt?: string;
  riderName?: string;
  riderPhone?: string;
  riderImage?: string;
  riderLatitude?: number;
  riderLongitude?: number;
  rating?: number;
  review?: string;
  paymentMethod: string;
  orderType: "delivery" | "pickup";
  tracking?: {
    currentStep: number;
    steps: {
      status: OrderStatus;
      label: string;
      timestamp: string | null;
      description?: string;
    }[];
    riderName?: string;
    riderPhone?: string;
    riderAvatar?: string;
    riderLocation?: { lat: number; lng: number };
  };
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "picked_up"
  | "on_the_way"
  | "delivered"
  | "cancelled";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
  defaultAddressId?: string;
}

export interface Address {
  id: string;
  label: string;
  address: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
  cityId: string;
  areaId: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  restaurantId: string;
  orderId: string;
  rating: number;
  comment: string;
  createdAt: string;
  reply?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
  color: string;
}

export interface GroceryProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  store?: string;
  storeId: string;
  isAvailable: boolean;
  unit?: string;
  inStock?: boolean;
}

export interface GroceryStore {
  id: string;
  name: string;
  slug?: string;
  image: string;
  description?: string;
  rating: number;
  reviewCount?: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder?: number;
  isOpen?: boolean;
  cityId?: string;
  areaId?: string;
  address?: string;
  categories?: string[];
}

export interface PromoCode {
  code: string;
  discount: number;
  discountType: "percentage" | "fixed";
  maxDiscount?: number;
  minOrder: number;
  expiryDate: string;
  description: string;
  isActive: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorAvatar?: string;
  publishedAt: string;
  category?: string;
  readTime?: string;
  tags?: string[];
}

export interface Promo {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'fixed' | 'percentage' | 'free_delivery';
  discountValue: number;
  minimumOrder: number;
  maximumDiscount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  usageLimit: number;
  usageCount: number;
  applicableTo: string;
}

export interface CartStore extends Cart {
  promoDiscount: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  recalculateTotals: () => void;
}

export interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  otpSent: boolean;
  otpEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: { firstName: string; lastName: string; email: string; phone: string; password: string; referralCode?: string }) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export interface LocationStore {
  selectedCity: string;
  selectedArea: string;
  deliveryAddress: string | null;
  orderType: 'delivery' | 'pickup';
  setCity: (city: string) => void;
  setArea: (area: string) => void;
  setDeliveryAddress: (address: string | null) => void;
  setOrderType: (type: 'delivery' | 'pickup') => void;
}

export interface OrderStore {
  orders: Order[];
  activeOrder: Order | null;
  isLoading: boolean;
  placeOrder: (cart: { items: CartItem[]; total: number; restaurantName: string | null }, address: string, paymentMethod: string) => Promise<Order>;
  getOrders: () => Promise<Order[]>;
  getOrderById: (id: string) => Promise<Order | null>;
  cancelOrder: (orderId: string) => Promise<void>;
  rateOrder: (orderId: string, rating: number, review?: string) => Promise<void>;
  trackOrder: (orderId: string) => Promise<unknown>;
}

export interface Consumer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  cityId: string;
  areaId: string;
  totalOrders: number;
  totalSpent: number;
  joinedAt: string;
  isVerified: boolean;
  defaultAddress?: string;
  favoriteRestaurants?: string[];
}

export interface Rider {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  cityId: string;
  areaId: string;
  vehicleType: "bicycle" | "motorcycle" | "car";
  vehiclePlate?: string;
  rating: number;
  totalDeliveries: number;
  totalEarnings: number;
  joinedAt: string;
  isAvailable: boolean;
  isVerified: boolean;
  currentLatitude?: number;
  currentLongitude?: number;
  bankName?: string;
  bankAccountNumber?: string;
}

export interface Relay {
  id: string;
  senderId: string;
  senderName: string;
  senderPhone: string;
  receiverName: string;
  receiverPhone: string;
  pickupAddress: string;
  dropoffAddress: string;
  pickupLatitude: number;
  pickupLongitude: number;
  dropoffLatitude: number;
  dropoffLongitude: number;
  itemDescription: string;
  itemValue: number;
  distance: number;
  fee: number;
  status: RelayStatus;
  riderId?: string;
  riderName?: string;
  riderPhone?: string;
  createdAt: string;
  estimatedDelivery: string;
  deliveredAt?: string;
  notes?: string;
}

export type RelayStatus =
  | "pending"
  | "accepted"
  | "picked_up"
  | "in_transit"
  | "delivered"
  | "cancelled";

export interface Admin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: "super_admin" | "admin" | "moderator";
  lastLogin?: string;
}

export interface AdminStore {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
