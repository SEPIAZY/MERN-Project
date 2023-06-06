import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.jpg";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";
import { verifyPassword } from "../helper/helper";
import { updateUserCollection } from "../helper/helper";
import Navbar from "../components/Nav";
import { searchItem } from "../helper/helper";
import { IoIosSearch, IoIosRefresh } from "react-icons/io";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function Friend() {
  const [text, setText] = useState();
  const [activeSort, setActiveSort] = useState(null);
  const [items, setItems] = useState([]);
  const [id, setId] = useState();

  const inputonChange = async (e) => {
    setText(e.target.value);
  };
  const handleRefresh = () => {
    setActiveSort(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await searchItem({
        _id: id,
        username: text,
      });
      setItems(result);
      // console.log(result);
    };

    fetchData();
  }, [id, text]);

  const [likedItems, setLikedItems] = useState([]);
  return (
    <div className="bg-white">
      <Navbar />
      <div className="mt-14 flex flex-col items-center justify-center ">
        <h1 className="text-2xl text-black font-bold">BE@RBRICK Community</h1>
        <p className="mt-2 ml-5 text-normal text-gray-500">
          Let's see other profile!
        </p>

        <div className="flex items-center md:w-4/6">
          <div className="container mx-auto py-4 md:py-6">
            <div className="flex flex-row">
              <IoIosSearch className="relative top-2 left-8 md:top-2 md:left-10 text-xl md:text-3xl text-gray-500" />
              <input
                type="text"
                placeholder="   Search"
                className="w-3/5 md:w-10/12 h-10 md:h-12 text-sm pl-8 md:pl-12 pr-32 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                onChange={(e) => inputonChange(e)}
              />
              <button
                className="h-10 md:h-12 px-4 py-2 border border-gray-400 rounded-xl ml-1 md:ml-2"
                onClick={handleRefresh}
              >
                <IoIosRefresh className="text-sm md:text-xl text-black cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start">
        <span className="px-8 md:ml-60 text-gray-500">
          {items.length} result found
        </span>
        <hr className="mt-1 border-gray-300 w-full" />
      </div>

      <div className="container mx-auto">
        <div className="bear database">
          <div className="px-6 py-6 flex overflow-x-auto">
            <div className="card-container flex flex-wrap gap-4 mb-4 justify-center">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="card rounded-xl w-4/5 md:w-1/4 bg-white drop-shadow-lg rounded-xl p-5 py-4 relative cursor-pointer hover:scale-105 transition-all duration-300"
                >
                  <button
                    // onClick={() => handleLike(item._id)}
                    className="absolute top-5 right-7 w-12 h-12 rounded-full bg-white border border-gray-300 flex justify-center items-center"
                  >
                    {item.liked ? (
                      <AiFillHeart
                        className="w-5 h-5 text-red-500"
                        strokeWidth={0.1}
                      />
                    ) : (
                      <AiOutlineHeart
                        className="w-5 h-5 text-gray-500"
                        strokeWidth={0.1}
                      />
                    )}
                  </button>
                  <div className="w-full md:w-6/6">
                    <div className="img-area h-32 ml-2 md:h-56 md:ml-4 flex justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="rounded-lg w-4/6 h-full md:w-full md:h-full"
                      />
                    </div>
                  </div>
                  <div className="text-area mt-2 md:mt-6">
                    <p className="text-black font-semibold">{item.name}</p>
                  </div>
                  <div className="cta flex space-x-2 py-3">
                    <button
                      className="py-1 w-3/6 md:w-3/6 bg-white border border-gray-400 rounded-xl"
                      type="button"
                    >
                      {item.size}
                    </button>
                    <button
                      className="py-1 w-2/6 md:w-2/6 bg-white border border-gray-400 rounded-xl"
                      type="button"
                    >
                      {item.type}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
