import React from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.jpg";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";
import { verifyPassword } from "../helper/helper";
import Header from "../components/Nav";

import styles from "../styles/Landing.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Navbar from "../components/Nav";

export default function LandingPage() {
  const [toggle, setToggle] = React.useState(false);
  const like = () => {
    setToggle(!toggle);
  };
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

  return (
    <main>
      <Navbar />
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className="flex flex-col justify-center items-center">
          <div className={styles.glass}>
            <div className="title flex flex-col items-left py-24">
              <h4 className="text-black-800 text-4xl px-16 font-thin">
                Welcome to
              </h4>
              <h4 className="text-black-800 text-6xl px-16 font-bold">
                BE@RBRICK
              </h4>
              <span className="text-gray-350 text-lg w-2/3 text-left px-16 py-6">
                Share your bearbrick collection with the world
              </span>
              <div className="flex justify-start items-center px-16 py-2">
                <div className="w-4 h-4 rounded-full border-solid border border-black mr-4"></div>
                <div className="w-4 h-4 rounded-full border-solid border border-black bg-black mr-4"></div>
                <div className="w-4 h-4 rounded-full border-solid border border-black mr-4"></div>
                <div className="w-4 h-4 rounded-full border-solid border border-black"></div>
              </div>
              <br></br>
              <br></br>
              <br></br>
              <span className="text-gray-350 text-lg w-2/3 text-left px-16 py-4">
                Let's create you bearbrick collection
              </span>
              <button className={styles.btn} type="button">
                Create
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center pt-14">
            <h2 className="text-black-800 text-4xl px-16 font-bold py-2">
              JUST DROPPED
            </h2>
            <h2 className="text-gray-500 text-xl px-16 font-normal py-2">
              Let's add to your collection!
            </h2>
            <div className="flex flex-row justify-center items-center space-x-4 py-4">
              <div className="card rounded-xl w-96 h-96 bg-white rounded-xl p-5 py-4 relative">
                <button
                  onClick={() => like()}
                  className="absolute top-7 right-9 w-12 h-12 rounded-full bg-white shadow flex justify-center items-center"
                >
                  {toggle ? (
                    <>
                      <AiFillHeart
                        className="w-5 h-5 text-red-500"
                        strokeWidth={0.1}
                      />
                    </>
                  ) : (
                    <>
                      <AiOutlineHeart
                        className="w-5 h-5 text-gray-500"
                        strokeWidth={0.1}
                      />
                    </>
                  )}
                </button>
                <div className="img-area">
                  <img
                    src="images/bear.png"
                    alt="bear1"
                    className="rounded-lg"
                  />
                </div>
                <div className="text-area mt-6">
                  <p className="text-black font-semibold">
                    BE@RBRICK Porcelain K.Olin tribu x Medicom - The Toy
                    Chronicle
                  </p>
                </div>
                <div className="cta grid grid-cols-2 py-3">
                  <button
                    className="py-1 w-20 bg-white border border-gray-400 rounded-xl"
                    type="button"
                  >
                    100%
                  </button>
                  <p className="py-1 ml-auto">2 collected</p>
                </div>
              </div>

              <div className="card rounded-xl w-96 h-96 bg-white rounded-xl p-5 py-4 relative">
                <button
                  onClick={() => like()}
                  className="absolute top-7 right-9 w-12 h-12 rounded-full bg-white shadow flex justify-center items-center"
                >
                  {toggle ? (
                    <>
                      <AiFillHeart
                        className="w-5 h-5 text-red-500"
                        strokeWidth={0.1}
                      />
                    </>
                  ) : (
                    <>
                      <AiOutlineHeart
                        className="w-5 h-5 text-gray-500"
                        strokeWidth={0.1}
                      />
                    </>
                  )}
                </button>
                <div className="img-area">
                  <img src="images/bear.png" alt="bear2" class="rounded-lg" />
                </div>
                <div className="text-area mt-6">
                  <p className="text-black font-semibold">
                    BE@RBRICK Porcelain K.Olin tribu x Medicom - The Toy
                    Chronicle
                  </p>
                </div>
                <div className="cta grid grid-cols-2 py-3">
                  <button
                    className="py-1 w-20 bg-white border border-gray-400 rounded-xl"
                    type="button"
                  >
                    100%
                  </button>
                  <p className="py-1 ml-auto">2 collected</p>
                </div>
              </div>

              <div className="card rounded-xl w-96 h-96 bg-white rounded-xl p-5 py-4 relative">
                <button
                  onClick={() => like()}
                  className="absolute top-7 right-9 w-12 h-12 rounded-full bg-white shadow  flex justify-center items-center"
                >
                  {toggle ? (
                    <>
                      <AiFillHeart
                        className="w-5 h-5 text-red-500"
                        strokeWidth={0.1}
                      />
                    </>
                  ) : (
                    <>
                      <AiOutlineHeart
                        className="w-5 h-5 text-gray-500"
                        strokeWidth={0.1}
                      />
                    </>
                  )}
                </button>
                <div className="img-area">
                  <img src="images/bear.png" alt="bear2" class="rounded-lg" />
                </div>
                <div className="text-area mt-6">
                  <p className="text-black font-semibold">
                    BE@RBRICK Porcelain K.Olin tribu x Medicom - The Toy
                    Chronicle
                  </p>
                </div>
                <div className="cta grid grid-cols-2 py-3">
                  <button
                    className="py-1 w-20 bg-white border border-gray-400 rounded-xl"
                    type="button"
                  >
                    100%
                  </button>
                  <p className="py-1 ml-auto">2 collected</p>
                </div>
              </div>

              <div className="card rounded-xl w-96 h-96 bg-white rounded-xl p-5 py-4 relative">
                <button
                  onClick={() => like()}
                  className="absolute top-7 right-9 w-12 h-12 rounded-full bg-white shadow  flex justify-center items-center"
                >
                  {toggle ? (
                    <>
                      <AiFillHeart
                        className="w-5 h-5 text-red-500"
                        strokeWidth={0.1}
                      />
                    </>
                  ) : (
                    <>
                      <AiOutlineHeart
                        className="w-5 h-5 text-gray-500"
                        strokeWidth={0.1}
                      />
                    </>
                  )}
                </button>
                <div className="img-area">
                  <img src="images/bear.png" alt="bear2" class="rounded-lg" />
                </div>
                <div className="text-area mt-6">
                  <p className="text-black font-semibold">
                    BE@RBRICK Porcelain K.Olin tribu x Medicom - The Toy
                    Chronicle
                  </p>
                </div>
                <div className="cta grid grid-cols-2 py-3">
                  <button
                    className="py-1 w-20 bg-white border border-gray-400 rounded-xl"
                    type="button"
                  >
                    100%
                  </button>
                  <p className="py-1 ml-auto">2 collected</p>
                </div>
              </div>

              <div className="card rounded-xl w-96 h-96 bg-white rounded-xl p-5 py-4 relative">
                <button
                  onClick={() => like()}
                  className="absolute top-7 right-9 w-12 h-12 rounded-full bg-white shadow flex justify-center items-center"
                >
                  {toggle ? (
                    <>
                      <AiFillHeart
                        className="w-5 h-5 text-red-500"
                        strokeWidth={0.1}
                      />
                    </>
                  ) : (
                    <>
                      <AiOutlineHeart
                        className="w-5 h-5 text-gray-500"
                        strokeWidth={0.1}
                      />
                    </>
                  )}
                </button>
                <div className="img-area">
                  <img src="images/bear.png" alt="bear2" class="rounded-lg" />
                </div>
                <div className="text-area mt-6">
                  <p className="text-black font-semibold">
                    BE@RBRICK Porcelain K.Olin tribu x Medicom - The Toy
                    Chronicle
                  </p>
                </div>
                <div className="cta grid grid-cols-2 py-3">
                  <button
                    className="py-1 w-20 bg-white border border-gray-400 rounded-xl"
                    type="button"
                  >
                    100%
                  </button>
                  <p className="py-1 ml-auto">2 collected</p>
                </div>
              </div>
            </div>

            <div
              className="flex flex-row justify-center items-stretch space-x-4"
              style={{ width: "200rem", height: "40rem" }}
            >
              <div className="relative w-full h-full">
                <img
                  src="images/poster3.jpg"
                  className="rounded-3xl w-full h-full"
                />
                <div className="cta grid grid-cols-2 py-3 absolute bottom-4">
                  <button
                    className="py-1 w-36 h-12 bg-white rounded-3xl shadow-md ml-12 hover:opacity-80 font-blod tracking-wide"
                    type="button"
                  >
                    See More
                  </button>
                  <div className="flex items-center justify-start space-x-1 ml-1">
                    <span className="font-semibold text-white text-lg">
                      New items
                    </span>
                    <span className="px-1 font-semibold text-white text-lg">
                      ·
                    </span>
                    <span className="font-thin text-white text-lg">
                      wait for new collection
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative w-full h-full">
                <img
                  src="images/poster3.jpg"
                  className="rounded-3xl w-full h-full"
                />
                <div className="cta grid grid-cols-2 py-3 absolute bottom-4">
                  <button
                    className="py-1 w-36 h-12 bg-white rounded-3xl shadow-md ml-12 hover:opacity-80 font-bold tracking-wide"
                    type="button"
                  >
                    See More
                  </button>
                  <div className="flex items-center justify-start space-x-1 ml-1">
                    <span className="font-semibold text-white text-lg">
                      Hot items
                    </span>
                    <span className="px-1 font-semibold text-white text-lg">
                      ·
                    </span>
                    <span className="font-thin text-white text-lg">
                      shadow-nendo
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative w-full h-full">
                <img
                  src="images/poster3.jpg"
                  className="rounded-3xl w-full h-full"
                />
                {/* <img src="images/poster6.jpg" className='rounded-3xl object-cover h-58 w-96 md:object-scale-down '/> */}
                <div className="cta grid grid-cols-2 py-3 absolute bottom-4">
                  <button
                    className="py-1 w-36 h-12 bg-white rounded-3xl shadow-md ml-12 hover:opacity-80 font-bold tracking-wide"
                    type="button"
                  >
                    See More
                  </button>
                  <div className="flex items-center justify-start space-x-1 ml-1">
                    <span className="font-semibold text-white text-lg">
                      Rare items
                    </span>
                    <span className="px-1 font-semibold text-white text-lg">
                      ·
                    </span>
                    <span className="font-thin text-white text-lg">
                      Colorful bearbrick
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
