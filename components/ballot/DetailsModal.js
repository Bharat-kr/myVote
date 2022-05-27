import React, { useState } from "react";
import { useWeb3 } from "../../context/Web3Context";

const DetailsModal = ({ open, setOpen, instance, participant }) => {
  const { web3, account } = useWeb3();
  const [loading, setLoading] = useState(false);

  //handler for adding a participant
  const handleVote = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value, e.target[1].value, e.target[2].value);
    setLoading(true);
    await instance.methods
      .vote(e.target[0].value, participant.id, e.target[1].value)
      .send({
        from: account,
        value: web3.utils.toWei("0.005", "ether"),
      });
    setLoading(false);
    setOpen(false);
  };

  return (
    <div className="w-full h-full">
      <div
        className={
          open
            ? "w-full h-full absolute top-1/2 left-1/2 flex items-center justify-center backdrop-filter backdrop-blur-sm -translate-y-1/2 -translate-x-1/2"
            : "w-full h-full absolute hidden"
        }
        onClick={() => {
          setOpen(false);
        }}
      ></div>
      <div
        className={
          open
            ? "overflow-y-auto sm:w-[385px] sm:min-w-[40vw] min-w-[80vw] min-h-[50vh] max-h-[90vh] flex flex-col items-center gap-2 -translate-y-1/2 p-6 bg-[#FFFFFF] shadow-lg rounded-lg top-1/2 left-1/2 -translate-x-1/2 absolute"
            : "hidden"
        }
      >
        <div className="flex items-center justify-between space-x-4 w-full">
          <h1 className="text-xl font-medium text-gray-800 ">Vote</h1>
          <button
            className="text-gray-600 focus:outline-none hover:text-gray-700"
            onClick={() => {
              setOpen(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <form className="mt-5 w-full" onSubmit={handleVote}>
          <div>
            <label
              htmlFor="Name"
              className="block text-sm text-gray-700 capitalize"
            >
              Name
            </label>
            <input
              placeholder="Jhon Doe"
              type="text"
              id="Name"
              className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="ID"
              className="block text-sm text-gray-700 capitalize"
            >
              Enter your Aadhar number
            </label>
            <input
              placeholder="0x4......"
              type="text"
              id="ID"
              className="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
            />
          </div>
          <div className="flex justify-end mt-6 space-x-2">
            <button
              className="p-2 bg-[#219F94] rounded-lg w-full text-white"
              disabled={loading}
              type="button"
              onClick={(e) => {
                setOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              className="p-2 bg-[#219F94] rounded-lg w-full text-white flex items-center justify-center"
              disabled={loading}
              type="submit"
            >
              {!loading && "Vote"}
              {loading && (
                <>
                  <svg
                    className="mr-2 h-5 w-5 animate-spin text-white"
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailsModal;
