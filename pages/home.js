import { useEffect, useState } from "react";
import Footer from "../components/Footer.js";
import BallotCard from "../components/Home/BallotCard.js";
import NavBar from "../components/Home/NavBar.js";
import { useWeb3 } from "../context/Web3Context.js";
import { useRouter } from "next/router";
import Head from "next/head";
import CreateBallotModal from "../components/ballot/CreateBallotModal";

const Home = () => {
  const { account, factory } = useWeb3();
  const [onGoingBallots, setOngoingBallots] = useState([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  //checking where this page should be possible or not
  useEffect(() => {
    if (account === "undefined" || account === null) {
      router.push("/");
    }
  }, [account]);

  //fetching all ballots
  const init = async () => {
    console.log("called");
    if (factory) {
      const ballots = await factory.methods.getDeployedBallots().call();
      setOngoingBallots(ballots);
    }
  };
  useEffect(() => {
    init();
  }, [factory]);

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <Head>
          <title>MYVOTE</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
        <NavBar />
        <div className="w-11/12 shadow-2xl mb-6 rounded-b-xl">
          <div className="px-10 pt-4 flex items-center justify-between w-full">
            <div className="text-Poppins font-normal text-2xl">
              All Running Ballots
            </div>
            <div>
              <button
                className="p-3 py-2 rounded-xl px-16 bg-primary font-bold text-lg text-white hover:shadow-lg transition ease-in-out"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Create A Ballot
              </button>
            </div>
          </div>
          <hr className="mt-6 mx-10 border-2 rounded-sm border-slate-100" />
          <div className="px-10 grid grid-cols-1 md:grid-cols-2  justify-items-center gap-2">
            {onGoingBallots.map((value, idx) => {
              return <BallotCard key={idx} id={value} />;
            })}
            {onGoingBallots.length === 0 && (
              <h1 className="m-3 text-lg font-medium">
                Currently there are no ongoing ballots!
              </h1>
            )}
          </div>
        </div>
        <Footer />
      </div>
      <CreateBallotModal open={open} setOpen={setOpen} init={() => init()} />
    </>
  );
};

export default Home;
