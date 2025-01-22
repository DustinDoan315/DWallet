import router from "@navigation/router";
import ImportWalletScreen from "./ImportWallet";
import CreateNewWalletScreen from "./CreateNewWallet";
import SecureWalletScreen from "./SecureWallet";
import SecureWalletSecondStepScreen from "./SecureWalletSecondStep";
import SecureWalletThirdStepScreen from "./SecureWalletThirdStep";
import SecureWalletFinalStepScreen from "./SecureWalletFinalStep";

export const auth = {
  [router.IMPORT_WALLET]: ImportWalletScreen,
  [router.CREATE_NEW_WALLET]: CreateNewWalletScreen,
  [router.SECURE_WALLET]: SecureWalletScreen,
  [router.SECURE_WALLET_SECOND]: SecureWalletSecondStepScreen,
  [router.SECURE_WALLET_THIRD]: SecureWalletThirdStepScreen,
  [router.SECURE_WALLET_FINAL]: SecureWalletFinalStepScreen,
};
