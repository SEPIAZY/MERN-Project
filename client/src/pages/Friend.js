import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.jpg";
import Navbar from "../components/Nav";
import { IoIosSearch, IoIosRefresh } from "react-icons/io";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { getUserAc } from "../helper/helper";
import { findUserAc } from "../helper/helper";
import { fetchOtherUserCollection } from "../helper/helper";

export default function Friend() {
  const navigate = useNavigate();
  const [text, setText] = useState();
  const [activeSort, setActiveSort] = useState(null);
  const [items, setItems] = useState([]);
  const [id, setId] = useState();
  const [profile, setProfile] = useState();
  const [refresh, setRefresh] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user._id);
    navigate(`/otherusercollection?id=${user._id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await findUserAc({text});
        setItems(result);
      } catch (error) {
        console.error("Error fetching users:", error);
        setItems([]);
      }
    };
    
    fetchData();
  }, [text]);

  const inputonChange = async (e) => {
    setText(e.target.value);
  };

  const handleRefresh = () => {
    setText("");
  };
  
  return (
    <div className="bg-white">
      <Navbar />
      <div className="mt-14 flex flex-col items-center justify-center ">
        <h1 className="text-2xl text-black font-bold">BE@RBRICK Community</h1>
        <p className="mt-2 ml-auto mr-auto text-normal text-gray-500">
          Let's see other profile!
        </p>

        <div className="ml-4 md:ml-0 flex items-center md:w-4/6">
          <div className="container mx-auto py-4 md:py-6">
            <div className="flex flex-row">
              <IoIosSearch className="relative top-2 left-8 md:top-2 md:left-10 text-xl md:text-3xl text-gray-500" />
              <input
                type="text"
                placeholder="   Search"
                className="w-4/6 md:w-10/12 h-10 md:h-12 text-sm pl-8 md:pl-12 pr-32 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                value={text}
                onChange={inputonChange}
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
        <div className="user req database">
          <div className="px-6 py-6 flex overflow-x-auto">
            <div className="card-container w-full ml-auto mr-auto flex flex-wrap gap-4 mb-4 justify-center">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="card rounded-xl w-4/5 md:w-1/4 bg-white drop-shadow-lg rounded-xl p-5 py-4 relative cursor-pointer hover:scale-105 transition-all duration-300"
                  onClick={() => handleUserClick(item)}
                >
                  <div className="w-full md:w-6/6">
                    <div className="img-area h-32 md:h-56 flex justify-center">
                      <img
                        src={item.profile ? item.profile : avatar}
                        alt={item.username}
                        className="rounded-lg w-4/6 h-full md:w-full md:h-full"
                      />
                    </div>
                  </div>
                  <div className="text-area mt-2 md:mt-6">
                    <p className="text-black font-semibold">{item.username}</p>
                  </div>
                  <div className="cta flex space-x-2 py-3">
                    <button
                      className="py-1 w-3/6 md:w-2/6 bg-white border border-gray-400 rounded-xl"
                      type="button"
                    >
                      user
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
