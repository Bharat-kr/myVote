const Participant = ({ val, votingStarted, votingEnded }) => {
  return (
    <div className="card bg-[#15263F] w-80 h-auto rounded-xl p-6 space-y-4">
      <a href="#">
        <img
          className="w-full h-64 rounded-md transition hover:bg-cyan-300"
          src={val.image}
          alt=""
        />
      </a>
      <div id="description" className="space-y-4">
        <a href="#">
          <h2 className="text-white font-semibold text-xl transition hover:text-cyan-300">
            {val.name}
          </h2>
        </a>
        <p className="text-slate-500 text-sm select-none w-full truncate">
          {val.id}
        </p>
        <div className="flex items-center justify-between font-semibold text-sm border-b border-slate-500 "></div>
        <div className="flex text-sm justify-end text-white">
          {!votingEnded && (
            <button className="p-2 rounded-lg w-full border border-transparent hover:border-cyan-500 bg-transparent font-bold text-md text-white hover:text-cyan-300 hover:border-transparent transition ease-in duration-200 transform active:translate-y-0">
              Vote
            </button>
          )}
          {votingEnded && (
            <div className="w-full flex items-center justify-center font-medium text-xl">
              {val.votes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Participant;
