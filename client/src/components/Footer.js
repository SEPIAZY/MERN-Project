import React from "react";
import ig from "../assets/ig_icon.png";
import fb from "../assets/fb_icon.png";

export default function Footer() {
  return (
    <div>
      <div className="mt-8 md:mt-10">
        <div className="flex flex-col justify-center items-center mt-10">
          <div className="flex flex-row gap-2 text-base md:text-xl font-bold">
            <h1>B</h1>
            <h1>E</h1>
          </div>
          <div className="flex flex-row gap-1">
            <h1>@</h1>
            <h1 className="text-base md:text-xl font-bold">R</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start mt-3">
        <hr className="border-gray-400 w-full" />
      </div>

      <div className="container mx-auto flex flex-col justify-center items-center mt-5 md:mt-8">
        <div className="card flex flex-col md:flex-row gap-10 md:gap-40 ml-8 md:ml-auto mr-auto">
          <div className="">
            <h3 className="text-md md:text-lg font-semibold">About</h3>
            <p className="mt-2 text-base">Privacy Policy</p>
            <p className="mt-1 text-base">Terms & Conditions</p>
          </div>

          <div className="">
            <h3 className="text-md md:text-lg font-semibold">User Support</h3>
            <p className="mt-2 text-base">FAQs</p>
            <p className="mt-1 text-base">Announcement</p>
          </div>

          <div className="">
            <h3 className="text-md md:text-lg font-semibold">Contact</h3>
            <p className="mt-2 text-base">Line: @bbearbrick</p>
            <p className="mt-1 text-base">E-mail: bbrick@gmail.com</p>
          </div>

          <div className="">
            <h3 className="text-md md:text-lg font-semibold">Follow Us</h3>
            <div className="flex flex-row mt-2 space-x-4">
              <a>
                <img src={ig} className="w-8 h-8" />
              </a>
              <a>
                <img src={fb} className="w-8 h-8 rounded-md" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start mt-20">
        <hr className="border-gray-400 w-full" />
      </div>

      <div className="flex flex-col justify-center items-center mt-4 mb-4 text-sm font-thin text-gray-400 tracking-wide">
        <p>© 2023 Copyright | BE@R</p>
      </div>
      <br></br>
    </div>
  );
}
