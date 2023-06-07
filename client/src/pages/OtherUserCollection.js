import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.jpg";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import useFetch from "../hooks/fetch.hook";
import Navbar from "../components/Nav";
import styles from "../styles/Username.module.css";
import extend from "../styles/Profile.module.css";
import { BsTable } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { fetchOtherUserCollection, searchItem } from "../helper/helper";
import { deleteUserCollection } from "../helper/helper";
import { useLocation } from "react-router-dom";
import {RiBearSmileLine} from "react-icons/ri";

export default function UserCollection() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = new URLSearchParams(location.search).get("username");
  const userId = new URLSearchParams(location.search).get("id");
  const [apiData, setApiData] = useState({});
  const [file, setFile] = useState();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchUserCollection = async () => {
      try {
        const userCollection = await fetchOtherUserCollection(userId);
        
        setItems(userCollection.collection); // Set the items from the user's collection
        setApiData({
          username: userCollection.username,
          bio: userCollection.bio,
          profile: userCollection.profile,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setItems([]);
        setApiData({});
      }
    };

    fetchUserCollection();
  }, [userId]);

  return (
    <div className="bg-white">
      <Navbar />
      <div
        className="mt-5 ml-10 md:mt-10 md:ml-32 text-xl text-black font-base cursor-pointer hover:underline"
        onClick={() => navigate(`/friend`)}
      >
        Back
      </div>
  
      <div className="mt-2 flex flex-row items-center justify-center gap-10">
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
            <h1 className="text-xl font-base">
              {apiData?.username || "username"}
            </h1>
          </div>
          <div className="flex flex-row">
            <p className="font-bold">{items.length || 0} collections</p>
            
          </div>
          <p className="ml-0 text-sm font-base">{apiData?.bio || ""}</p>
        </div>
      </div>
  
      <hr className="mt-4 md:mt-10 border-gray-300 w-full" />
  
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
            <div className="ml-auto mr-auto w-full card-container flex flex-wrap gap-4 mb-4 justify-center">
              {items.length === 0 ? (
                <div className="md:mt-12 text-2xl text-center font-bold">
                  <div className="md:ml-auto md:mr-auto w-24 h-24 rounded-full bg-white border border-gray-300 flex justify-center items-center"> 
                    <RiBearSmileLine className="text-4xl text-gray-500"/>
                  </div>
                  <p className="mt-7">No Collections</p>
                  <br></br>
                  <br></br>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item._id}
                    className="card rounded-xl w-4/5 md:w-1/4 bg-white drop-shadow-lg rounded-xl p-5 py-4 relative cursor-pointer hover:scale-105 transition-all duration-300"
                  >
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
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}
