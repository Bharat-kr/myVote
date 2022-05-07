import BallotCard from "../components/Home/BallotCard.js";
import NavBar from "../components/Home/NavBar.js";
const Home = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <NavBar />
      <div className="w-11/12 shadow-2xl mb-6 rounded-b-xl">
        <div className="px-10 pt-4 flex items-center justify-between w-full">
          <div className="text-Poppins font-normal text-2xl">
            All Running Ballots
          </div>
          <div>
            <button className="p-3 rounded-xl px-20 bg-primary font-bold text-lg text-white hover:shadow-lg transition ease-in-out">
              Create A Ballot
            </button>
          </div>
        </div>
        <hr className="mt-6 mx-10 border-2 rounded-sm border-slate-100" />
        <div className="px-10 grid grid-cols-1 md:grid-cols-2  justify-items-center gap-2">
          <BallotCard />
          <BallotCard />
          <BallotCard />
          <BallotCard />
          <BallotCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
