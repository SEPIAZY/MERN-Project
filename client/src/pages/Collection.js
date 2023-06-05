import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.jpg";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";
import { verifyPassword } from "../helper/helper";
import Navbar from "../components/Nav";
import { searchItem } from "../helper/helper";
import { IoIosSearch, IoIosRefresh } from "react-icons/io";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function MyCollection() {
  return (
    <div className="bg-white">
      <Navbar />
      <div className="mt-14 flex flex-col items-center justify-center ">
        <h1 className="text-2xl text-black font-bold">BE@RBRICK's World</h1>
        <p className="mt-2 ml-5 text-normal text-gray-500">
          Let's collect your favortite BE@RBRICK and see other's collection!
        </p>
      </div>
    </div>
  );
}
