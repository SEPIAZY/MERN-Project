import UserModel from "../model/User.model.js";

//update item in user collection
export async function updateCollection(req, res) {
  const { userid } = req.params;
  const { likeditemid } = req.body;
  console.log("userid", userid, "likeditemid", likeditemid);
  try {
    const user = await UserModel.findById(userid);
    const alreadyadded = user.item.includes(likeditemid);
    if (alreadyadded) {
      let user = await UserModel.findByIdAndUpdate(
        userid,
        {
          $pull: { item: { $in: likeditemid } },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await UserModel.findByIdAndUpdate(
        userid,
        {
          $push: { item: { $each: likeditemid } },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
