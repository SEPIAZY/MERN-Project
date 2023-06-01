import React from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.jpg";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";
import { verifyPassword } from "../helper/helper";

import styles from "../styles/Landing.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Navbar() {
    
    const navigate = useNavigate();
  
    const storedData = localStorage.getItem("data");
    let username = null;
    let role = null;
  
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        username = parsedData.username;
        role = parsedData.role;
      } catch (error) {
        console.error("Error parsing stored data:", error);
      }
    }
  
    const logout = () => {
      localStorage.removeItem("data");
      localStorage.removeItem("token");
      navigate("/");
    };

    return(
        <nav className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          <div className="flex items-center">
            <h1 className="text-neutral-800 text-2xl font-bold cursor-pointer">
              B E @ R
            </h1>
          </div>
          <div className="flex justify-center flex-grow">
            <div className="flex space-x-4">
              <a
                className="text-neutral-900 px-3 py-2 rounded-xl text-lg font-medium cursor-pointer"
                onClick={() => navigate("/social")}
              >
                Social
              </a>
              <a
                href="#"
                className="text-neutral-900 px-3 py-2 rounded-md text-lg font-medium cursor-pointer"
              >
                Collection
              </a>
              <a
                href="#"
                className="text-neutral-900 px-3 py-2 rounded-md text-lg font-medium cursor-pointer"
              >
                QR Code
              </a>
            </div>
          </div>
          <div className="flex items-center">
            {role === "admin" && (
              <div
                className="text-neutral-900 px-3 py-2 rounded-md text-lg font-medium cursor-pointer"
                onClick={() => navigate("/admin")}
              >
                Admin
              </div>
            )}
            <h4 className="text-neutral-900 px-3 py-2 rounded-md text-lg font-base">
              Hello {username}
            </h4>
            {/* <div className="h-16 w-16 rounded-full bg-gray-900 cursor-pointer"></div> */}
            <button
              type="button"
              className="w-28 h-12 text-neutral-900 bg-white bg-opacity-50 shadow-md transform hover:bg-white hover:scale-105 px-3 py-2 rounded-xl text-lg font-base transition-all duration-300"
              onClick={logout}
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>
    )
}