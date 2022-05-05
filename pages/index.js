import styles from "../styles/Home.module.css";
import Image from "next/image";
import img from "../public/main.jpg";
import Nav from "../components/Nav";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-secondary text-Poppins">
      <Nav />
      <div className="w-full h-3/4 flex justify-between px-10">
        <Image src={img} width={500} height={500} />
        <div className="flex flex-col justify-center h-full items-end pr-10">
          <h1 className="font-bold text-6xl text-primary mb-8">MYVOTE</h1>
          <p className="font-thin text-2xl mb-8 text-right text-stone-600">
            The safe and secure way to choose your leaders.
            <br />A new approach to one most important things in
            <br /> our lives with power of Blockchain!
          </p>
          <button className="p-3 rounded-xl px-20 bg-primary font-bold text-lg text-white hover:shadow-lg transition ease-in-out">
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}
