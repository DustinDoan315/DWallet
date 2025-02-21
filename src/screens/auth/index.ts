import router from "@navigation/router";
import ImportWalletScreen from "./ImportWallet";
import CreateNewWalletScreen from "./CreateNewWallet";
import SecureWalletScreen from "./SecureWallet";
import SecureWalletInfoScreen from "./SecureWalletInfo";
import SecureWalletGenerateSeedPhraseScreen from "./SecureWalletGenerateSeedPhrase";
import SecureWalletStatusScreen from "./SecureWalletStatus";

export const auth = {
  [router.IMPORT_WALLET]: ImportWalletScreen,
  [router.CREATE_NEW_WALLET]: CreateNewWalletScreen,
  [router.SECURE_WALLET]: SecureWalletScreen,
  [router.SECURE_WALLET_SECOND]: SecureWalletInfoScreen,
  [router.SECURE_WALLET_THIRD]: SecureWalletGenerateSeedPhraseScreen,
  [router.SECURE_WALLET_FINAL]: SecureWalletStatusScreen,
};
