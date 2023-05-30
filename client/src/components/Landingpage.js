import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.jpg';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate'
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store'
import { verifyPassword } from '../helper/helper'

import styles from '../styles/Landing.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };
  
//   const GlassSlider = () => {
//     return (
//       <div className="container mx-auto">
//         <div className="flex flex-col justify-center items-center">
//           <div className={styles.content}>JUST DROPPED</div>
//           <Slider {...settings}>
//             <div className={styles.glass}>Glass 1</div>
//             <div className={styles.glass}>Glass 2</div>
//             <div className={styles.glass}>Glass 3</div>
//             <div className={styles.glass}>Glass 4</div>
//             <div className={styles.glass}>Glass 5</div>
//             <div className={styles.glass}>Glass 6</div>
//           </Slider>
//           <div className="slider-indicators">
//             {Array.from({ length: 6 }, (_, index) => (
//               <div
//                 key={index}
//                 className={`indicator ${index === 0 ? 'active' : ''}`}
//               ></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

export default function LandingPage() {

    return (
        <main>
          <nav className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-28">
              <div className="flex items-center">
                <h1 className="text-neutral-800 text-2xl font-bold cursor-pointer">B E @ R</h1>
              </div>
              <div className="flex justify-center flex-grow">
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-neutral-900 hover:bg-neutral-900 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                  >
                    Social
                  </a>
                  <a
                    href="#"
                    className="text-neutral-900 hover:bg-neutral-900 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                  >
                    Collection
                  </a>
                  <a
                    href="#"
                    className="text-neutral-900 hover:bg-neutral-900 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                  >
                    QR Code
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-gray-900 cursor-pointer">
                </div>
              </div>
            </div>
          </nav>

            <div className="container mx-auto">
                <Toaster position='top-center' reverseOrder={false}></Toaster>
                <div className='flex flex-col justify-center items-center'>
                    <div className={styles.glass}>
                        <div className="title flex flex-col items-left py-24">
                            <h4 className="text-black-800 text-4xl px-16 font-thin">Welcome to</h4>
                            <h4 className="text-black-800 text-6xl px-16 font-bold">BE@RBRICK</h4>
                            <span className='text-gray-350 text-lg w-2/3 text-left px-16 py-6'>
                                Share your bearbrick collection with the world
                            </span>
                            <div className="flex justify-start items-center px-16 py-2">
                                <div className="w-4 h-4 rounded-full border-solid border border-black mr-4"></div>
                                <div className="w-4 h-4 rounded-full border-solid border border-black bg-black mr-4"></div>
                                <div className="w-4 h-4 rounded-full border-solid border border-black mr-4"></div>
                                <div className="w-4 h-4 rounded-full border-solid border border-black"></div>
                            </div>
                            <br></br><br></br><br></br>
                            <span className='text-gray-350 text-lg w-2/3 text-left px-16 py-4'>
                                Let's create you bearbrick collection
                            </span>
                            <button className={styles.btn} type='button'>Create</button>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className="text-black-800 text-4xl px-16 font-thin py-16">JUST DROPPED</h2>
                        <div className='flex flex-row justify-center items-center space-x-4'>
                            <div className={styles.card}>
                            BE@RBRICK Jupiter
                            </div>
                            <div className={styles.card}>
                                BE@RBRICK Jupiter
                            </div>
                            <div className={styles.card}>
                                BE@RBRICK Jupiter
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            {/* <GlassSlider /> */}
        </main>
    )
}
