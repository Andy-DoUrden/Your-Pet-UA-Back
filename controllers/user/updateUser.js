const User = require("../../models/user");
// const path = require("path");
const fs = require("fs/promises");
// const Jimp = require("jimp");

const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_SECRET_KEY } = process.env;
const { nanoid } = require("nanoid");

// const { requestError } = require("../../helpers");

// const avatarsDir = path.join(__dirname, "../", "../", "public", "usersAvatars");

const updateUser = async (req, res, next) => {
  const { _id: userId } = req.user;

  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user && user.id !== userId.toString()) {
    if (req.file) {
      const { path: tempUpload } = req.file;
      await fs.unlink(tempUpload);
    }

    return res.status(409).json({ message: "Цей імейл вже використовується" });
  }

  const userData = await User.findOne({ _id: userId });

  const updateData = req.body;

  try {
    if (req.file) {
      // const { path: tempUpload, originalname } = req.file;
      // const fileName = `${userId}_${originalname}`;
      // const resultUpload = path.join(avatarsDir, fileName);

      // if (user && user.avatarURL) {
      //   const oldAvatarName = path.basename(user.avatarURL);
      //   const oldAvatarPath = path.join(avatarsDir, oldAvatarName);

      //   await fs.unlink(oldAvatarPath);
      // }

      // await fs.rename(tempUpload, resultUpload);

      // await Jimp.read(resultUpload)
      //   .then((avatar) => {
      //     return avatar.resize(250, 250).quality(80).write(resultUpload);
      //   })
      //   .catch(() => {
      //     throw requestError(500, "File reading error");
      //   });

      // const avatarURL = `https://goit-team-03-node.onrender.com/public/usersAvatars/${fileName}`;

      const { path: tempUpload, originalname } = req.file;

      cloudinary.config({
        cloud_name: "dnx34xtrk",
        api_key: "294481349432578",
        api_secret: CLOUDINARY_SECRET_KEY,
      });

      let originalNameNoExtension;

      if (originalname.includes(".jpg")) {
        originalNameNoExtension = originalname.split(".jpg").join("");
      } else if (originalname.includes(".png")) {
        originalNameNoExtension = originalname.split(".png").join("");
      }

      const fileName = `${userId}_${nanoid()}_${originalNameNoExtension}`;

      const cloudinaryResult = await cloudinary.uploader.upload(tempUpload, {
        folder: "usersAvatars",
        public_id: fileName,
      });
      // .next(async () => {
      //   const prevAvatarUrl = user.avatarURL
      //     .split("http://res.cloudinary.com/dnx34xtrk/image/upload/v1715575815/noticesAvatars/")
      //     .join("");
      //   let prevAvatarUrlNoExtension;

      //   if (originalname.includes(".jpg")) {
      //     prevAvatarUrlNoExtension = prevAvatarUrl.split(".jpg").join("");
      //   } else if (originalname.includes(".png")) {
      //     prevAvatarUrlNoExtension = prevAvatarUrl.split(".png").join("");
      //   }

      //   await cloudinary.uploader.destroy(`usersAvatars/${prevAvatarUrlNoExtension}`);
      // });
      const prevAvatarUrl = userData.avatarURL.substring(
        "http://res.cloudinary.com/dnx34xtrk/image/upload/v1715575815/noticesAvatars/".length - 2
      );
      let prevAvatarUrlNoExtension;

      if (prevAvatarUrl.includes(".jpg")) {
        prevAvatarUrlNoExtension = prevAvatarUrl.split(".jpg").join("");
      } else if (prevAvatarUrl.includes(".png")) {
        prevAvatarUrlNoExtension = prevAvatarUrl.split(".png").join("");
      }

      await cloudinary.uploader.destroy(`usersAvatars/${prevAvatarUrlNoExtension}`);

      await fs.unlink(tempUpload);

      const avatarURL = cloudinaryResult.url;

      updateData.avatarURL = avatarURL;
    } else {
      updateData.avatarURL = userData.avatarURL;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = updateUser;
