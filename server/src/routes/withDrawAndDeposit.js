const {
  getAllDeposit,
  getAllWithDraw,
  getWithDrawById,
} = require("../controllers/withDrawAndDepositController");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const router = require("express").Router();
router.get("/deposit", [verifyToken], getAllDeposit);
router.get("/withdraw", [verifyToken], getAllWithDraw);
router.get("/withdraw/:id", [verifyToken], getWithDrawById);

module.exports = router;
