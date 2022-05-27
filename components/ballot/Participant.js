import { useState } from "react";
import DetailsModal from "./DetailsModal";

const Participant = ({ participant, votingStarted, votingEnded, instance }) => {

  const [open, setOpen] = useState(false);

  return (
    <div>
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
                disabled={!votingStarted}
                onClick={() => {
                  setOpen(true);
                }}
              >
                Vote
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
      <DetailsModal open={open} setOpen={setOpen} instance={instance} participant={participant} />
    </div>
  );
};

export default Participant;
