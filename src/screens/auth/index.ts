import router from "@navigation/router";
import ImportWalletScreen from "./ImportWallet";
import CreateNewWalletScreen from "./CreateNewWallet";
import SecureWalletScreen from "./SecureWallet";

export const auth = {
  [router.IMPORT_WALLET]: ImportWalletScreen,
  [router.CREATE_NEW_WALLET]: CreateNewWalletScreen,
  [router.SECURE_WALLET]: SecureWalletScreen,
};
