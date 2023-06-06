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

export default function SocialUser() {
  const [filterBar, setFilterBar] = useState(false);
  const [filterBox, setFilterBox] = useState(false);
  const [text, setText] = useState();
  const [activeSize, setActiveSize] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [activePublish, setActivePublish] = useState(null);
  const [activeSort, setActiveSort] = useState(null);
  const [items, setItems] = useState([]);
  const [id, setId] = useState();
  const [refresh, setRefresh] = useState(false);
  const [{ isLoading, apiData, serverError }] = useFetch();

  const inputonChange = async (e) => {
    setText(e.target.value);
  };
  const handleFilterBar = () => {
    setFilterBar(!filterBar);
    setFilterBox(!filterBox);
  };
  const handleRefresh = () => {
    setActiveSize(null);
    setActiveType(null);
    setActiveSort(null);
  };

  var size = ["100%", "400%", "1000%", "100% + 400%"];
  var type = ["Artist", "License"];
  var sort = ["Most Popular", "User"];

  const handleSizeClick = (buttonIndex, value) => {
    setActiveSize(size[buttonIndex]);
    formik.setFieldValue("size", value);
  };
  const handleTypeClick = (buttonIndex, value) => {
    setActiveType(type[buttonIndex]);
    formik.setFieldValue("type", value);
  };
  const handleSortClick = (buttonIndex, value) => {
    setActiveSort(sort[buttonIndex]);
    formik.setFieldValue("sort", value);
  };
  const formik = useFormik({
    initialValues: {
      _id: apiData?._id || "",
      name: "",
      type: "",
      size: "",
      createdAt: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      // console.log(id, text, activeSize, activeType, activePublish);
      const result = await searchItem({
        _id: id,
        name: text,
        size: activeSize,
        type: activeType,
        createdAt: activePublish,
      });

      setItems(result);
      // console.log(result);
    };

    fetchData();
  }, [id, text, activeSize, activeType, activePublish, refresh]);

  const [likedItems, setLikedItems] = useState([]);

  const handleLike = (itemId) => {
    const userid = apiData?._id;
    if (userid) {
      // console.log("userid:", userid, "likedItems:", likedItems);

      setItems((prevItems) => {
        return prevItems.map((item) => {
          if (item._id === itemId) {
            const updatedItem = { ...item, liked: !item.liked };
            if (updatedItem.liked) {
              setLikedItems((prevLikedItems) => [...prevLikedItems, itemId]);
            } else {
              setLikedItems((prevLikedItems) =>
                prevLikedItems.filter((id) => id !== itemId)
              );
            }
            updateUserCollection(userid, [...likedItems, itemId]);
            return updatedItem;
          }
          return item;
        });
      });
    }
  };

  const isItemInCollection = (itemId) => {
    const userid = apiData?._id;
    if (userid) {
      return likedItems.includes(itemId);
    }
    return false;
  };

  const handleOfTheColorOfHeart = (itemId) => {
    if (isItemInCollection(itemId)) {
      return "red";
    } else {
      return "gray";
    }
  };

  return (
    <div className="bg-white">
      <Navbar />
      <div className="mt-14 flex flex-col items-center justify-center ">
        <h1 className="text-2xl text-black font-bold">BE@RBRICK's World</h1>
        <p className="mt-2 ml-5 text-normal text-gray-500">
          Let's collect your favortite BE@RBRICK!
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
                className="w-1/6 md:w-2/12 h-10 md:h-12 text-sm bg-white border border-gray-400 text-black px-4 py-2 rounded-xl ml-1 md:ml-2"
                onClick={handleFilterBar}
              >
                Filter
              </button>
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

      {filterBar && (
        <div>
          <div className="container mx-auto">
            <div className="px-6 py-0 md:py-6 flex overflow-x-auto">
              <div className="card-container flex flex-wrap gap-4 justify-center w-full sm:w-2/5 md:w-full">
                <div className="card flex-1 rounded-xl w-full bg-white border border-gray-300 rounded-xl p-5 py-4 relative">
                  <div className="w-full">
                    <div className="text-area ">
                      <p className="text-black font-semibold">Size</p>
                      <div className="cta flex space-x-2 py-2 md:py-3">
                        <button
                          className={`py-1 w-3/12 md:w-2/6 h-10 bg-white border border-gray-400 rounded-xl ${
                            activeSize === "100%"
                              ? "bg-black text-white"
                              : "bg-white"
                          }`}
                          onClick={() => handleSizeClick(0, "100%")}
                          type="button"
                        >
                          100%
                        </button>
                        <button
                          className={`py-1 w-3/12 md:w-2/6 h-10 bg-white border border-gray-400 rounded-xl ${
                            activeSize === "400%"
                              ? "bg-black text-white"
                              : "bg-white"
                          }`}
                          onClick={() => handleSizeClick(1, "400%")}
                          type="button"
                        >
                          400%
                        </button>
                        <button
                          className={`py-1 w-3/12 md:w-2/6 h-10 bg-white border border-gray-400 rounded-xl ${
                            activeSize === "1000%"
                              ? "bg-black text-white"
                              : "bg-white"
                          }`}
                          onClick={() => handleSizeClick(2, "1000%")}
                          type="button"
                        >
                          1000%
                        </button>
                        <button
                          className={`py-1 w-6/12 md:w-4/6 h-10 bg-white border border-gray-400 rounded-xl ${
                            activeSize === "100% + 400%"
                              ? "bg-black text-white"
                              : "bg-white"
                          }`}
                          onClick={() => handleSizeClick(3, "100% + 400%")}
                          type="button"
                        >
                          100%+400%
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card flex-1 rounded-xl w-full bg-white border border-gray-300 rounded-xl p-5 py-4 relative">
                  <div className="w-full">
                    <div className="text-area">
                      <p className="text-black font-semibold">Type</p>
                      <div className="cta flex space-x-2 py-2 md:py-3">
                        <button
                          className={`px-2 py-1 w-2/6 md:w-2/6 h-10 bg-white border border-gray-400 rounded-xl ${
                            activeType === "Artist"
                              ? "bg-black text-white"
                              : "bg-white"
                          }`}
                          onClick={() => handleTypeClick(0, "Artist")}
                          type="button"
                        >
                          Artist
                        </button>
                        <button
                          className={`px-2 py-1 w-2/6 md:w-2/6 h-10 bg-white border border-gray-400 rounded-xl ${
                            activeType === "License"
                              ? "bg-black text-white"
                              : "bg-white"
                          }`}
                          onClick={() => handleTypeClick(1, "License")}
                          type="button"
                        >
                          License
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card flex-1 rounded-xl w-full bg-white border border-gray-300 rounded-xl p-5 py-4 relative">
                  <div className="w-full">
                    <div className="text-area">
                      <p className="text-black font-semibold">Sort</p>
                      <div className="cta flex space-x-2 py-2 md:py-3">
                        <button
                          className={`px-2 py-1 w-3/6 md:w-3/6 h-10 bg-white border border-gray-400 rounded-xl ${
                            activeSort === "Most Popular"
                              ? "bg-black text-white"
                              : "bg-white"
                          }`}
                          onClick={() => handleSortClick(0, "Most Popular")}
                          type="button"
                        >
                          Most Popular
                        </button>
                        <button
                          className={`px-2 py-1 w-2/6 md:w-2/6 h-10 bg-white border border-gray-400 rounded-xl ${
                            activeSort === "User"
                              ? "bg-black text-white"
                              : "bg-white"
                          }`}
                          onClick={() => handleSortClick(1, "User")}
                          type="button"
                        >
                          User
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="mt-4 md:mt-2 border-gray-300 w-full" />
        </div>
      )}

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
                    onClick={() => handleLike(item._id)}
                    className={`absolute top-5 right-7 w-12 h-12 rounded-full bg-white border border-gray-300 flex justify-center items-center
                    ${handleOfTheColorOfHeart(item._id)}`}
                  >
                    {isItemInCollection(item._id) ? (
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
