import { icons } from "@assets/index";

export const HIGHTEST_BTC_PRICE = 700000;

export const FakeListAssets = [
  {
    id: 1,
    name: "Ethereum",
    token: "ETH",
    price: 3006.31,
    img: icons.eth,
    profit: 1.15,
    balance: 1.2123,
  },
  {
    id: 2,
    name: "Bitcoin",
    token: "BTC",
    price: 61213.54,
    img: icons.btc,
    profit: -0.15,
    balance: 0.002,
  },
  {
    id: 4,
    name: "Avalanche",
    token: "AVAX",
    price: 34.09,
    img: icons.avax,
    profit: 0.5,
    balance: 220.27,
  },
  {
    id: 5,
    name: "Binance",
    token: "BNB",
    price: 549.15,
    img: icons.bnb,
    profit: -0.19,
    balance: 19.2371,
  },
];

export const mockTransactions = [
  {
    id: "1",
    date: "Mar 3 at 10:04am",
    type: "Received", // or "Sent"
    token: "BNB",
    status: "Confirmed", // or "Canceled"
    amount: 0.04,
    value: 9.578,
    addressFrom: "0x3d1...f3b",
    addressTo: "0x1f2...xdf",
  },
  {
    id: "2",
    date: "Mar 3 at 12:30pm",
    type: "Sent",
    token: "ETH",
    status: "Canceled",
    amount: 0.1,
    value: 300.25,
    addressFrom: "0x3d1...f3b",
    addressTo: "0x1f2...xdf",
    subAmount: 0.98,
    fee: 0.02,
  },
];

export const listAccounts = [
  {
    id: 1,
    token: "BNB",
    name: "Account 1",
    balance: 19.237,
    address: "0x3d1...f3b",
    isActive: true,
  },
  {
    id: 2,
    token: "BNB",
    name: "Account 2",
    balance: 14.237,
    address: "0x3d1...f3b",
    isActive: false,
  },
  {
    id: 3,
    token: "BNB",
    name: "Account 3",
    balance: 12.237,
    address: "0x3d1...f3b",
    isActive: false,
  },
];

export const listRecentAccounts = [
  {
    id: "1",
    token: "BNB",
    name: "Account test 1",
    balance: 19.237,
    address: "0x3d1...f3b",
  },
  {
    id: "2",
    token: "BNB",
    name: "Account test 2",
    balance: 14.237,
    address: "0x3d1...f3b",
  },
  {
    id: "3",
    token: "BNB",
    name: "Account test 3",
    balance: 12.237,
    address: "0x3d1...f3b",
  },
];

export const Categories = [
  {
    id: 1,
    name: "Italian Cuisine",
    icon: icons.food_1,
    desc: "Savory Italian dish with a crispy crust, tangy tomato sauce, and melted mozzarella cheese, topped with a variety of fresh ingredients.",
    price: "$59 - $399",
    rating: "5",
    numberOfComments: "34",
  },
  {
    id: 2,
    name: "Japanese Cuisine",
    icon: icons.food_2,
    desc: "Juicy beef patty nestled in a soft bun, topped with lettuce, tomato, cheese, and pickles, served with crispy fries.",
    price: "$59 - $399",
    rating: "4.8",
    numberOfComments: "34",
  },
  {
    id: 3,
    name: "Mexican Cuisine",
    icon: icons.food_3,
    desc: "Delicate vinegared rice rolls with fresh fish, vegetables, and seaweed, often served with soy sauce, wasabi, and pickled ginger.",
    price: "$59 - $399",
    rating: "4.8",
    numberOfComments: "34",
  },
  {
    id: 4,
    name: "Indian Cuisine",
    icon: icons.food_1,
    desc: "Al dente noodles tossed in a rich tomato or creamy Alfredo sauce, garnished with Parmesan cheese and fresh basil.",
    price: "$59 - $399",
    rating: "4.8",
    numberOfComments: "34",
  },
  {
    id: 5,
    name: "French Cuisine",
    icon: icons.food_2,
    desc: "Soft or crunchy tortillas filled with seasoned meat, fresh veggies, cheese, and tangy salsa, offering a burst of Mexican flavors.",
    price: "$59 - $399",
    rating: "4.8",
    numberOfComments: "34",
  },
  {
    id: 6,
    name: "Chinese Cuisine",
    icon: icons.food_3,
    desc: "Succulent cut of beef, perfectly grilled, served with a side of roasted potatoes and steamed vegetables.",
    price: "$59 - $399",
    rating: "4.8",
    numberOfComments: "34",
  },
];

export const Special = [
  {
    id: 1,
    name: "Savory Have",
    icon: icons.food_1,
    desc: "Savory Italian dish with a crispy crust, tangy tomato sauce, and melted mozzarella cheese, topped with a variety of fresh ingredients.",
    price: "$59 - $399",
    rating: "5",
    numberOfComments: "34",
  },
  {
    id: 2,
    name: "Urban Bites",
    icon: icons.food_2,
    desc: "Juicy beef patty nestled in a soft bun, topped with lettuce, tomato, cheese, and pickles, served with crispy fries.",
    price: "$59 - $399",
    rating: "4.8",
    numberOfComments: "34",
  },
  {
    id: 3,
    name: "Gourmet Delight",
    icon: icons.food_3,
    desc: "Delicate vinegared rice rolls with fresh fish, vegetables, and seaweed, often served with soy sauce, wasabi, and pickled ginger.",
    price: "$59 - $399",
    rating: "4.8",
    numberOfComments: "34",
  },
  {
    id: 4,
    name: "The Spice Palette",
    icon: icons.food_1,
    desc: "Al dente noodles tossed in a rich tomato or creamy Alfredo sauce, garnished with Parmesan cheese and fresh basil.",
    price: "$59 - $399",
    rating: "4.8",
    numberOfComments: "34",
  },
  {
    id: 5,
    name: "Epicurean Escape",
    icon: icons.food_2,
    desc: "Soft or crunchy tortillas filled with seasoned meat, fresh veggies, cheese, and tangy salsa, offering a burst of Mexican flavors.",
    price: "$59 - $399",
    rating: "4.8",
    numberOfComments: "34",
  },
  {
    id: 6,
    name: "Rustic Feast",
    icon: icons.food_3,
    desc: "Succulent cut of beef, perfectly grilled, served with a side of roasted potatoes and steamed vegetables.",
    price: "$59 - $399",
    rating: "4.8",
    numberOfComments: "34",
  },
];

export const ListData = [
  {
    id: "video",
    num: "2",
  },
  {
    id: "short",
    num: "1",
  },
  {
    id: "video",
    num: "3",
  },
  {
    id: "video",
    num: "4",
  },
  {
    id: "video",
    num: "5",
  },
  {
    id: "video",
    num: "6",
  },
];
