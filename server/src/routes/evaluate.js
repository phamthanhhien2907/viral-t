const {
  getLotteryById,
  createLottery,
  getAllLottery,
  updateLottery,
  updateLotteryAndUsers,
  getLotteryHistory,
  getRoomById,
  updateLotteryResult,
  countdown,
  deleteLotteryById,
  updateTimer,
  countdownTimer,
} = require("../controllers/evaluateController");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const router = require("express").Router();
const multer = require("multer");

router.get("/lottery", getAllLottery);
router.put("/lottery/updateTime", updateTimer);
router.get("/lottery/countdownTimer", countdownTimer);

router.delete("/lottery/delete/:id", [verifyToken, isAdmin], deleteLotteryById);

router.put("/countdown", countdown);

router.put("/lottery/updated/:roomId/:userId", [verifyToken], updateLottery);
router.put(
  "/lottery/updateUserIntoRoom/:roomId/:userId",
  [verifyToken],
  updateLotteryAndUsers
);

router.get("/lottery/:roomId/:userId", [verifyToken], getLotteryById);
router.get("/roomDetails/:roomId", [verifyToken, isAdmin], getRoomById);

router.get("/historyLottery/:roomId/:userId", [verifyToken], getLotteryHistory);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });
router.post(
  "/lottery/create",
  [verifyToken, isAdmin],
  upload.fields([{ name: "images", maxCount: 1 }]),
  createLottery
);
router.put(
  "/lottery/updateResult/:roomId",
  [verifyToken, isAdmin],
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateLotteryResult
);

module.exports = router;
