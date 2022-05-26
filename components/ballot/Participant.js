import { useState } from "react";
import { useWeb3 } from "../../context/Web3Context";

const Participant = ({ participant, votingStarted, votingEnded, instance }) => {
  const { web3, account } = useWeb3();
  const [loading, setLoading] = useState(false);
  //Vote a participant
  const vote = async () => {
    setLoading(true);
    await instance.methods.vote("Bharat", participant.id, "558696226312").send({
      from: account,
      value: web3.utils.toWei("0.005", "ether"),
    });
    setLoading(false);
  };

  return (
    <div className="card bg-[#15263F] w-80 h-auto rounded-xl p-6 space-y-4">
      <img
        className="w-full h-64 rounded-md transition hover:bg-cyan-300"
        src={participant.image}
        alt=""
      />
      <div id="description" className="space-y-4">
        <h2 className="text-white font-semibold text-xl transition hover:text-cyan-300">
          {participant.name}
        </h2>
        <p className="text-slate-500 text-sm select-none w-full truncate">
          {participant.id}
        </p>
        <div className="flex items-center justify-between font-semibold text-sm border-b border-slate-500 "></div>
        <div className="flex text-sm justify-end text-white">
          {!votingEnded && (
            <button
              className="p-2 rounded-lg w-full border border-transparent hover:border-cyan-500 bg-transparent font-bold text-md text-white hover:text-cyan-300 hover:border-transparent transition ease-in duration-200 transform active:translate-y-0 flex items-center justify-center"
              disabled={loading || !votingStarted}
              onClick={vote}
            >
              {!loading && "Vote"}
              {loading && (
                <>
                  <svg
                    className="mr-2 h-5 w-5 animate-spin text-currentColor"
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
          {votingEnded && (
            <div className="p-2 rounded-lg w-full border border-transparent hover:border-cyan-500 bg-transparent font-bold text-md text-white hover:text-cyan-300 hover:border-transparent transition ease-in duration-200 transform active:translate-y-0 flex items-center justify-center">
              {participant.votes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Participant;
