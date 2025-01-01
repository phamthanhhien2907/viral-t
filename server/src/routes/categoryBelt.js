const {
  createCategoryBelt,
  deleteCategoryBelt,
  getAllCategoryBelt,
  getCategoryBeltById,
  updateCategoryBeltById,
} = require("../controllers/categoryBeltController");
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
router.get("/", getAllCategoryBelt);
router.get("/:id", getCategoryBeltById);
router.delete("/delete/:id", [verifyToken, isAdmin], deleteCategoryBelt);
router.put("/update/:id", [verifyToken, isAdmin], updateCategoryBeltById);
router.post("/create", [verifyToken, isAdmin], createCategoryBelt);
module.exports = router;
