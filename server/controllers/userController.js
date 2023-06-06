import UserModel from "../model/User.model.js";
import RequestModel from "../model/request.model.js";

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
