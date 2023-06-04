import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import convertToBase64 from "../helper/convert";
import { addItem, searchItem } from "../helper/helper";
import { getNumberOfItems } from "../helper/helper";
import { getItemsData } from "../helper/helper";
import { deleteItem } from "../helper/helper";  
import Navbar from "../components/Nav";
import { IoIosSearch } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoIosRefresh } from "react-icons/io";

export default function UpdateItemPanel() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [filterBar, setFilterBar] = useState(false);
  const [filterBox, setFilterBox] = useState(false);
  const [text, setText] = useState();
  const [activeSize, setActiveSize] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [activePublish, setActivePublish] = useState(null);
  const [id, setId] = useState();

  var size = ["100%", "400%", "1000%", "100% + 400%"];
  var type = ["Artist", "License"];
  var publish = ["Newest", "Latest"];


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await searchItem({
  //       _id: id,
  //       name: text,
  //       size: activeSize,
  //       type: activeType,
  //       createdAt: activePublish,
  //     });
  //     setItems(result);
  //   };
  
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log(id,text, activeSize, activeType, activePublish);
      const result = await searchItem({
        _id: id,
        name: text,
        size: activeSize,
        type: activeType,
        createdAt: activePublish,
      });
      setItems(result);
      console.log(result);
    };
  
    fetchData();

  }, [id, text, activeSize, activeType, activePublish]);

  // useEffect(() => {
  //   //fetch number of items
  //   const fetchResultsCount = async () => {
  //     const numberOfItems = items.length;
  //     setResultsCount(numberOfItems);
  //   };
  //   fetchResultsCount();
  // }, [items]);

  // useEffect(() => {
  //   //fetch items data
  //   const fetchItemsData = async () => {
  //     try {
  //       const itemsData = await getItemsData();
  //       setItems(itemsData);
  //     } catch (error) {
  //       console.error("Error fetching items:", error);
  //       setItems([]);
  //     }
  //   };

  //   fetchItemsData();
  // }, []);

  const inputonChange = async (e) => {
    setText(e.target.value)
  };
  
  //filterBar function
  const handleFilterBar = () => {
    setFilterBar(!filterBar);
    setFilterBox(!filterBox);
  };

  const handleComfirm = async (itemId) => {
    Swal.fire({
      title: "Delete this item?",
      text: "This item will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log(itemId);
          await deleteItem(itemId);
          Swal.fire("Deleted!", "Item has been deleted.", "success");
          // Update the items state to remove the deleted item
          setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
        } catch (error) {
          console.error("Error deleting item:", error);
          Swal.fire("Error", "Failed to delete item.", "error");
        }
      }
    });
  };

  const handleRefresh = () => {
    setActiveSize(null);
    setActiveType(null);
    setActivePublish(null);
  };

  const formik = useFormik({
    initialValues: {
      _id: "",
      name: "",
      type: "",
      size: "",
      createdAt: "",
    },
  });

  const handleSizeClick = (buttonIndex, value) => {
    setActiveSize(size[buttonIndex]);
    formik.setFieldValue("size", value);
    // console.log(formik.values);
  };
  const handleTypeClick = (buttonIndex, value) => {
    setActiveType(type[buttonIndex]);
    formik.setFieldValue("type", value);
    // console.log(formik.values);
  };
  const handlePublishClick = (buttonIndex, value) => {
    setActivePublish(publish[buttonIndex]);
    formik.setFieldValue("publish", value);
    // console.log(formik.values);
  };

  return (
    <div className="bg-white">
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
            className="w-3/5 h-12 pl-10 pr-32 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            onChange={(e) => inputonChange(e)}
          />
          <button
            className="w-1/6 md:w-1/12 h-12 bg-white border border-gray-400 text-black px-4 py-2 rounded-xl ml-2"
            onClick={handleFilterBar}
          >
            Filter
          </button>
          <button 
            className="h-12 px-4 py-2 border border-gray-400 rounded-xl ml-2"
            onClick={handleRefresh}
          >
            <IoIosRefresh 
            className="text-xl text-black cursor-pointer" 
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-start">
        <span className="px-8 md:px-32 text-gray-500">
          {items.length} result found
        </span>
        <hr className="mt-2 border-gray-300 w-full" />
      </div>
      {filterBar && (
        <div>
          <div className="container mx-auto">
            <div className="px-6 py-6 flex overflow-x-auto">
              <div className="card-container flex flex-wrap gap-4 justify-center w-full sm:w-2/5 md:w-full">
                <div className="card flex-1 rounded-xl w-full bg-white border border-gray-300 rounded-xl p-5 py-4 relative">
                  <div className="w-full">
                    <div className="text-area ">
                      <p className="text-black font-semibold">Size</p>
                      <div className="cta flex space-x-2 py-3">
                        <button
                          className={`py-1 w-2/6 md:w-2/6 bg-white border border-gray-400 rounded-xl ${
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
                          className={`py-1 w-2/6 md:w-2/6 bg-white border border-gray-400 rounded-xl ${
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
                          className={`py-1 w-2/6 md:w-2/6 bg-white border border-gray-400 rounded-xl ${
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
                          className={`py-1 w-3/6 md:w-4/6 bg-white border border-gray-400 rounded-xl ${
                            activeSize === "100% + 400%"
                              ? "bg-black text-white"
                              : "bg-white"
                          }`}
                          onClick={() => handleSizeClick(3, "100% + 400%")}
                          type="button"
                        >
                          100% + 400%
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card flex-1 rounded-xl w-full bg-white border border-gray-300 rounded-xl p-5 py-4 relative">
                  <div className="w-full">
                    <div className="text-area">
                      <p className="text-black font-semibold">Type</p>
                      <div className="cta flex space-x-2 py-3">
                        <button
                          className={`px-2 py-1 w-2/6 md:w-2/6 bg-white border border-gray-400 rounded-xl ${
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
                          className={`px-2 py-1 w-2/6 md:w-2/6 bg-white border border-gray-400 rounded-xl ${
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
                {/* <div className="card flex-1 rounded-xl w-full bg-white border border-gray-300 rounded-xl p-5 py-4 relative">
                  <div className="w-full">
                    <div className="text-area ">
                      <p className="text-black font-semibold">Publish</p>
                      <div className="cta flex space-x-2 py-3">
                        <button
                          className={`py-1 w-2/6 md:w-2/6 bg-white border border-gray-400 rounded-xl ${
                            activePublish === 6
                              ? "bg-black text-white"
                              : "bg-white"
                          }`}
                          onClick={() => handlePublishClick(0, "Newest")}
                          type="button"
                        >
                          Newest
                        </button>
                        <button
                          className={`py-1 w-2/6 md:w-2/6 bg-white border border-gray-400 rounded-xl ${
                            activePublish === 7
                              ? "bg-black text-white"
                              : "bg-white"
                          }`}
                          onClick={() => handlePublishClick(1, "Latest")}
                          type="button"
                        >
                          Latest
                        </button>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <hr className="mt-2 border-gray-300 w-full" />
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
                    <FaTrash
                      className="ml-auto mr-auto absolute top-7 right-9 text-2xl text-gray-400 cursor-pointer hover:text-black"
                      onClick={() => {
                        handleComfirm(item._id);
                      }}
                    />
  
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
                    <div className="cta flex space-x-3 py-3">
                      <button
                        className="py-1 w-3/6 md:w-4/6 bg-white border border-gray-400 rounded-xl"
                        type="button"
                      >
                        {item.size}
                      </button>
                      <button
                        className="py-1 w-3/6 md:w-4/6 bg-white border border-gray-400 rounded-xl"
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
