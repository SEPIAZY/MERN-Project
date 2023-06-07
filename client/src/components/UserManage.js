import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import convertToBase64 from "../helper/convert";
import { searchItem, updateCards } from "../helper/helper";
import { deleteItem } from "../helper/helper";
import { updateItem } from "../helper/helper";
import Navbar from "../components/Nav";
import { IoIosSearch } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoIosRefresh } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import avatar from "../assets/profile.jpg";
import { IoIosCloseCircle } from "react-icons/io";
import { getUserAc } from "../helper/helper";
import { deleteUserAc } from "../helper/helper";

export default function UserManage() {
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [text, setText] = useState();
  const [id, setId] = useState();
  const [role, setRole] = useState();
  const [profile, setProfile] = useState();

    const handleComfirm = async (itemId) => {
      Swal.fire({
        title: "Delete this user?",
        text: "This user will be deleted permanently!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            // console.log(itemId);
            await deleteUserAc(itemId);
            Swal.fire("Deleted!", "User has been deleted.", "success");
            // Update the items state to remove the deleted item
            setItems((prevItems) =>
              prevItems.filter((item) => item.id !== itemId)
            );
            setRefresh(!refresh);
          } catch (error) {
            console.error("Error deleting user:", error);
            Swal.fire("Error", "Failed to delete user.", "error");
          }
        }
      });
    };

  useEffect(() => {
    const fetchData = async () => {
      
      const result = await getUserAc({
        username: text,
        role: role,
        profile: profile
      });
      setItems(result);
      // console.log(result);
    };

    fetchData();
  }, [id, text, role, profile, refresh]);

  return (
    <div className="bg-white">
      <Navbar />
      <div className="container mx-auto py-10">
        <div className="flex flex-col justify-center items-start">
          <h1 className="px-6 py-3 text-3xl md:text-4xl font-bold tracking-wide">
            User Database
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-start">
        <span className="px-8 md:px-32 text-gray-500">
          {items.length} result found
        </span>
        <hr className="mt-2 border-gray-300 w-full" />
      </div>

      <div className="container mx-auto">
        <div className="user req database">
          <div className="px-6 py-6 flex overflow-x-auto">
            <div className="card-container w-full ml-auto mr-auto flex flex-wrap gap-4 mb-4 justify-center">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="card rounded-xl w-4/5 md:w-1/4 bg-white drop-shadow-lg rounded-xl p-5 py-4 relative cursor-pointer hover:scale-105 transition-all duration-300"
                >
                  <FaTrash
                    className="ml-auto mr-auto absolute top-5 md:top-7 right-5 md:right-9 text-2xl text-gray-400 cursor-pointer hover:text-black"
                    onClick={() => {
                      handleComfirm(item._id);
                    }}
                  />

                  <div className="w-full md:w-6/6">
                    <div className="img-area h-32 md:h-56 flex justify-center">
                      <img
                        src={item.profile ? item.profile : avatar}
                        alt={item.username}
                        className="rounded-lg w-4/6 h-full md:w-full md:h-full"
                      />
                    </div>
                  </div>
                  <div className="text-area mt-2 md:mt-6">
                    <p className="text-black font-semibold">{item.username}</p>
                  </div>
                  <div className="cta flex space-x-2 py-3">
                    <button
                      className="py-1 w-3/6 md:w-2/6 bg-white border border-gray-400 rounded-xl"
                      type="button"
                    >
                      {item.role}
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
