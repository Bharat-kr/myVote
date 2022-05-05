import add from "../../public/plus.svg";
const NavBar = () => {
  return (
    <nav className="sticky top-0 left-0 list-none flex h-20 bg-primary w-full justify-between items-center p-10 rounded-b-2xl shadow-md">
      <li className="font-bold text-3xl text-white">MYVOTE</li>
      <li className="space-x-1 flex">
        <div className="p-2 rounded-xl bg-primary font-medium text-md text-white text-ellipsis">
          0x63869eE00a459cca29F3d5E3576960b6CA7f8DA3
        </div>
        <button className="p-2 rounded-xl border border-white bg-primary hover:bg-secondary font-bold text-md text-white hover:text-primary hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
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
  );
};

export default NavBar;
