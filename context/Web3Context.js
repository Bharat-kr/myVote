import React, { createContext, useState, useContext, useEffect } from "react";
import initWeb3 from "../ethereum/web3";
import BallotFactory from "../ethereum/build/BallotFactory.json";
import { useToasts } from "react-toast-notifications";

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [doneCheckingForMetaMask, setDoneCheckingForMetaMask] = useState(false);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isRinkebyChain, setIsRinkebyChain] = useState(false);
  const [factory, setFactory] = useState(null);
  const { addToast } = useToasts();

  useEffect(() => {
    let cancelled = false;

    async function initWeb3WithProvider() {
      if (web3 === null) {
        if (!cancelled) {
          setDoneCheckingForMetaMask(false);
          const web3Instance = await initWeb3();
          if (web3Instance) {
            setWeb3(web3Instance);
          } else {
            addToast("Please install Metamask!", {
              appearance: "error",
              autoDismiss: true,
            });
          }

          // Transactions done in this app must be done on the Rinkeby test network.
          try {
            const chainId = await ethereum.request({ method: "eth_chainId" });
            if (chainId === "0x4") {
              setIsRinkebyChain(true);
            }
          } catch (error) {
            addToast(error.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }

          setDoneCheckingForMetaMask(true);
        }
      }
    }

    initWeb3WithProvider();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (web3) {
      var instance = new web3.eth.Contract(
        BallotFactory.abi,
        "0xB27A86Ad8606bf42AB92753D2EEE6f1d940Bd29B" //deployed factory code
      );
      setFactory(instance);
    }
  }, [web3]);

  useEffect(() => {
    const init = async () => {
      if (doneCheckingForMetaMask && web3) {
        try {
          const accounts = await ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0 && ethereum.isConnected()) {
            setAccount(accounts[0]);
            addToast("Account Found", {
              appearance: "success",
              autoDismiss: true,
            });
          }
        } catch (error) {
          console.error(error);
          addToast(error.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      }
    };

    init();
  }, []);

  return (
    <Web3Context.Provider
      value={{
        web3,
        doneCheckingForMetaMask,
        connected,
        connecting,
        isRinkebyChain,
        setConnected,
        setConnecting,
        setDoneCheckingForMetaMask,
        setIsRinkebyChain,
        setWeb3,
        account,
        setAccount,
        factory,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
