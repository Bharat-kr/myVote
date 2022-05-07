const Participant = () => {
  return (
    <div className="card bg-[#15263F] w-80 h-auto rounded-xl p-6 space-y-4">
      <a href="#">
        <img
          className="w-full h-64 rounded-md transition hover:bg-cyan-300"
          src="https://images.unsplash.com/photo-1635002962487-2c1d4d2f63c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZGlnaXRhbCUyMGFydHxlbnwwfDJ8MHx8&auto=format&fit=crop&w=800&q=60"
          alt=""
        />
      </a>
      <div id="description" className="space-y-4">
        <a href="#">
          <h2 className="text-white font-semibold text-xl transition hover:text-cyan-300">
            Equilibrium #3429
          </h2>
        </a>
        <p className="text-slate-500 text-sm select-none">
          Our Equilibrium collection promotes balance and calm.
        </p>
        <div className="flex items-center justify-between font-semibold text-sm border-b border-slate-500 "></div>
        <div className="flex text-sm justify-end text-white">
          <button className="p-2 rounded-lg w-full border border-transparent hover:border-cyan-500 bg-transparent font-bold text-md text-white hover:text-cyan-300 hover:border-transparent transition ease-in duration-200 transform active:translate-y-0">
            Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Participant;
