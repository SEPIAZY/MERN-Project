import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.jpg";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import useFetch from "../hooks/fetch.hook";
import Navbar from "../components/Nav";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import styles from "../styles/Username.module.css";
import extend from "../styles/Profile.module.css";
import { BsTable } from "react-icons/bs";
import { searchItem } from "../helper/helper";


export default function MyCollection() {
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate();
  const [id, setId] = useState();
  const [text, setText] = useState();
  const [activeSize, setActiveSize] = useState(null);
  const [activeType, setActiveType] = useState(null);

  const formik = useFormik({
    initialValues: {
      _id: apiData?._id || "",
      username: apiData?.username || "",
      email: apiData?.email || "",
      bio: apiData?.bio || "",
      profile: apiData?.profile || "",
      item: apiData?.item || [],
    },
  });

  const [likedItems, setLikedItems] = useState([]);
  const [items, setItems] = useState([]);
  const handleLike = (itemId) => {
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
          return updatedItem;
        }
        return item;
      });
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await searchItem({
        _id: id,
        name: text,
        size: activeSize,
        type: activeType,
        
      });
      setItems(result);
      const likedItemIds = apiData?.item || [];
      setLikedItems(likedItemIds);
    };

    fetchData();
  }, [id, text, activeSize, activeType, apiData]);

  return (
    <div className="bg-white">
      <Navbar />

      <div className="mt-10 flex flex-row items-center justify-center gap-10">
        <div className="profile flex justify-center py-4">
          <label htmlFor="profile">
            <img
              src={apiData?.profile || file || avatar}
              className={`${styles.profile_img} ${extend.profile_img}`}
              alt="avatar"
            />
          </label>
        </div>
        <div className="textbox flex flex-col items-start gap-4">
          <div className="flex flex-row">
            <p className="text-xl text-gray-600">Hello, </p>
            <h1 className="ml-2 text-xl font-base">
              {apiData?.username || "username"}
            </h1>
            <button className="ml-5 w-2/4 md:w-full h-8 md:h-8 text-sm bg-white border border-gray-400 text-black px-4 rounded-xl"
            onClick={() => navigate("/profile")}
            >
              Edit profile
            </button>
          </div>
          <div className="flex flex-row">
            <p className="font-bold">{apiData?.item.length || 0} collections</p>
            <p className="ml-5 font-bold">500 likes</p>
          </div>
          <p className="ml-0 text-sm font-base">{apiData?.bio || "bio"}</p>
        </div>
      </div>
      
      <hr className="mt-10 border-gray-300 w-full"/>

      <div className="flex justify-center">
        <hr className="border-black w-1/12" />
      </div>

      <div className="mt-3 flex items-center justify-center px-8 md:px-32">
        <BsTable className="" />
        <span className="ml-2">collections</span>
      </div>
      
      <div className="container mx-auto">
        <div className="user collection">
          <div className="px-6 py-6 flex overflow-x-auto">
            <div className="ml-auto mr-auto card-container flex flex-wrap gap-4 mb-4 justify-center">
              {items.map((item) => {
                if (likedItems.includes(item._id)) {
                return(
                <div
                  key={item._id}
                  className="card rounded-xl w-4/5 md:w-1/4 bg-white drop-shadow-lg rounded-xl p-5 py-4 relative cursor-pointer hover:scale-105 transition-all duration-300"
                >
                  <button
                    onClick={() => handleLike(item._id)}
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
                );}
             })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
