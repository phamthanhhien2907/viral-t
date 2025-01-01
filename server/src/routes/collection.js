const {
  getAllCollection,
  createCollection,
  getCollectionById,
  getCollectionDifference,
  deleteCollection,
  updateCollection,
  updateCollectionById,
} = require("../controllers/collectionController");
const multer = require("multer");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const router = require("express").Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    console.log(file.originalname);
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });
router.get("/", getAllCollection);
router.get("/:id", getCollectionById);
router.get("/different/:id", getCollectionDifference);
router.delete("/delete/:id", [verifyToken, isAdmin], deleteCollection);
router.put("/update/:id/:userId", [verifyToken], updateCollection);
router.put(
  "/updateCollection/:id",
  [verifyToken, isAdmin],
  upload.fields([
    { name: "images", maxCount: 1 },
    { name: "videos", maxCount: 1 },
  ]),
  updateCollectionById
);
router.post(
  "/create",
  [verifyToken, isAdmin],
  upload.fields([
    { name: "images", maxCount: 1 },
    { name: "videos", maxCount: 1 },
  ]),
  createCollection
);
module.exports = router;
