const Notice = require("../../models/notice");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const { requestError } = require("../../helpers");
const convertAge = require("../../helpers/convertAge");
const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_SECRET_KEY } = process.env;

cloudinary.config({
  cloud_name: "dw6lgfflx",
  api_key: "679261754518422",
  api_secret: CLOUDINARY_SECRET_KEY,
});

const addNotice = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const { date } = req.body;
  if (req.body.category === "sell" && !req.body.price) {
    throw requestError(404, "Missing field price");
  }
  if (req.body.category !== "sell" && req.body.price) {
    throw requestError(404, "You can't add price to this category");
  }

  const age = convertAge(date);
  let originalNameNoExtension;

  if (originalname.includes(".jpg")) {
    originalNameNoExtension = originalname.split(".jpg").join("");
  } else if (originalname.includes(".png")) {
    originalNameNoExtension = originalname.split(".png").join("");
  }

  const fileName = `${owner}_${nanoid()}_${originalNameNoExtension}`;

  const cloudinaryResult = await cloudinary.uploader.upload(tempUpload, {
    folder: "noticesAvatars",
    public_id: fileName,
  });

  await fs.unlink(tempUpload);

  const avatarURL = cloudinaryResult.url;

  const result = await Notice.create({ ...req.body, avatarURL, owner, age });

  return res.status(201).json(result);
};

module.exports = addNotice;
