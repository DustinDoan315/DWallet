import * as Keychain from "react-native-keychain";
import * as bip39 from "bip39";
import { HDNodeWallet } from "ethers";

import { icons } from "@assets/index";

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatPrice = (price: number) => {
  return USDollar.format(price);
};

export const screenName = {
  home: "Home",
  short: "Short",
  subscription: "Subscription",
  library: "Library",
  create: "Create",
};

export const getIcon = (name: string, focused: boolean) => {
  switch (name) {
    case screenName.home:
      return focused ? icons.home_focus : icons.home;
    case screenName.short:
      return focused ? icons.short_focus : icons.short;
    case screenName.subscription:
      return focused ? icons.subscribe_focus : icons.subscribe;
    case screenName.library:
      return focused ? icons.library_focus : icons.library;
    case screenName.create:
      return icons.create;
    default:
      return icons.library;
  }
};

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const storePassword = async (password: string) => {
  try {
    // Store the password with a service name, making it identifiable
    await Keychain.setGenericPassword("walletPassword", password, {
      service: "crypto-wallet", // This is optional, can be used to group your sensitive data
    });
    console.log("Password stored securely!");
  } catch (error) {
    console.error("Failed to store password: ", error);
  }
};

const generateSeedPhrase = () => {
  try {
    const seedPhrase = bip39.generateMnemonic();
    console.log("Seed Phrase generated:", seedPhrase);
    return seedPhrase;
  } catch (error) {
    console.error("Failed to generate seed phrase: ", error);
    return null;
  }
};

const retrievePassword = async () => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: "crypto-wallet",
    });

    if (credentials) {
      console.log("Password retrieved:", credentials.password);
      return credentials.password;
    } else {
      console.log("No password stored");
      return null;
    }
  } catch (error) {
    console.error("Failed to retrieve password: ", error);
    return null;
  }
};

// Create a wallet from the seed phrase and password
const createWalletFromSeed = async (seedPhrase: any) => {
  try {
    // Generate a wallet from the seed phrase
    const wallet = HDNodeWallet.fromMnemonic(seedPhrase);

    console.log("Wallet Address:", wallet.address);
    console.log("Wallet Private Key:", wallet.privateKey);

    return wallet;
  } catch (error) {
    console.error("Failed to create wallet: ", error);
    return null;
  }
};
