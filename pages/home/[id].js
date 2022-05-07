import React from "react";
import { useState } from "react";
import Participant from "../../components/ballot/Participant";
import Footer from "../../components/Footer";
import NavBar from "../../components/Home/NavBar";

const Index = () => {
  const [voting, setvoting] = useState(false);
  return (
    <div className="w-full flex flex-col items-center">
      <NavBar />
      <div className="w-11/12 shadow-2xl mb-6 rounded-b-xl">
        <div className="px-10 pt-4 flex items-center justify-between w-full">
          <h1 className="text-Poppins font-semibold text-2xl">
            Name of Ballot
          </h1>
          {!voting && (
            <button className="p-3 rounded-xl px-16 bg-primary font-bold text-lg text-white hover:shadow-lg transition ease-in-out">
              Start Voting
            </button>
          )}
          {voting && (
            <button className="p-3 rounded-xl px-16 bg-red-500 font-bold text-lg text-white hover:shadow-lg transition ease-in-out">
              End Voting
            </button>
          )}
        </div>
        <hr className="mt-6 mx-10 border-2 rounded-sm border-slate-100" />
        <div className="p-10 py-8 grid grid-flow-row-dense grid-cols-1 md:grid-cols-4">
          <p className="mt-2 text-lg text-Montserrat col-span-1 md:col-span-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo
            sapiente, exercitationem maiores eveniet harum praesentium ducimus
            quam rem doloribus dicta esse aliquid nam quisquam provident impedit
            fugiat accusamus. Porro ut numquam saepe cupiditate quae odio
            facilis quo iure dolores, illo voluptate aperiam. Dolorum,
            repudiandae distinctio rem esse, unde tenetur quas impedit
            voluptatibus nihil amet labore. Ex ea accusantium saepe veniam
            voluptates dolorem, voluptate blanditiis explicabo eaque eum autem
            id necessitatibus expedita ducimus architecto omnis eius animi
            facere cum soluta ipsa dignissimos. Consequatur blanditiis ab error
            iusto explicabo illum modi sunt recusandae corrupti nam esse, porro
            aperiam doloremque velit cumque veritatis!
          </p>
          <img
            src="https://images.unsplash.com/photo-1635002962487-2c1d4d2f63c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZGlnaXRhbCUyMGFydHxlbnwwfDJ8MHx8&auto=format&fit=crop&w=800&q=60"
            className="rounded-lg col-span-1 -order-1 md:order-1 md:col-span-1 justify-self-center md:justify-self-end"
            height={200}
            width={200}
          />
        </div>
        <hr className="mt-6 mx-10 border-2 rounded-sm border-slate-100" />
        <div className="px-10 py-4 flex items-center justify-between w-full">
          <h2 className="text-Poppins font-semibold text-2xl">Participants</h2>
        </div>
        <div className="px-10 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-3 justify-items-center">
          <Participant />
          <Participant />
          <Participant />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
