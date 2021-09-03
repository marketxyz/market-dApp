import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  ReactNode,
} from "react";

import { useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";

import Rari from "../rari-sdk/index";

import LogRocket from "logrocket";
import { AlertDialog, useToast } from "@chakra-ui/react";
import Fuse from "../fuse-sdk/src";
import {
  chooseBestWeb3Provider,
  infuraURL,
  initFuseWithProviders,
} from "../utils/web3Providers";
import { useLocation } from "react-router-dom";

async function launchModalLazy(
  t: (text: string, extra?: any) => string,
  cacheProvider: boolean = true
) {
  const [WalletConnectProvider, Web3Modal] = await Promise.all([
    import("@walletconnect/web3-provider"),
    import("web3modal"),
  ]);

  const providerOptions = {
    injected: {
      display: {
        description: t("Connect with a browser extension"),
      },
      package: null,
    },
    walletconnect: {
      package: WalletConnectProvider.default,
      options: {
        infuraId: infuraURL.replace("https://mainnet.infura.io/v3/", ""),
      },
      display: {
        description: t("Scan with a wallet to connect"),
      },
    },
  };

  if (!cacheProvider) {
    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
    localStorage.removeItem("walletconnect");
  }

  const web3Modal = new Web3Modal.default({
    cacheProvider,
    providerOptions,
  });

  return web3Modal.connect();
}

export interface RariContextData {
  rari: Rari;
  fuse: Fuse;
  web3ModalProvider: any | null;
  isAuthed: boolean;
  login: (cacheProvider?: boolean) => Promise<any>;
  logout: () => any;
  address: string;
  isAttemptingLogin: boolean;
  userWallet: Record<string, any> | null;
}

export const EmptyAddress = "0x0000000000000000000000000000000000000000";

export const RariContext = createContext<RariContextData | undefined>(
  undefined
);

export const RariProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();

  const location = useLocation();

  const [rari, setRari] = useState<Rari>(
    () => new Rari(chooseBestWeb3Provider())
  );
  const [fuse, setFuse] = useState<Fuse>(() => initFuseWithProviders());
  const [userWallet, setUserWallet] = useState<Record<string, any> | null>(
    null
  );

  const [isAttemptingLogin, setIsAttemptingLogin] = useState<boolean>(false);

  const toast = useToast();

  // Check the user's network:
  useEffect(() => {
    rari.web3.eth.getChainId().then((chainId) => {
      const userWallet = {
        appChainId: parseInt(process.env.REACT_APP_CHAIN_ID ?? "1") || 1,
        chainId,
        isMetaMask:
          typeof window !== "undefined" &&
          window.ethereum &&
          window.ethereum.isMetaMask,
      };

      if (userWallet.isMetaMask) {
        window.ethereum.on("chainChanged", (chainId: string) => {
          setUserWallet({
            ...userWallet,
            chainId: Number(chainId),
          });
        });
      }

      setUserWallet(userWallet);
    });
  }, [rari, toast]);

  const [address, setAddress] = useState<string>(EmptyAddress);

  const [web3ModalProvider, setWeb3ModalProvider] = useState<any | null>(null);

  const queryClient = useQueryClient();

  const setRariAndAddressFromModal = useCallback(
    (modalProvider) => {
      const rariInstance = new Rari(modalProvider);
      const fuseInstance = initFuseWithProviders(modalProvider);

      setRari(rariInstance);
      setFuse(fuseInstance);

      rariInstance.web3.eth.getAccounts().then((addresses) => {
        if (addresses.length === 0) {
          console.log("Address array was empty. Reloading!");
          window.location.reload();
        }

        const address = addresses[0];
        const requestedAddress = new URLSearchParams(location.search).get(
          "address"
        );

        console.log("Setting Logrocket user to new address: " + address);
        LogRocket.identify(address);

        console.log("Requested address: ", requestedAddress);
        setAddress(requestedAddress ?? address);
      });
    },
    [setRari, setAddress, location.search]
  );

  const login = useCallback(
    async (cacheProvider: boolean = true) => {
      try {
        setIsAttemptingLogin(true);
        const provider = await launchModalLazy(t, cacheProvider);
        setWeb3ModalProvider(provider);
        setRariAndAddressFromModal(provider);
        setIsAttemptingLogin(false);
      } catch (err) {
        setIsAttemptingLogin(false);
        return console.error(err);
      }
    },
    [setWeb3ModalProvider, setRariAndAddressFromModal, setIsAttemptingLogin, t]
  );

  const refetchAccountData = useCallback(() => {
    console.log("New account, clearing the queryClient!");

    setRariAndAddressFromModal(web3ModalProvider);

    queryClient.clear();
  }, [setRariAndAddressFromModal, web3ModalProvider, queryClient]);

  const logout = useCallback(() => {
    setWeb3ModalProvider((past: any) => {
      if (past?.off) {
        past.off("accountsChanged", refetchAccountData);
        past.off("chainChanged", refetchAccountData);
      }

      return null;
    });

    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
    localStorage.removeItem("walletconnect");

    setAddress(EmptyAddress);
  }, [setWeb3ModalProvider, refetchAccountData]);

  useEffect(() => {
    if (web3ModalProvider !== null && web3ModalProvider.on) {
      web3ModalProvider.on("accountsChanged", refetchAccountData);
      web3ModalProvider.on("chainChanged", refetchAccountData);
    }

    return () => {
      if (web3ModalProvider?.off) {
        web3ModalProvider.off("accountsChanged", refetchAccountData);
        web3ModalProvider.off("chainChanged", refetchAccountData);
      }
    };
  }, [web3ModalProvider, refetchAccountData]);

  // Automatically open the web3modal if they have previously logged in on the site:
  useEffect(() => {
    if (localStorage.WEB3_CONNECT_CACHED_PROVIDER) {
      login();
    }
  }, [login]);

  const value = useMemo(
    () => ({
      web3ModalProvider,
      rari,
      fuse,
      isAuthed: address !== EmptyAddress,
      login,
      logout,
      address,
      isAttemptingLogin,
      userWallet,
    }),
    [rari, web3ModalProvider, login, logout, address, fuse, isAttemptingLogin]
  );

  return <RariContext.Provider value={value}>{children}</RariContext.Provider>;
};

export function useRari() {
  const context = useContext(RariContext);

  if (context === undefined) {
    throw new Error(`useRari must be used within a RariProvider`);
  }

  return context;
}
