import axios from "axios";
import jwt_decode from "jwt-decode";

//axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** Make API Requests */

/** To get username from Token */
export async function getUsername() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Cannot find Token");
  let decode = jwt_decode(token);
  return decode;
}

/** authenticate function */
export async function authenticate(username) {
  try {
    return await axios.post("http://localhost:8080/api/authenticate", {
      username,
    });
  } catch (error) {
    return { error: "Username doesn't exist...!" };
  }
}

/** get User details */
export async function getUser({ username }) {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/api/user/${username}`
    );
    return { data };
  } catch (error) {
    return { error: "Password doesn't Match...!" };
  }
}

/** register user function */
export async function registerUser(credentials) {
  try {
    // console.log("check");
    // console.log(credentials);
    const {
      data: { msg },
      status,
    } = await axios.post(`http://localhost:8080/api/register`, credentials);

    let { username, email } = credentials;

    /** send email */
    if (status === 201) {
      await axios.post("http://localhost:8080/api/registerMail", {
        username,
        userEmail: email,
        text: msg,
      });
    }

    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** login function */
export async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post("http://localhost:8080/api/login", {
        username,
        password,
      });

      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesn't Match...!" });
  }
}

/** update user profile function */
export async function updateUser(response) {
  try {
    const token = await localStorage.getItem("token");
    const data = await axios.put(
      "http://localhost:8080/api/updateuser",
      response,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error: "Couldn't Update Profile...!" });
  }
}

/** generate OTP */
export async function generateOTP(username) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("http://localhost:8080/api/generateOTP", {
      params: { username },
    });

    // send mail with the OTP
    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ username });
      let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
      await axios.post("http://localhost:8080/api/registerMail", {
        username,
        userEmail: email,
        text,
        subject: "Password Recovery OTP",
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/** verify OTP */
export async function verifyOTP({ username, code }) {
  try {
    const { data, status } = await axios.get(
      "http://localhost:8080/api/verifyOTP",
      { params: { username, code } }
    );
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
}

/** reset password */
export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await axios.put(
      "http://localhost:8080/api/resetPassword",
      { username, password }
    );
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}

//add item fuction
export async function addItem(item) {
  try {
    const { data } = await axios.post(
      "http://localhost:8080/api/additem",
      item
    );
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error });
  }
}

//get number of items
export async function getNumberOfItems() {
  try {
    const response = await fetch("http://localhost:8080/api/getitem");
    //console.log(response)
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    const numberOfItems = data.items.length; // Check if data is an array and get its length
    //console.log(numberOfItems)
    return numberOfItems;
  } catch (error) {
    console.error("Error fetching number of items:", error);
    return 0; // Return 0 or handle the error as per your requirement
  }
}

//get name, size, type, image of items
export async function getItemsData() {
  try {
    const response = await fetch("http://localhost:8080/api/getitem");
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    const items = data.items.map((item) => {
      return {
        id: item._id,
        name: item.name,
        size: item.size,
        type: item.type,
        image: item.image,
        createdAt: item.createdAt,
      };
    });

    return items;
  } catch (error) {
    console.error("Error fetching items:", error);
    return []; // Return an empty array or handle the error as per your requirement
  }
}

//delete item function
export async function deleteItem(itemId) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/deleteitem/${itemId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting item:", error);
    return { error: error.message };
  }
}

//search item function
export async function searchItem(searchItem) {
    try {
        const {_id, name, size, type, createdAt} = searchItem;
        // console.log("search:",_id, name, size, type, createdAt)
        // console.log(searchTerm)
        const encodedSearchTerm = encodeURIComponent(name);
        // console.log(encodedSearchTerm)
        let api_sent = `http://localhost:8080/api/getAllCards?`
        let check = false;
        if (_id){
          if(check){api_sent = api_sent + '&'}
          api_sent = api_sent + `_id=${_id}`
          check = true;
        }
        if (encodedSearchTerm !== "undefined"){
          if(check){api_sent = api_sent + '&'}
          api_sent = api_sent + `name=${encodedSearchTerm}`
          check = true;
        }
        if (size){
          if(check){api_sent = api_sent + '&'}
          api_sent = api_sent + `size=${size}`
          check = true;
        }
        if (type){
          if(check){api_sent = api_sent + '&'}
          api_sent = api_sent + `type=${type}`
          check = true;
        }
        if (createdAt){
          if(check){api_sent = api_sent + '&'}
          api_sent = api_sent + `createdAt=${createdAt}`
          check = true;
        }
        // console.log("api_sent",api_sent)
        const response = await fetch(api_sent);
        
        if (!response.ok) {
          throw new Error("Request failed");
        }
        
        const data = await response.json();
        const items = data.map((item) => {
          return {
            _id: item._id,
            name: item.name,
            size: item.size,
            type: item.type,
            image: item.image,
            createdAt: item.createdAt,
          };
        });
        return items;
      } catch (error) {
        console.error("Error fetching items:", error);
        return []; // Return an empty array or handle the error as per your requirement
      }
}

//update item fuction
export async function updateCards(id,item) {
  try {
    const { data } = await axios.put(
      `http://localhost:8080/api/updateitem/${id}`,item
    );
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error });
  }
}

//update item to user's collection from likedItems
export async function updateUserCollection(userid,likeditemid) {
  try {
    // console.log("userid",userid,"likeditemid",likeditemid)
    
    const { data } = await axios.put(
      `http://localhost:8080/api/updatecollection/${userid}`,{ likeditemid }
    );
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error });
  }
}

//user request item function
export async function userRequestItem(item) {
  try {
    const { data } = await axios.post(
      "http://localhost:8080/api/userRequest",item
    );
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error });
  }
}

//get user request item function
export async function getUserRequestItem() {

  try {
    const response = await fetch(`http://localhost:8080/api/getUserRequest`);
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    const items = data.items.map((item) => {
      return {
        _id: item._id,
        name: item.name,
        size: item.size,
        type: item.type,
        image: item.image,
        createdAt: item.createdAt,
      };
    });

    return items;
  } catch (error) {
    console.error("Error fetching items:", error);
    return []; // Return an empty array or handle the error as per your requirement
  }
}

//delete user request item function
export async function deleteUserRequestItem(itemId) {
  try {
    console.log("deleteUserRequestItem",itemId)
    const response = await fetch(
      `http://localhost:8080/api/deleteUserRequest/${itemId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting request:", error);
    return { error: error.message };
  }
}

//updat user request item function
export async function updateUserRequestItem(id,item) {
  try {
    const { data } = await axios.put(
      `http://localhost:8080/api/updateUserRequest/${id}`,item
    );
    return Promise.resolve({ data });
  } catch (error) {
    return Promise.reject({ error });
  }
}
