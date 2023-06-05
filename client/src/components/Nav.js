import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.jpg";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";
import { verifyPassword } from "../helper/helper";

import styles from "../styles/Landing.module.css";
import { IoLogOutOutline } from "react-icons/io5";

export default function Navbar() {
  const navigate = useNavigate();

  const storedData = localStorage.getItem("data");
  let username = null;
  let email = null;
  let profile = null;
  let role = null;

  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      username = parsedData.username;
      email = parsedData.email;
      profile = parsedData.profile;
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

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownItemClick = (path) => {
    setShowDropdown(!showDropdown);
    navigate(path);
  };

  return (
    <div className="bg-white border shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-neutral-800 text-2xl font-bold cursor-pointer">
              B E @ R
            </h1>
          </div>

          <div className="hidden sm:flex space-x-12">
            <button
              className="text-lg hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/landingpage")}
            >
              Home
            </button>
            <button
              className="text-lg hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/social")}
            >
              Social
            </button>
            <button 
              className="text-lg hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/collection")}
            >
              Collection
            </button>
            <button className="text-lg hover:scale-105 transition-all duration-300">
              QR Code
            </button>
            {role === "admin" && (
              <div className="relative inline-block text-left">
                <button
                  className="text-lg hover:scale-105 transition-all duration-300"
                  onClick={handleDropdownItemClick}
                >
                  Admin
                </button>
                {showDropdown && (
                  <div className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 text-lg text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900"
                        role="menuitem"
                        onClick={() => handleDropdownItemClick("/admin/user-request")}
                      >
                        User Request
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-lg text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900"
                        role="menuitem"
                        onClick={() => handleDropdownItemClick("/admin/user-manage")}
                      >
                        User Manage
                      </a>
                      <a
                        className="block px-4 py-2 text-lg text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900"
                        role="menuitem"
                        onClick={() => handleDropdownItemClick("/additem")}
                      >
                        Create Item
                      </a>
                      <a
                        className="block px-4 py-2 text-lg text-neutral-900 hover:bg-neutral-100 hover:text-neutral-900"
                        role="menuitem"
                        onClick={() => handleDropdownItemClick("/updateitem")}
                      >
                        Update Item
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center">
            <button
              type="button"
              className="hidden sm:flex w-full text-neutral-900 transform hover:scale-105 px-3 py-2 rounded-xl text-lg font-base transition-all duration-300"
              onClick={logout}
            >
              <IoLogOutOutline className="inline-block mr-2 mt-1 text-lg" />
              Sign out
            </button>
            {/* Hamburger Menu */}
            <button
              type="button"
              className="sm:hidden text-neutral-900 text-xl"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        {/* Responsive Menu */}
        {isOpen && (
          <div className="sm:hidden bg-white py-2 px-4 absolute top-16 right-0 z-10 border shadow">
            <div className="flex flex-col space-y-2">
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
              <a
                href="#"
                className="text-neutral-900 px-3 py-2 rounded-md text-lg font-medium cursor-pointer"
              >
                Profile
              </a>
              {/* Admin Link */}
              {role === "admin" && (
                <div
                  className="text-neutral-900 px-3 py-2 rounded-md text-lg font-medium cursor-pointer"
                  onClick={() => navigate("/admin")}
                >
                  Admin
                </div>
              )}
            </div>
            {/* Logout Button */}
            <button
              type="button"
              className="w-full text-neutral-900 transform hover:scale-105 px-3 py-2 rounded-xl text-lg font-base transition-all duration-300"
              onClick={logout}
            >
              <IoLogOutOutline className="inline-block mr-2 text-lg" />
              Sign out
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}
