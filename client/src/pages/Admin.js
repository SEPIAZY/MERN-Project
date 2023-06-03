import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useAuthStore } from "../store/store";
import Navbar from "../components/Nav";
import toast, { Toaster } from "react-hot-toast";
import { IoIosSearch } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import AddItemPanel from "../components/AddItem";


export default function Admin() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [items, setItems] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };


  
  return (
    <main>
      <Navbar />
      <div className="container mx-auto py-6">
        <div className="flex flex-col justify-center items-start">
          <h1 className="px-6 py-3 text-4xl font-bold tracking-wider">
            BEARBRICK Database
          </h1>
        </div>
        <div className="flex flex-row">
          <IoIosSearch className="relative top-3 left-10 w-6 h-6 text-gray-500" />
          <input
            type="text"
            placeholder="   Search"
            className="w-3/5 h-12 pl-10 pr-32 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent shadow-md"
          />
          <button
            className="w-28 h-12 bg-white text-black px-4 py-2 rounded-xl ml-2 shadow-md"
          >
            Add Item
          </button>
          <button
            className="w-24 h-12 bg-white text-black px-4 py-2 rounded-xl ml-2 shadow-md"
          >
            Filter
          </button>
          
        </div>
        
      </div>
    </main>
  );
}
