import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { searchItem } from "../helper/helper";
import styles from "../styles/Landing.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../components/Nav";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import poster from "../assets/poster6.jpg";
import posterblur from "../assets/posterblur.jpg";
import poster5 from "../assets/poster5.jpeg";
import bear from "../assets/bear.png";
import footer from "../components/Footer.js";
import Footer from "../components/Footer.js";

export default function LandingPage() {
  const [toggle, setToggle] = useState(false);
  const [items, setItems] = useState([]);
  const [activeSize, setActiveSize] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [id, setId] = useState();
  const [text, setText] = useState();
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

  useEffect(() => {
    const fetchData = async () => {
      // ... your searchItem logic ...

      const result = await searchItem({
        _id: id,
        name: text,
        size: activeSize,
        type: activeType,
      });

      // Randomize and show only 7 items
      const randomizedItems = getRandomItems(result, 5);
      setItems(randomizedItems);
    };

    fetchData();
  }, [id, text, activeSize, activeType]);

  const getRandomItems = (items, count) => {
    const shuffledItems = items.sort(() => 0.5 - Math.random());
    return shuffledItems.slice(0, count);
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const logout = () => {
    localStorage.removeItem("data");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-white">
      <Navbar />

      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div className="flex-col justify-center items-center">
          <div
            className="w-full md:rounded-3xl md:mt-10 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${posterblur})` }}
          >
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="mt-auto mb-auto md:w-1/2 md:28">
                <img
                  src={poster}
                  className="md:ml-20 md:w-full md:h-full md:rounded-3xl shadow-xl"
                  alt="Poster"
                />
              </div>

              <div className="title flex flex-col items-left py-10 md:py-24">
                <h4 className="text-white text-2xl md:text-4xl px-16 font-thin">
                  Welcome to
                </h4>
                <h4 className="text-white text-4xl md:text-6xl px-16 font-base tracking-wide">
                  BE@RBRICK
                </h4>
                <span className="text-white text-lg md:w-full text-left px-16 py-6">
                  Share your bearbrick collection with the world
                </span>
                <div className="flex justify-start items-center px-16 py-2">
                  <div className="w-4 h-4 rounded-full border-solid border border-white mr-4"></div>
                  <div className="w-4 h-4 rounded-full border-solid border border-white bg-white mr-4"></div>
                  <div className="w-4 h-4 rounded-full border-solid border border-white mr-4"></div>
                  <div className="w-4 h-4 rounded-full border-solid border border-white"></div>
                </div>
                <br />
                <br />
                <br />
                <span className="text-white text-lg md:w-full text-left px-16 py-4">
                  Let's create your bearbrick collection
                </span>
                <button
                  className="py-1 w-2/6 h-14 bg-white font-blod tracking-wide rounded-3xl shadow-md ml-16 hover:bg-black hover:text-white hover:scale-105 transition-all duration-300"
                  type="button"
                  onClick={() => navigate("/social")}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center pt-14">
            <h2 className="text-black-800 text-xl md:text-2xl md:text-4xl px-16 font-bold py-2">
              SEE ALL ITEMS IN SOCIAL
            </h2>
            <h2 className="text-gray-500 text-lg md:text-xl px-16 font-normal py-2">
              Let's see cool items!
            </h2>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-stretch ml-20 md:ml-0 md:space-x-4 mt-5 md:mt-10 gap-3 md:gap-0">
        {items.map((item) => (
          <div
            key={item._id}
            className="card flex flex-col rounded-xl w-3/4 md:w-64 bg-white border border-gray-300 shadow-md p-5 py-4 relative cursor-pointer hover:scale-105 transition-all duration-300"
          >
            <div className="w-full flex-grow">
              <div className="img-area h-32 md:h-44 ml-auto mr-auto flex justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-lg w-full h-full md:w-5/6 md:h-full"
                />
              </div>
            </div>
            <div className="text-area mt-2 md:mt-6 flex-grow">
              <p className="text-black font-semibold text-xs md:text-lg">
                {item.name}
              </p>
            </div>
            <div className="cta flex flex-col md:flex-row md:space-x-2 py-3">
              <button
                className="py-1 w-full md:w-3/6 text-xs md:text-sm bg-white border border-gray-400 rounded-md md:rounded-xl"
                type="button"
              >
                {item.size}
              </button>
              <button
                className="py-1 w-full md:w-3/6 text-xs md:text-sm bg-white border border-gray-400 rounded-md md:rounded-xl mt-2 md:mt-0"
                type="button"
              >
                {item.type}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        className="flex flex-col justify-center items-stretch space-x-4 pt-5"
        // style={{ width: "200rem", height: "40rem"}}
      >
        <div className="relative md:w-full">
          <img src={poster5} className="w-full h-full" />
          <div className="cta grid grid-cols-2 py-12 absolute bottom-0 md:bottom-4">
            <button
              className="md:ml-32 text-xs md:text-lg py-1 w-24 h-8 md:w-36 md:h-12 bg-white rounded-3xl shadow-md ml-12 hover:opacity-80 font-blod tracking-wide"
              type="button"
            >
              See More
            </button>
            <div className="flex items-center justify-start space-x-1">
              <span className="font-semibold text-white text-xs md:text-lg tracking-wide">
                New items
              </span>
              <span className="px-1 font-semibold text-white text-lg">·</span>
              <span className="font-thin text-white text-xs md:text-lg">
                wait for new collection
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
}
