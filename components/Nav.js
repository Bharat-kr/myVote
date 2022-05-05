const Nav = () => {
  return (
    <nav className="list-none flex h-20 bg-primary w-full justify-between items-center p-10 rounded-b-2xl shadow-md">
      <li className="font-bold text-3xl text-white">MYVOTE</li>
      <li>
        <button className="p-2 rounded-xl border border-white bg-primary hover:bg-secondary font-bold text-md text-white hover:text-primary hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
          Connect Wallet
        </button>
      </li>
    </nav>
  );
};

export default Nav;
