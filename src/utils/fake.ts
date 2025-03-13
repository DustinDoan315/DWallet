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
