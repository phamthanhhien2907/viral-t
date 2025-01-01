const categoryBelt = require("../models/categoryBelt");
const users = require("../models/users");

const createCategoryBelt = async (req, res) => {
  try {
    const { name, roomInputs } = req.body;
    if (!name || !roomInputs) throw new Error("Không có dữ liệu");
    const createdRooms = [];
    if (roomInputs && roomInputs.length > 0) {
      for (const roomInput of roomInputs) {
        createdRooms.push(roomInput);
      }
    }
    const newCategoryBelt = await categoryBelt.create({
      name,
      rooms: createdRooms,
    });

    return res.status(200).json({
      message: "Successfully created",
      newCategoryBelt,
    });
  } catch (error) {
    console.error("Error creating categoryBelt:", error);
    return res.status(500).json({ message: error.message });
  }
};
const updateCategoryBeltById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, roomInputs } = req.body; // roomInputs là danh sách các phòng từ client

    if (!id) throw new Error("Id not found");
    if (!name || !roomInputs || !Array.isArray(roomInputs)) {
      throw new Error("Không có dữ liệu");
    }

    // Lấy tài liệu categoryBelt từ DB
    const categoryBeltFind = await categoryBelt.findById(id);
    if (!categoryBeltFind) throw new Error("CategoryBelt not found");

    // Tách các phòng đã tồn tại và chưa tồn tại
    const existingRooms = categoryBeltFind.rooms.map((room) => room.toString());
    const alreadyExists = roomInputs.filter((room) =>
      existingRooms.includes(room)
    );
    if (alreadyExists.length > 0) {
      await categoryBelt.updateOne(
        { _id: id },
        { $pull: { rooms: { $in: alreadyExists } } }
      );
    }
    const newRooms = roomInputs.filter((room) => !existingRooms.includes(room));

    if (newRooms.length > 0) {
      await categoryBelt.updateOne(
        { _id: id },
        { $push: { rooms: { $each: newRooms } } }
      );
    }
    await categoryBelt.updateOne({ _id: id }, { $set: { name } });
    return res.status(200).json({
      success: true,
      message: "CategoryBelt updated successfully",
      alreadyExists,
      newRooms,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllCategoryBelt = async (req, res) => {
  try {
    const getCategoryBelt = await categoryBelt.find().populate({
      path: "rooms",
      select: "room", // Lấy thông tin tên và ảnh sản phẩm
    });
    return res.status(200).json({
      success: getCategoryBelt ? true : false,
      getCategoryBelt,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const getCategoryBeltById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Invalid");
    const getCategoryBelt = await categoryBelt.findById(id).populate({
      path: "rooms",
      select: "room image", // Lấy thông tin tên và ảnh sản phẩm
    });
    return res.status(200).json({
      success: getCategoryBelt ? true : false,
      getCategoryBelt,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteCategoryBelt = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Invalid");
    const getCategoryBelt = await categoryBelt?.findByIdAndDelete(id);
    return res.status(200).json({
      success: getCategoryBelt ? true : false,
      getCategoryBelt,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllCategoryBelt,
  createCategoryBelt,
  getCategoryBeltById,
  deleteCategoryBelt,
  updateCategoryBeltById,
};
