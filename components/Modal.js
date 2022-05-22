import React, { useState } from "react";

const Modal = ({ open, setOpen }) => {
  return (
    <div className="w-full h-full">
      <div
        class={
          open
            ? "w-full h-full absolute top-0 flex items-center justify-center backdrop-filter backdrop-blur-sm"
            : "w-full h-full absolute hidden"
        }
        onClick={() => {
          setOpen(false);
        }}
      ></div>
      <div
        class={
          open
            ? "overflow-y-auto sm:w-[385px] sm:min-w-[40vw] min-w-[80vw] min-h-[50vh] max-h-[90vh] flex flex-col items-center gap-2 -translate-y-1/2 p-6 bg-[#FFFFFF] shadow-lg rounded-lg top-1/2 left-1/2 -translate-x-1/2 absolute"
            : "hidden"
        }
      >
        <div class="flex items-center justify-between space-x-4 w-full">
          <h1 class="text-xl font-medium text-gray-800 ">
            Create a new Ballot
          </h1>
          <button
            class="text-gray-600 focus:outline-none hover:text-gray-700"
            onClick={() => {
              setOpen(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <form class="mt-5 w-full">
          <div className="w-full">
            <label
              for="Ballot Name"
              class="block text-sm text-gray-700 capitalize w-full"
            >
              Name of Ballot
            </label>
            <input
              placeholder="Election 1"
              type="text"
              class="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
            />
          </div>
          <div class="mt-4">
            <label for="Name" class="block text-sm text-gray-700 capitalize">
              Your name
            </label>
            <input
              placeholder="Jhon Doe"
              type="text"
              class="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
            />
          </div>
          <div class="mt-4">
            <label for="Image" class="block text-sm text-gray-700 capitalize">
              Your image
            </label>
            <input
              placeholder="Paste link here"
              type="text"
              class="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
            />
          </div>
          <div class="mt-4">
            <label
              for="description"
              class="block text-sm text-gray-700 capitalize"
            >
              Ballot Description
            </label>
            <textarea
              placeholder="Describe Your Ballot"
              type="text"
              class="block w-full px-3 py-2 mt-2 text-gray-600 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
            />
          </div>

          <div class="flex justify-end mt-6 space-x-2">
            <button
              class="p-2 bg-[#219F94] rounded-lg w-full text-white"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
            >
              Cancel
            </button>
            <button class="p-2 bg-[#219F94] rounded-lg w-full text-white">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
