const users = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));
const getAllUsers = async (req, res) => {
  try {
    const user = await users.find();
    return res.status(200).json({
      success: user ? true : false,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      throw new Error("Chưa điền tên đăng nhập hoặc mật khẩu");
    const response = await users.findOne({ username });
    const isCorrectPassword =
      response && bcrypt.compareSync(password, response.password);

    const accessToken =
      isCorrectPassword &&
      jwt.sign(
        { id: response?._id, role: response?.role },
        process.env.SECRET_KEY
        // { expiresIn: "2d" }
      );

    return res.status(200).json({
      success: accessToken
        ? 0
        : isCorrectPassword
        ? `Đăng nhập thành công! Chào mừnng bạn quay trở lại ${response?.username}`
        : "Tên đăng nhập hoặc mật khẩu không đúng! Vui lòng kiểm tra lại.",
      accessToken: accessToken || null,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const register = async (req, res) => {
  try {
    const { username, password, code } = req.body;
    console.log(username, password);
    if (!username || !password)
      throw new Error("Bạn chưa điền tên đăng nhập hoặc mật khẩu");
    let user = await users.findOne({ username });

    if (user) throw new Error("Tên đăng nhập đã tồn tại");
    const newUser = await users.create({
      username: username,
      password: hashPassword(password),
      code: code?.toUpperCase(),
    });

    newUser.save();
    return res.status(200).json({
      success: newUser ? true : false,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, newPassword, rePassword } = req.body;
    if (!password) throw new Error("Bạn chưa nhập mật khẩu cũ");
    if (!newPassword) throw new Error("Bạn chưa nhập mật khẩu mới");
    if (!rePassword) throw new Error("Bạn chưa nhập lại mật khẩu mới");
    let user = await users.findById(id);
    const isCorrectPassword =
      user && bcrypt.compareSync(password, user.password);

    if (isCorrectPassword) {
      if (newPassword !== rePassword)
        throw new Error("Mật khẩu mới không trùng khớp");
      await users.findByIdAndUpdate(
        user?._id,
        {
          password: hashPassword(newPassword),
        },
        { new: true }
      );
    } else {
      throw new Error("Mật khẩu cũ không đúng");
    }

    return res.status(200).json({
      success: user ? true : false,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getAllUsers,
  register,
  login,
  changePassword,
};
