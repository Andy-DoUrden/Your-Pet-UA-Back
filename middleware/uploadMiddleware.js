const multer = require("multer");
const Jimp = require("jimp");
const path = require("path");

const tempDir = path.join(__dirname, "../", "tmp");

const storage = multer.memoryStorage(); // Use memory storage to modify the buffer

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1024 * 1024,
  },
});

const handleFileUpload = async (req, res, next) => {
  try {
    await upload.single("image")(req, res, async (err) => {
      const updatedSize = 288;

      if (err) {
        console.error(err);
        return res.status(400).json({ error: err.message });
      }

      if (!req?.file?.buffer) {
        req.file = null;
        return next();
      }

      const buffer = req.file.buffer;
      const image = await Jimp.read(buffer);

      const minDimension = Math.min(image.bitmap.width, image.bitmap.height);
      const xOffset = (image.bitmap.width - minDimension) / 2;
      const yOffset = (image.bitmap.height - minDimension) / 2;

      const croppedImage = image.crop(xOffset, yOffset, minDimension, minDimension);
      const resizedImage = croppedImage.resize(updatedSize, updatedSize);

      // const fileExtension = path.extname(req.file.originalname);

      // const fileName = `edited_${req.file.originalname}${fileExtension}`;
      const fileName = `edited_${req.file.originalname}`;
      const tempFilePath = path.join(tempDir, fileName);
      await resizedImage.writeAsync(tempFilePath);

      req.file = {
        ...req.file,
        originalname: fileName,
        filename: fileName,
        path: tempFilePath,
        size: Buffer.from(croppedImage.bitmap.data).length,
      };

      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { handleFileUpload };
