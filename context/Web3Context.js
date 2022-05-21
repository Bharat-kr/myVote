import React, { createContext, useState, useContext, useEffect } from "react";
import initWeb3 from "../ethereum/web3";
import BallotFactory from "../ethereum/build/BallotFactory.json";

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [doneCheckingForMetaMask, setDoneCheckingForMetaMask] = useState(false);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isRinkebyChain, setIsRinkebyChain] = useState(false);
  const [factory, setFactory] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function initWeb3WithProvider() {
      if (web3 === null) {
        if (!cancelled) {
          setDoneCheckingForMetaMask(false);
          const web3Instance = await initWeb3();
          setWeb3(web3Instance);

          // Transactions done in this app must be done on the Rinkeby test network.
          const chainId = await ethereum.request({ method: "eth_chainId" });
          if (chainId === "0x4") {
            setIsRinkebyChain(true);
          }

          setDoneCheckingForMetaMask(true);
        }
      }
    }

    initWeb3WithProvider();

    return () => {
      cancelled = true;
    };
  }, [connected]);

  useEffect(() => {
    if (web3) {
      var instance = new web3.eth.Contract(
        BallotFactory.abi,
        "0x3449BA226483423F9Fe703A4Fdd0e80993D91798" //deployed factory code
      );
      setFactory(instance);
    }
  }, [web3]);

  useEffect(() => {
    const init = async () => {
      try {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0 && ethereum.isConnected()) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error(error);
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
