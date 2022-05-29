import { useWeb3 } from "../context/Web3Context";
import { useToasts } from "react-toast-notifications";

const Nav = () => {
  const { connecting, setConnecting, setAccount } = useWeb3();
  const { addToast } = useToasts();

  const getAccount = async (_event) => {
    setConnecting(true);
    try {
      const val = await ethereum.request({ method: "eth_requestAccounts" });
      if (val.length > 0) {
        setAccount(val[0]);
        addToast("Account Found", {
          appearance: "success",
          autoDismiss: true,
        });
      }
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
      setConnecting(false);
    }
  };

  return (
    <nav className="list-none flex h-20 bg-primary w-full justify-between items-center p-10 rounded-b-2xl shadow-md">
      <li className="font-bold text-xl md:text-3xl text-white">MYVOTE</li>
      <li>
        <button
          className="p-1 md:p-2 rounded-xl border border-white bg-primary hover:bg-secondary font-bold text-md text-white hover:text-primary hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
          onClick={getAccount}
          disabled={connecting}
        >
          Connect Wallet
        </button>
      </li>
    </nav>
  );
};

export default Nav;
