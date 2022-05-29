import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Participant from "../../components/ballot/Participant";
import Footer from "../../components/Footer";
import NavBar from "../../components/Home/NavBar";
import { useWeb3 } from "../../context/Web3Context";
import { getAllDetails } from "../../utils/ballot";
import Ballot from "../../ethereum/build/Ballot.json";
import Loader from "../../components/Loader";
import AddParticipantModal from "../../components/ballot/AddParticipantModal";
import { useToasts } from "react-toast-notifications";

const Election = () => {
  const router = useRouter();
  const { web3, account } = useWeb3();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [open, setOpen] = useState(false);
  const [BallotInstance, setBallotInstance] = useState(null);
  const { addToast } = useToasts();

  const init = async () => {
    if (web3 && account) {
      if (router.query.id) {
        setLoading(true);
        //creating a instance of current ballot
        var instance = new web3.eth.Contract(Ballot.abi, router.query.id);
        setBallotInstance(instance);
        //getting all the details of the ballot
        let res = await getAllDetails(instance);
        console.log(res);
        setDetails(res);
        if (account.toLowerCase() == res.manager.id.toLowerCase()) {
          setIsManager(true);
        }
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    init();
  }, [web3, router.query.id, account]);

  //Start voting for a ballot
  const startVoting = async () => {
    setButtonLoader(true);
    try {
      await BallotInstance.methods
        .startVoting()
        .send({
          from: account,
        })
        .on("receipt", function (receipt) {
          addToast(`Transaction completed. ${receipt.transactionHash}`, {
            appearance: "success",
            autoDismiss: true,
          });
        });
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
    let res = await getAllDetails(BallotInstance);
    setDetails(res);
    setButtonLoader(false);
  };

  //end voting for a ballot
  const endVoting = async () => {
    setButtonLoader(true);

    try {
      await BallotInstance.methods
        .finishVoting()
        .send({
          from: account,
        })
        .on("transactionHash", function (hash) {
          addToast(`Transaction completed. ${hash} `, {
            appearance: "success",
            autoDismiss: true,
          });
        });
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
    let res = await getAllDetails(BallotInstance);
    setDetails(res);
    setButtonLoader(false);
  };

  return (
    <>
      <div className="w-full flex flex-col items-center">
        {/* meta name for page */}
        <Head>
          <title>MYVOTE</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
        <NavBar />
        {/* page loader */}
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
              {isManager && !details?.votingStarted && !details.votingFinished && (
                <div className="flex justify-center">
                  <button
                    className="mr-4 p-3 rounded-xl border border-white bg-primary font-bold text-md text-white hover:shadow-lg transition ease-in-out"
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
                  <button
                    className="p-3 py-2 rounded-xl px-16 bg-primary font-bold text-lg text-white hover:shadow-lg transition ease-in-out flex items-center justify-center"
                    disabled={buttonLoader}
                    onClick={startVoting}
                  >
                    {!buttonLoader && "Start Voting"}
                    {buttonLoader && (
                      <>
                        <svg
                          className="mr-2 h-5 w-5 animate-spin text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span> Processing... </span>
                      </>
                    )}
                  </button>
                </div>
              )}
              {isManager && details?.votingStarted && !details?.votingFinished && (
                <button
                  className="p-3 py-2 rounded-xl px-16 bg-red-500 font-bold text-lg text-white hover:shadow-lg transition ease-in-out flex items-center justify-center"
                  disabled={buttonLoader}
                  onClick={endVoting}
                >
                  {!buttonLoader && "End Voting"}
                  {buttonLoader && (
                    <>
                      <svg
                        className="mr-2 h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span> Processing... </span>
                    </>
                  )}
                </button>
              )}
              {!isManager &&
                !details?.votingStarted &&
                !details.votingFinished && (
                  <h5 className="text-primary underline">
                    Voting Yet To Start
                  </h5>
                )}
              {!isManager &&
                details?.votingStarted &&
                !details?.votingFinished && (
                  <h5 className="text-primary underline font-medium">
                    Voting Started
                  </h5>
                )}
              {!isManager && details?.votingFinished && (
                <h5 className="text-red-500 underline font-medium">
                  Voting Ended
                </h5>
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
              {details.participants.map((participant, idx) => {
                return (
                  <Participant
                    key={idx}
                    participant={participant}
                    votingStarted={details.votingStarted}
                    votingEnded={details.votingFinished}
                    instance={BallotInstance}
                  />
                );
              })}
            </div>
          </div>
        )}
        <Footer />
      </div>
      <AddParticipantModal
        open={open}
        setOpen={setOpen}
        instance={BallotInstance}
        init={() => init()}
      />
    </>
  );
};

export default Election;
