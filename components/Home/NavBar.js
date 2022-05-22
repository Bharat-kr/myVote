import { useWeb3 } from "../../context/Web3Context";
import CreateBallotModal from "../CreateBallotModal";
import { useState } from "react";

const NavBar = () => {
  const { account } = useWeb3();

  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 left-0 list-none flex h-20 bg-primary w-full justify-between items-center p-10 rounded-b-2xl shadow-md">
        <li className="font-bold text-3xl text-white">
          <a href="/home">MYVOTE</a>
        </li>
        <li className="flex">
          <div className="p-2 mr-2 rounded-xl border border-white bg-primary font-medium text-md text-white truncate w-24 sm:w-32 md:w-36 lg:w-auto">
            {account}
          </div>
          <button
            className="p-2 rounded-xl border border-white bg-primary hover:bg-secondary font-bold text-md text-white hover:text-primary hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0"
            onClick={() => {
              setOpen(true);
            }}
          >
            <svg
              width="48"
              height="48"
              className="w-5 h-5 text-currentColor"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 10V38"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 24H38"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </li>
      </nav>
      <CreateBallotModal open={open} setOpen={setOpen} />
    </>
  );
};

export default NavBar;
