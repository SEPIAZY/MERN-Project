import React, { useState } from "react";
import { useFormik } from "formik";
import avatar from "../assets/profile.jpg";
import toast, { Toaster } from "react-hot-toast";
import convertToBase64 from "../helper/convert";
import { IoIosCloseCircle } from "react-icons/io";
import Navbar from "../components/Nav";
import { userRequestItem } from "../helper/helper";

export default function UserRequest() {
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      size: "",
      image: ""
    },
    onSubmit: async (values) => {
      values = await Object.assign(values, { image: file || "" });
      console.log(values);
      let reqitemPromise = userRequestItem(values);
      toast.promise(reqitemPromise, {
        loading: "Sending...",
        success: <b>Request Item Successfully!</b>,
        error: <b>Could not request item.</b>,
      });
    },
  });
  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async (e) => {
    try {
      const base64 = await convertToBase64(e.target.files[0]);
      setFile(base64);
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  const [activeSize, setActiveSize] = useState(null);
  const [activeType, setActiveType] = useState(null);

  const handleSizeClick = (buttonIndex, value) => {
    setActiveSize(buttonIndex);
    formik.setFieldValue("size", value);
    // console.log(formik.values);
  };
  const handleTypeClick = (buttonIndex, value) => {
    setActiveType(buttonIndex);
    formik.setFieldValue("type", value);
    // console.log(formik.values);
  };

  const handleResetForm = () => {
    formik.resetForm();
    setActiveSize(null);
    setActiveType(null);
    setFile(null);
  };

  return (
    <div className="bg-white">
      <Navbar />
      <div className="container mx-auto py-6">
        
        <div className="flex flex-col justify-center items-start">
          <h1 className="px-6 py-3 text-4xl font-bold tracking-wide">
            Request Item
          </h1>
          <p className="px-6 text-gray-500">
            Let us know what you want to see new item on our website!
          </p>
        </div>
        <br></br>
        <div className="card rounded-xl bg-white bg-opacity-70 rounded-xl p-8 border border-gray-400 ">
          <form
            className="flex flex-col md:flex-row md:justify-between gap-5"
            onSubmit={formik.handleSubmit}
          >
            <div className="img-area w-full md:w-1/2">
              <div className="flex justify-center mt-14 h-80">
                <label htmlFor="image">
                  <img
                    src={file || avatar}
                    className="cursor-pointer rounded-xl shadow-md"
                    style={{ width: "100%", height: "100%" }}
                  />
                </label>
              </div>
              <input onChange={onUpload} type="file" id="image" name="image" />
            </div>
            <div className="text-area w-full md:w-1/2">
              <IoIosCloseCircle
                className="ml-auto text-4xl text-gray-400 cursor-pointer hover:text-black"
                onClick={handleResetForm}
              />
              <div className="text-lg font-semibold tracking-wider">Name</div>
              <div className="py-2">
                <input
                  {...formik.getFieldProps("name")}
                  className="ml-2 h-12 text-lg p-5 bg-white border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  type="text"
                  placeholder="Name"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="mt-4 text-lg font-semibold tracking-wider">
                Size
              </div>
              <div className="flex-row">
                <button
                  className={`mt-2 ml-2 w-20 h-9 border border-gray-400 rounded-xl ${
                    activeSize === 0 ? "bg-black text-white" : "bg-white"
                  }`}
                  onClick={() => handleSizeClick(0, "100%")}
                >
                  100%
                </button>
                <button
                  className={`mt-2 ml-2 w-20 h-9 border border-gray-400 rounded-xl ${
                    activeSize === 1 ? "bg-black text-white" : "bg-white"
                  }`}
                  onClick={() => handleSizeClick(1, "400%")}
                >
                  400%
                </button>
                <button
                  className={`mt-2 ml-2 w-20 h-9 border border-gray-400 rounded-xl ${
                    activeSize === 2 ? "bg-black text-white" : "bg-white"
                  }`}
                  onClick={() => handleSizeClick(2, "1000%")}
                >
                  1000%
                </button>
                <button
                  className={`mt-2 ml-2 w-36 h-9 border border-gray-400 rounded-xl ${
                    activeSize === 3 ? "bg-black text-white" : "bg-white"
                  }`}
                  onClick={() => handleSizeClick(3, "100% + 400%")}
                >
                  100% + 400%
                </button>
              </div>
              <div className="mt-4 text-lg font-semibold tracking-wider">
                Type
              </div>
              <div className="flex-row space-x-2">
                <button
                  className={`mt-2 ml-2 w-20 h-9 border border-gray-400 rounded-xl ${
                    activeType === 4 ? "bg-black text-white" : "bg-white"
                  }`}
                  onClick={() => handleTypeClick(4, "Artist")}
                >
                  Artist
                </button>
                <button
                  className={`mt-2 ml-2 w-24 h-9 border border-gray-400 rounded-xl ${
                    activeType === 5 ? "bg-black text-white" : "bg-white"
                  }`}
                  onClick={() => handleTypeClick(5, "License")}
                >
                  License
                </button>
              </div>
              <div className="py-10">
                <button
                  className="w-full h-12 text-lg text-black bg-white border border-gray-400 rounded-xl hover:bg-black hover:text-white hover:scale-105 transition-all duration-300"
                  onClick={handleResetForm}
                >
                  Request Item
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <br></br>
    </div>
  );
}
