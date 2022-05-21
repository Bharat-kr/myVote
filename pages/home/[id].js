import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Participant from "../../components/ballot/Participant";
import Footer from "../../components/Footer";
import NavBar from "../../components/Home/NavBar";
import { useWeb3 } from "../../context/Web3Context";
import { getAllDetails } from "../../utils/ballot";
import Ballot from "../../ethereum/build/Ballot.json";
import Loader from "../../components/Loader";

const Election = () => {
  const router = useRouter();
  const { web3 } = useWeb3();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      if (web3) {
        if (router.query.id) {
          setLoading(true);
          var instance = new web3.eth.Contract(Ballot.abi, router.query.id);
          let res = await getAllDetails(instance);
          setDetails(res);
          setLoading(false);
        }
      }
    };
    init();
  }, [web3, router.query.id]);

  return (
    <div className="w-full flex flex-col items-center">
      <NavBar />
      {loading && (
        <div className="grow w-full h-96 flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!loading && (
        <div className="w-11/12 shadow-2xl mb-6 rounded-b-xl">
          <div className="px-10 pt-4 flex items-center justify-between w-full">
            <h1 className="text-Poppins font-semibold text-2xl">
              {details.name}
            </h1>
            {!details?.votingStarted && !details.votingEnded && (
              <div className="flex justify-center">
                <button className="mr-4 p-3 rounded-xl border border-white bg-primary font-bold text-md text-white hover:shadow-lg transition ease-in-out">
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
                <button className="p-3 py-2 rounded-xl px-16 bg-primary font-bold text-lg text-white hover:shadow-lg transition ease-in-out">
                  Start Voting
                </button>
              </div>
            )}
            {details?.votingStarted && (
              <button className="p-3 py-2 rounded-xl px-16 bg-red-500 font-bold text-lg text-white hover:shadow-lg transition ease-in-out">
                End Voting
              </button>
            )}
          </div>
          <hr className="mt-6 mx-10 border-2 rounded-sm border-slate-100" />
          <div className="p-10 py-8 grid grid-flow-row-dense grid-cols-1 md:grid-cols-4">
            <p className="mt-2 text-lg text-Montserrat col-span-1 md:col-span-3">
              {details?.description}
            </p>
            <img
              src={details?.manager?.image}
              className="rounded-lg col-span-1 -order-1 md:order-1 md:col-span-1 justify-self-center md:justify-self-end"
              height={200}
              width={200}
            />
          </div>
          <hr className="mt-6 mx-10 border-2 rounded-sm border-slate-100" />
          <div className="px-10 py-4 flex items-center justify-between w-full">
            <h2 className="text-Poppins font-semibold text-2xl">
              Participants
            </h2>
          </div>
          <div className="px-10 pb-10 grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-3 justify-items-center">
            {details.participants.map((val, idx) => {
              return <Participant key={idx} val={val} />;
            })}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Election;
