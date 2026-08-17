export interface DeliveryTask {
  id: string;
  orderNumber: string;
  parentName: string;
  babyName: string;
  address: string;
  deliverySlot: string;
  mealCategory: 'Breakfast' | 'Lunch' | 'Evening Snack' | 'Dinner';
  mealImage: string;
  priority: 'HIGH PRIORITY' | 'STANDARD' | 'SCHEDULED';
  status: 'ready' | 'out_for_delivery' | 'delivered';
  distanceKm: number;
  itemSummary: string;
  packCount: number;
  customerPhone: string;
  kitchenAddress: string;
  otpCode: string;
}

export interface EarningItem {
  id: string;
  orderNumber: string;
  amount: number;
  status: 'pending' | 'paid';
  createdAt: string;
  notes: string;
}

export interface RiderNotification {
  id: string;
  title: string;
  text: string;
  time: string;
  type: 'order' | 'pickup' | 'earnings' | 'system';
}

// Pediatric Meal Unsplash Images
const IMAGES = {
  breakfast: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=300",
  lunch: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=300",
  snack: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&q=80&w=300",
  dinner: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=300"
};

export const INITIAL_DELIVERY_TASKS: DeliveryTask[] = [
  // 🌅 BREAKFAST SLOT (8:00 AM - 10:00 AM) - 15 Available Orders
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `bf-${i + 1}`,
    orderNumber: `#BF-80${i + 1}`,
    parentName: i % 2 === 0 ? `Priya Sharma` : `Ananya Verma`,
    babyName: `Baby Aarav (${6 + (i % 6)}M)`,
    address: `${101 + i * 4} High Street, Block ${String.fromCharCode(65 + (i % 4))}, Apt ${201 + i}`,
    deliverySlot: "8:00 AM - 10:00 AM",
    mealCategory: "Breakfast" as const,
    mealImage: IMAGES.breakfast,
    priority: i < 5 ? ("HIGH PRIORITY" as const) : ("STANDARD" as const),
    status: i < 3 ? ("out_for_delivery" as const) : ("ready" as const),
    distanceKm: Number((1.2 + (i * 0.3)).toFixed(1)),
    itemSummary: i % 2 === 0 ? "Organic Apple Oats Porridge" : "Pumpkin & Rice Puree",
    packCount: 3,
    customerPhone: `+91 98765-${1000 + i}`,
    kitchenAddress: `Moncradel Kitchen #K-402, Bay ${1 + (i % 4)}`,
    otpCode: `${4000 + i}`
  })),

  // ☀️ LUNCH SLOT (12:00 PM - 2:00 PM) - 12 Available Orders
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `ln-${i + 1}`,
    orderNumber: `#LN-12${i + 1}`,
    parentName: i % 2 === 0 ? `Sarah Henderson` : `Meera Kapoor`,
    babyName: `Baby Leo (${8 + (i % 4)}M)`,
    address: `${40 + i * 3} Sunset Blvd, Apt ${101 + i}`,
    deliverySlot: "12:00 PM - 2:00 PM",
    mealCategory: "Lunch" as const,
    mealImage: IMAGES.lunch,
    priority: i < 4 ? ("HIGH PRIORITY" as const) : ("STANDARD" as const),
    status: "ready" as const,
    distanceKm: Number((1.8 + (i * 0.4)).toFixed(1)),
    itemSummary: i % 2 === 0 ? "Moong Dal & Sweet Potato Khichdi" : "Iron-Rich Spinach Rice Mash",
    packCount: 4,
    customerPhone: `+91 98201-${2000 + i}`,
    kitchenAddress: `Moncradel Kitchen #K-402, Bay ${1 + (i % 3)}`,
    otpCode: `${5000 + i}`
  })),

  // 🍵 EVENING SNACK SLOT (4:00 PM - 5:30 PM) - 8 Available Orders
  ...Array.from({ length: 8 }, (_, i) => ({
    id: `sn-${i + 1}`,
    orderNumber: `#SN-40${i + 1}`,
    parentName: `Rohan & Neha`,
    babyName: `Baby Mia (${7 + i}M)`,
    address: `${88 + i * 5} Willow Lane, Garden District`,
    deliverySlot: "4:00 PM - 5:30 PM",
    mealCategory: "Evening Snack" as const,
    mealImage: IMAGES.snack,
    priority: "STANDARD" as const,
    status: "ready" as const,
    distanceKm: Number((2.1 + (i * 0.5)).toFixed(1)),
    itemSummary: "Avocado Pear Puree & Banana Bites",
    packCount: 2,
    customerPhone: `+91 98111-${3000 + i}`,
    kitchenAddress: `Moncradel Kitchen #K-402, Bay 2`,
    otpCode: `${6000 + i}`
  })),

  // 🌙 DINNER SLOT (7:00 PM - 9:00 PM) - 10 Available Orders
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `dn-${i + 1}`,
    orderNumber: `#DN-70${i + 1}`,
    parentName: `Karan Malhotra`,
    babyName: `Baby Noah (${10 + (i % 3)}M)`,
    address: `${15 + i * 6} Riverside Drive, Suite ${301 + i}`,
    deliverySlot: "7:00 PM - 9:00 PM",
    mealCategory: "Dinner" as const,
    mealImage: IMAGES.dinner,
    priority: "SCHEDULED" as const,
    status: "ready" as const,
    distanceKm: Number((2.5 + (i * 0.4)).toFixed(1)),
    itemSummary: "Quinoa Veggie Soup & Steamed Cheese Mash",
    packCount: 3,
    customerPhone: `+91 98990-${4000 + i}`,
    kitchenAddress: `Moncradel Kitchen #K-402, Bay 4`,
    otpCode: `${7000 + i}`
  })),

  // ✅ COMPLETED ORDERS (Recent Deliveries)
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `cmp-${i + 1}`,
    orderNumber: `#CMP-90${i + 1}`,
    parentName: `Riya Desai`,
    babyName: `Baby Kabir (11M)`,
    address: `${200 + i * 2} Palm Avenue, Block C`,
    deliverySlot: "Anytime",
    mealCategory: "Lunch" as const,
    mealImage: IMAGES.lunch,
    priority: "STANDARD" as const,
    status: "delivered" as const,
    distanceKm: Number((1.5 + (i * 0.2)).toFixed(1)),
    itemSummary: "Multigrain Apple Porridge",
    packCount: 2,
    customerPhone: `+91 98777-${5000 + i}`,
    kitchenAddress: `Moncradel Kitchen #K-402, Bay 1`,
    otpCode: `${8000 + i}`
  }))
];

