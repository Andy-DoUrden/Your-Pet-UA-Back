const Pet = require("../../models/pet");
const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_SECRET_KEY } = process.env;

cloudinary.config({
  cloud_name: "dw6lgfflx",
  api_key: "679261754518422",
  api_secret: CLOUDINARY_SECRET_KEY,
});

const addPet = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { path: tempUpload, originalname } = req.file;
  let originalNameNoExtension;

  if (originalname.includes(".jpg")) {
    originalNameNoExtension = originalname.split(".jpg").join("");
  } else if (originalname.includes(".png")) {
    originalNameNoExtension = originalname.split(".png").join("");
  }

  const fileName = `${owner}_${nanoid()}_${originalNameNoExtension}`;

  const cloudinaryResult = await cloudinary.uploader.upload(tempUpload, {
    folder: "petsAvatars",
    public_id: fileName,
  });

  await fs.unlink(tempUpload);

  const avatarURL = cloudinaryResult.url;

  const result = await Pet.create({ ...req.body, avatarURL, owner });

  return res.status(201).json(result);
};

module.exports = addPet;
