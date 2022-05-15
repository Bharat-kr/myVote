import Image from "next/image";
import img from "../public/Asset.png";
import Nav from "../components/Nav";
import { useWeb3 } from "../context/Web3Context";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loader from "../components/Loader";

export default function Landing() {
  const { connecting, setConnecting, account, setAccount } = useWeb3();
  const router = useRouter();

  useEffect(() => {
    if (account !== "undefined" && account !== null) {
      router.push("/home");
    }
  }, [account]);

  const getAccount = async (_event) => {
    setConnecting(true);
    try {
      const val = await ethereum.request({ method: "eth_requestAccounts" });
      console.log(val);
      setAccount(val[0]);
    } catch (error) {}
    setConnecting(false);
  };

  const handleAccountsChanged = (_accounts) => {
    window.location.reload();
  };

  return (
    <>
      {connecting ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="h-screen w-screen relative bg-secondary text-Poppins">
          <Nav />
          <div className="absolute bottom-0 w-full">
            <svg
              width="100%"
              height="100%"
              id="svg"
              viewBox="0 0 1440 400"
              xmlns="http://www.w3.org/2000/svg"
              className="transition duration-300 ease-in-out delay-150"
            >
              <path
                d="M 0,400 C 0,400 0,200 0,200 C 172,187.33333333333331 344,174.66666666666666 516,194 C 688,213.33333333333334 860,264.6666666666667 1014,271 C 1168,277.3333333333333 1304,238.66666666666666 1440,200 C 1440,200 1440,400 1440,400 Z"
                stroke="none"
                strokeWidth="0"
                fill="#48BBB8"
                className="transition-all duration-300 ease-in-out delay-150 path-0"
              ></path>
            </svg>
          </div>
          <div className="w-full h-3/4 flex justify-between px-10">
            <Image src={img} width={500} height={500} />
            <div className="flex flex-col justify-center h-full items-end pr-10">
              <h1 className="font-bold text-6xl text-primary mb-8">MYVOTE</h1>
              <p className="font-thin text-2xl mb-8 text-right text-stone-600">
                The safe and secure way to choose your leaders.
                <br />A new approach to one most important things in
                <br /> our lives with power of Blockchain!
              </p>
              <button
                className="p-3 rounded-xl px-20 bg-primary font-bold text-lg text-white hover:shadow-lg transition ease-in-out z-50"
                onClick={getAccount}
                disabled={connecting}
              >
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
