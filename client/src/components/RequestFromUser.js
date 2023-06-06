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
import { getUserRequestItem } from "../helper/helper";
import { deleteUserRequestItem } from "../helper/helper";
import { updateUserRequestItem } from "../helper/helper";
import { addItem } from "../helper/helper";

export default function RequestFromUser() {
  const [items, setItems] = useState([]);
  const [nameUpdate, setNameUpdate] = useState();
  const [sizeUpdate, setSizeUpdate] = useState();
  const [typeUpdate, setTypeUpdate] = useState();
  const [fileUpdate, setFileUpdate] = useState();
  const [idUpdate, setIdUpdate] = useState();
  const [refresh, setRefresh] = useState(false);
  const [file, setFile] = useState();
  const [showUpdateBox, setShowUpdateBox] = useState(false);
  const [filterBar, setFilterBar] = useState(false);
  const [filterBox, setFilterBox] = useState(false);
  const [text, setText] = useState();
  const [activeSize, setActiveSize] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const [activePublish, setActivePublish] = useState(null);
  const [id, setId] = useState();

  var size = ["100%", "400%", "1000%", "100% + 400%"];
  var type = ["Artist", "License"];

  const onUpload = async (e) => {
    try {
      const base64 = await convertToBase64(e.target.files[0]);
      setFile(base64);
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  const handleEditClick = (item) => {
    setIdUpdate(item._id);
    setNameUpdate(item.name);
    setSizeUpdate(item.size);
    setTypeUpdate(item.type);
    setFileUpdate(item.image);
    setShowUpdateBox(!showUpdateBox);
  };

  const handleCloseEdit = () => {
    setShowUpdateBox(!showUpdateBox);
  };

  const inputonChange = async (e) => {
    setText(e.target.value);
  };

  const handleComfirm = async (itemId) => {
    Swal.fire({
      title: "Delete this request?",
      text: "This request will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log(itemId);
          await deleteUserRequestItem(itemId);
          Swal.fire("Deleted!", "Request has been deleted.", "success");
          // Update the items state to remove the deleted item
          setItems((prevItems) =>
            prevItems.filter((item) => item.id !== itemId)
          );
          setRefresh(!refresh);
        } catch (error) {
          console.error("Error deleting request:", error);
          Swal.fire("Error", "Failed to delete item.", "error");
        }
      }
    });
  };

  const handleSizeClick = (buttonIndex, value) => {
    setActiveSize(size[buttonIndex]);
    formik.setFieldValue("size", value);
  };

  const handleTypeClick = (buttonIndex, value) => {
    setActiveType(type[buttonIndex]);
    formik.setFieldValue("type", value);
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(id, text, activeSize, activeType, activePublish);
      const result = await getUserRequestItem({
        name: text,
        size: activeSize,
        type: activeType,
        createdAt: activePublish,
      });
      setItems(result);
      // console.log(result);
    };

    fetchData();
  }, [id, text, activeSize, activeType, activePublish, refresh]);

  const updateRequest = async (id) => {
    updateUserRequestItem(id, {
      name: nameUpdate,
      type: typeUpdate,
      size: sizeUpdate,
      image: file,
    });
  };

  const formik = useFormik({
    initialValues: {
      _id: "",
      name: "",
      type: "",
      size: "",
      createdAt: "",
      image: "",
    },
    onSubmit: async (values) => {
      values = await Object.assign(values, { image: file || "" });
      console.log(values);
      let additemPromise = addItem(values);
      toast.promise(additemPromise, {
        loading: "Adding...",
        success: <b>Add Item Successfully!</b>,
        error: <b>Could not add item.</b>,
      });
    },
  });

  const publishItem = async () => {
    try {
      const newItem = {
        _id: idUpdate,
        name: nameUpdate,
        type: typeUpdate,
        size: sizeUpdate,
        image: file ? file : fileUpdate,
      };

      console.log(idUpdate);
      // Add the new item to the database using an appropriate function
      await addItem(newItem).then(deleteUserRequestItem(idUpdate));

      // Display a success message
      Swal.fire(
        "Item Published!",
        "The item has been added to the database.",
        "success"
      );

      // Clear the input fields and reset the file state
      setNameUpdate("");
      setSizeUpdate("");
      setTypeUpdate("");
      setFileUpdate("");
      setFile("");
    } catch (error) {
      console.error("Error publishing item:", error);
      Swal.fire("Error", "Failed to publish item.", "error");
    }
  };
  return (
    <div className="bg-white">
      <Navbar />

      <div className="container mx-auto py-10">
        <div className="flex flex-col justify-center items-start">
          <h1 className="px-6 py-3 text-4xl font-bold tracking-wide">
            Request From User
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-start">
        <span className="px-8 md:px-32 text-gray-500">
          {items.length} result found
        </span>
        <hr className="mt-2 border-gray-300 w-full" />
      </div>

      {showUpdateBox && (
        <div className="updatebox">
          <div className="container mx-auto py-4">
            <div className="">
              <form className="flex flex-col md:flex-row md:justify-between gap-5">
                <div className="img-area w-full md:w-1/2">
                  <button
                    className="mt-2 ml-6 text-xl text-black font-base cursor-pointer hover:underline"
                    onClick={handleCloseEdit}
                  >
                    Cancel
                  </button>
                  <div className="flex justify-center mt-4 h-80 md:h-80">
                    <label htmlFor="image">
                      <img
                        src={file || fileUpdate}
                        className="w-3/4 h-2/4 ml-auto mr-auto md:w-full md:h-full cursor-pointer rounded-xl shadow-md"
                      />
                    </label>
                  </div>
                  <input
                    onChange={onUpload}
                    type="file"
                    id="image"
                    name="image"
                  />
                </div>
                <div className="mt-6 text-area w-full md:w-1/2">
                  <div className="text-lg font-semibold tracking-wider">
                    Name
                  </div>
                  <div className="py-2">
                    <input
                      value={nameUpdate}
                      onChange={(e) => setNameUpdate(e.target.value)}
                      className="ml-2 h-12 text-lg px-5 bg-white border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                      type="text"
                      placeholder="Name"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="mt-2 text-lg font-semibold tracking-wider">
                    Size
                  </div>
                  <div className="py-2">
                    <select
                      onChange={(e) => setSizeUpdate(e.target.value)}
                      className="ml-2 h-12 text-lg px-5 rounded-xl bg-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                      style={{ width: "100%" }}
                    >
                      <option value="">{sizeUpdate}</option>
                      <option value="" disabled>
                        Select new size
                      </option>
                      <option value="100%">100%</option>
                      <option value="400%">400%</option>
                      <option value="1000%">1000%</option>
                      <option value="100% + 400%">100% + 400%</option>
                    </select>
                  </div>
                  <div className="mt-2 text-lg font-semibold tracking-wider">
                    Type
                  </div>
                  <div className="py-2">
                    <select
                      onChange={(e) => setTypeUpdate(e.target.value)}
                      className="ml-2 h-12 text-lg px-5 bg-white border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                      style={{ width: "100%" }}
                    >
                      <option value="">{typeUpdate}</option>
                      <option value="" disabled>
                        Select new type
                      </option>
                      <option value="Artist">Artist</option>
                      <option value="License">License</option>
                    </select>
                  </div>
                  <div className="py-6 flex flex-row gap-3">
                    <button
                      className="w-full h-12 text-lg text-black bg-white border border-gray-400 rounded-xl hover:bg-black hover:text-white hover:scale-105 transition-all duration-300"
                      onClick={() => updateRequest(idUpdate)}
                    >
                      Update Request
                    </button>

                    <button
                      className="w-full h-12 text-lg text-black bg-white border border-gray-400 rounded-xl hover:bg-black hover:text-white hover:scale-105 transition-all duration-300"
                      type="submit"
                      onClick={publishItem}
                    >
                      Publish Item
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <hr className="border-gray-300 w-full" />
        </div>
      )}

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
                  <div className="cta flex space-x-2 py-3">
                    <button
                      className="py-1 w-3/6 md:w-3/6 bg-white border border-gray-400 rounded-xl"
                      type="button"
                    >
                      {item.size}
                    </button>
                    <button
                      className="py-1 w-2/6 md:w-2/6 bg-white border border-gray-400 rounded-xl"
                      type="button"
                    >
                      {item.type}
                    </button>
                    <button
                      className="py-1 w-1/6 md:w-1/6 bg-white border border-gray-400 rounded-xl"
                      type="button"
                      onClick={() => {
                        handleEditClick(item);
                      }}
                    >
                      <FiEdit className="ml-auto mr-auto" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}
