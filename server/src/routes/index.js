const authRouter = require("./auth");
const collectionRouter = require("./collection");
const userRouter = require("./user");
const evaluateRouter = require("./evaluate");
const withDrawAndDepositRouter = require("./withDrawAndDeposit");
const categoryBeltRouter = require("./categoryBelt");
const categoryCollectionRouter = require("./categoryCollection");

const initRoutes = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/collections", collectionRouter);
  app.use("/api/users", userRouter);
  app.use("/api/evaluate", evaluateRouter);
  app.use("/api/transform", withDrawAndDepositRouter);
  app.use("/api/categoryBelt", categoryBeltRouter);
  app.use("/api/categoryCollection", categoryCollectionRouter);
};
module.exports = initRoutes;
