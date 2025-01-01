const {
  createcategoryCollection,
  deletecategoryCollection,
  getAllcategoryCollection,
  getcategoryCollectionById,
  updatecategoryCollectionById,
} = require("../controllers/categoryCollectionController");
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
router.get("/", getAllcategoryCollection);
router.get("/:id", getcategoryCollectionById);
router.delete("/delete/:id", [verifyToken, isAdmin], deletecategoryCollection);
router.put("/update/:id", [verifyToken, isAdmin], updatecategoryCollectionById);
router.post("/create", [verifyToken, isAdmin], createcategoryCollection);
module.exports = router;
