import UserModel from "../model/User.model.js";
import RequestModel from "../model/request.model.js";
import Bearbrick  from "../model/bearbrick.model.js";

//update item in user collection
export async function updateCollection(req, res) {
  const { userid } = req.params;
  const { likeditemid } = req.body;
  console.log("userid", userid, "likeditemid", likeditemid);
  try {
    let user = await UserModel.findByIdAndUpdate(
      userid,
      {
        $addToSet: { item: { $each: likeditemid } },
      },
      {
        new: true,
      }
    );
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

//delete item in user collection
export async function deleteUserCollection(req, res) {
  const { userid, itemid } = req.params;
  console.log("userid", userid, "itemid", itemid);
  try {
    let user = await UserModel.findByIdAndUpdate(
      userid,
      {
        $pull: { item: itemid },
      },
      {
        new: true,
      }
    );
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

//user request item
export async function userRequest(req, res) {
  // const newBearbrick = new bearbrick(req.body);
  // newBearbrick.save().then(() => res.json('Bearbrick added!')).catch((err) => {console.log(err)});

  const { name, type, size, image } = req.body;
  try {
    const userRequest = new RequestModel({ name, type, size, image });
    await userRequest.save();
    res.status(201).json(userRequest);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

//fetch other user collection

export async function fetchOtherUserCollection(req, res) {
  try {
    const userId = req.params.userid;
    console.log("data", req.body);
    const user = await UserModel.findById(userId);
    console.log("user", user);
    if (!user) {
      return res.status(404).json({ error: "User collection not found" });
    }

    const itemIds = user.item; // array of item ids

    const items = await Bearbrick.find({ _id: { $in: itemIds } });

    const userData = {
      username: user.username,
      bio: user.bio,
      profile: user.profile,
      collection: items.map((item) => ({
        _id: item._id,
        name: item.name,
        size: item.size,
        type: item.type,
        image: item.image,
        createdAt: item.createdAt,
      })),
    };

    res.json(userData);
  } catch (error) {
    console.error("Error fetching user collection:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//fetch user data
export async function fetchUserData(req, res) {
  const { username } = req.params;
    try {
        
        if(!username) return res.status(501).send({ error: "Invalid Username"});

        UserModel.findOne({ username }, function(err, user){
            if(err) return res.status(500).send({ err });
            if(!user) return res.status(501).send({ error : "Couldn't Find the User"});

            /** remove password from user */
            // mongoose return unnecessary data with object so convert it into json
            const { password, ...rest } = Object.assign({}, user.toJSON());

            return res.status(201).send(rest);
        })

    } catch (error) {
        return res.status(404).send({ error : "Cannot Find User Data"});
    }
}


