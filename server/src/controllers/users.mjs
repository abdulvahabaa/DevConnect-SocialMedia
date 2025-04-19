import User from "../models/User.mjs";
import { getFromS3 } from "../utils/s3bucket.mjs";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const userImageUrl = await getFromS3(user.picturePath);
    user.set({ picturePath: userImageUrl });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = await Promise.all(
      friends.map(
        async ({
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        }) => {
          const userImageUrl = await getFromS3(picturePath);
          return {
            _id,
            firstName,
            lastName,
            occupation,
            location,
            picturePath: userImageUrl,
          };
        }
      )
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getCommunities = async (req, res) => {
  try {
    const communities = await User.find({ accountType: "community" }).lean();

    for (let community of communities) {
      try {
        const communityImageUrl = await getFromS3(community.picturePath);
        community.picturePath = communityImageUrl;
      } catch (error) {
        console.error(
          `Error getting image for community ${community._id}: ${error.message}`
        );
      }
    }
    res.status(200).json(communities);
  } catch (err) {
    console.error(`Error fetching communities: ${err.message}`);
    res.status(404).json({ message: err.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid old password" });
    }

    let newHashedPassword = user.password;
    if (req.body.newPassword) {
      newHashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        location: req.body.location,
        occupation: req.body.occupation,
        password: newHashedPassword,
      },
      { new: true }
    );
    const userImageUrl = await getFromS3(updatedUser.picturePath);
    updatedUser.set({ picturePath: userImageUrl });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
