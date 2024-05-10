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
        return res.status(400).json({ error: err.message });
      }

      // Access the buffer and process it with Jimp
      const buffer = req.file.buffer;
      const image = await Jimp.read(buffer);

      // Perform your Jimp processing here (e.g., crop, resize, etc.)
      const minDimension = Math.min(image.bitmap.width, image.bitmap.height);
      const xOffset = (image.bitmap.width - minDimension) / 2;
      const yOffset = (image.bitmap.height - minDimension) / 2;

      const croppedImage = image.crop(xOffset, yOffset, minDimension, minDimension);
      const resizedImage = croppedImage.resize(updatedSize, updatedSize);

      // Extract file extension
      const fileExtension = path.extname(req.file.originalname);

      // Save the processed image to the temp folder
      const fileName = `edited_${req.file.filename}${fileExtension}`;
      const tempFilePath = path.join(tempDir, fileName);
      await resizedImage.writeAsync(tempFilePath);

      // Update req.file with information about the edited image
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
