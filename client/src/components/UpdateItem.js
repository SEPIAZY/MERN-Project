import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import avatar from "../assets/profile.jpg";
import toast, { Toaster } from "react-hot-toast";
import convertToBase64 from "../helper/convert";
import { addItem } from "../helper/helper";
import { IoIosCloseCircle } from "react-icons/io";
import Navbar from "../components/Nav";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

export default function UpdateItemPanel() {
  const [toggle, setToggle] = React.useState(false);
  const like = () => {
    setToggle(!toggle);
  };
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-6">
        <div className="flex flex-col justify-center items-start">
          <h1 className="px-6 py-3 text-4xl font-bold tracking-wide">
            BEARBRICK Database
          </h1>
        </div>
        <div className="flex flex-row">
          <IoIosSearch className="relative top-3 left-10 text-xl text-gray-500" />
          <input
            type="text"
            placeholder="   Search"
            className="w-3/5 h-12 pl-10 pr-32 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent shadow-md"
          />
          <button className="w-2/12 h-12 bg-white text-black px-4 py-2 rounded-xl ml-2 shadow-md">
            Filter
          </button>
        </div>
        <div className="px-6 py-6 flex overflow-x-auto">
          <div className="card-container flex flex-wrap gap-4 mb-4 justify-center">
          {/* <div className="card rounded-xl w-full bg-white rounded-xl p-5 py-4">
            <div className="flex flex-col md:flex-col md:justify-between gap-6">
              <div className="img-area w-full md:w-2/6 mt-3 md:mt-0">
                <img
                  src="images/bear.png"
                  alt="item1"
                  className="rounded-lg w-full"
                />
              </div>
              <div className="text-area md:mt-auto md:ml-0 w-full md:w-4/6">
                <p className="text-black font-semibold tracking-wide text-lg">
                  BE@RBRICK Porcelain K.Olin tribu x Medicom - The Toy Chronicle
                </p>
                <div className="py-4 flex items-center">
                  <button
                    className="py-2 w-2/5 bg-white border border-gray-400 rounded-xl"
                    type="button"
                  >
                    100%
                  </button>
                  <button
                    className="ml-3 py-2 w-2/5 bg-white border border-gray-400 rounded-xl"
                    type="button"
                  >
                    Artist
                  </button>
                  <FaTrash className="ml-auto mr-auto text-xl text-gray-400 cursor-pointer hover:text-black" />
                </div>
              </div>
            </div>
          </div> */}
            <div className="card rounded-xl w-full md:w-1/4 bg-white rounded-xl p-5 py-4 relative cursor-pointer hover:scale-105 transition-all duration-300">
              <FaTrash className="ml-auto mr-auto absolute top-7 right-9 text-2xl text-gray-400 cursor-pointer hover:text-black" />
              <div className="img-area">
                <img src="images/bear.png" alt="bear1" className="rounded-lg" />
              </div>
              <div className="text-area mt-6">
                <p className="text-black font-semibold">
                  BE@RBRICK Porcelain K.Olin tribu x Medicom - The Toy Chronicle
                </p>
              </div>
              <div className="cta flex space-x-3 py-3">
                <button
                  className="py-1 w-4/6 bg-white border border-gray-400 rounded-xl"
                  type="button"
                >
                  100%
                </button>
                <button
                  className="py-1 w-4/6 bg-white border border-gray-400 rounded-xl"
                  type="button"
                >
                  Artist
                </button>
              </div>
            </div>
            <div className="card rounded-xl w-full md:w-1/4 bg-white rounded-xl p-5 py-4 relative cursor-pointer hover:scale-105 transition-all duration-300">
              <FaTrash className="ml-auto mr-auto absolute top-7 right-9 text-2xl text-gray-400 cursor-pointer hover:text-black" />
              <div className="img-area">
                <img src="images/bear.png" alt="bear1" className="rounded-lg" />
              </div>
              <div className="text-area mt-6">
                <p className="text-black font-semibold">
                  BE@RBRICK Porcelain K.Olin tribu x Medicom - The Toy Chronicle
                </p>
              </div>
              <div className="cta flex space-x-3 py-3">
                <button
                  className="py-1 w-4/6 bg-white border border-gray-400 rounded-xl"
                  type="button"
                >
                  100%
                </button>
                <button
                  className="py-1 w-4/6 bg-white border border-gray-400 rounded-xl"
                  type="button"
                >
                  Artist
                </button>
              </div>
            </div>
            <div className="card rounded-xl w-full md:w-1/4 bg-white rounded-xl p-5 py-4 relative cursor-pointer hover:scale-105 transition-all duration-300">
              <FaTrash className="ml-auto mr-auto absolute top-7 right-9 text-2xl text-gray-400 cursor-pointer hover:text-black" />
              <div className="img-area">
                <img src="images/bear.png" alt="bear1" className="rounded-lg" />
              </div>
              <div className="text-area mt-6">
                <p className="text-black font-semibold">
                  BE@RBRICK Porcelain K.Olin tribu x Medicom - The Toy Chronicle
                </p>
              </div>
              <div className="cta flex space-x-3 py-3">
                <button
                  className="py-1 w-4/6 bg-white border border-gray-400 rounded-xl"
                  type="button"
                >
                  100%
                </button>
                <button
                  className="py-1 w-4/6 bg-white border border-gray-400 rounded-xl"
                  type="button"
                >
                  Artist
                </button>
              </div>
            </div>
            <div className="card rounded-xl w-full md:w-1/4 bg-white rounded-xl p-5 py-4 relative cursor-pointer hover:scale-105 transition-all duration-300">
              <FaTrash className="ml-auto mr-auto absolute top-7 right-9 text-2xl text-gray-400 cursor-pointer hover:text-black" />
              <div className="img-area">
                <img src="images/bear.png" alt="bear1" className="rounded-lg" />
              </div>
              <div className="text-area mt-6">
                <p className="text-black font-semibold">
                  BE@RBRICK Porcelain K.Olin tribu x Medicom - The Toy Chronicle
                </p>
              </div>
              <div className="cta flex space-x-3 py-3">
                <button
                  className="py-1 w-4/6 bg-white border border-gray-400 rounded-xl"
                  type="button"
                >
                  100%
                </button>
                <button
                  className="py-1 w-4/6 bg-white border border-gray-400 rounded-xl"
                  type="button"
                >
                  Artist
                </button>
              </div>
            </div>
            <div className="card rounded-xl w-full md:w-1/4 bg-white rounded-xl p-5 py-4 relative cursor-pointer hover:scale-105 transition-all duration-300">
              <FaTrash className="ml-auto mr-auto absolute top-7 right-9 text-2xl text-gray-400 cursor-pointer hover:text-black" />
              <div className="img-area">
                <img src="images/bear.png" alt="bear1" className="rounded-lg" />
              </div>
              <div className="text-area mt-6">
                <p className="text-black font-semibold">
                  BE@RBRICK Porcelain K.Olin tribu x Medicom - The Toy Chronicle
                </p>
              </div>
              <div className="cta flex space-x-3 py-3">
                <button
                  className="py-1 w-4/6 bg-white border border-gray-400 rounded-xl"
                  type="button"
                >
                  100%
                </button>
                <button
                  className="py-1 w-4/6 bg-white border border-gray-400 rounded-xl"
                  type="button"
                >
                  Artist
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
