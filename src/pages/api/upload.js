import fs from "fs/promises";
import path from "path";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    await upload.single("profile_image")(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: "Failed to upload image" });
      }
      const imageBuffer = req.file.buffer;
      const fileName = req.file.originalname;
      const filePath = path.join(process.cwd(), "public", fileName);
      // Save the image buffer to the server asynchronously
      await fs.writeFile(filePath, imageBuffer);
      return res.status(200).json({
        success: true,
        message: "File uploaded successfully",
      });
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