export const INITIAL_EARNINGS: EarningItem[] = [
  {
    id: 'earn-1',
    orderNumber: '#BF-801',
    amount: 50.00,
    status: 'pending',
    createdAt: 'Today, 02:30 PM',
    notes: 'Order #BF-801 Delivery'
  },
  {
    id: 'earn-2',
    orderNumber: '#LN-121',
    amount: 55.00,
    status: 'pending',
    createdAt: 'Today, 01:15 PM',
    notes: 'Order #LN-121 Delivery (High Priority)'
  },
  {
    id: 'earn-3',
    orderNumber: '#DN-702',
    amount: 50.00,
    status: 'paid',
    createdAt: 'Yesterday, 08:45 PM',
    notes: 'Order #DN-702 Delivery'
  },
  {
    id: 'earn-4',
    orderNumber: '#SN-401',
    amount: 60.00,
    status: 'paid',
    createdAt: 'Yesterday, 05:10 PM',
    notes: 'Order #SN-401 Delivery (Long Distance)'
  },
  {
    id: 'earn-5',
    orderNumber: '#CMP-901',
    amount: 50.00,
    status: 'paid',
    createdAt: 'May 22, 2026',
    notes: 'Order #CMP-901 Delivery'
  }
];

export const INITIAL_NOTIFICATIONS: RiderNotification[] = [
  {
    id: 'n-1',
    title: 'New High Priority Delivery Assigned',
    text: 'Breakfast Order #BF-801 (Priya & Baby Aarav) assigned. Pickup slot: 8:00 AM.',
    time: '5 min ago',
    type: 'order'
  },
  {
    id: 'n-2',
    title: 'Kitchen Thermal Container Ready',
    text: '36.5°C thermal diet box for Order #BF-802 sealed at Moncradel Kitchen #K-402.',
    time: '20 min ago',
    type: 'pickup'
  },
  {
    id: 'n-3',
    title: 'Weekly Incentive Unlocked',
    text: 'Congratulations! You earned a ₹1,500.00 bonus for completing 25 peak express deliveries.',
    time: '2 hours ago',
    type: 'earnings'
  }
];
