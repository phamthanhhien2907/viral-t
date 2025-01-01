const categoryCollection = require("../models/categoryCollection");
const users = require("../models/users");

const createcategoryCollection = async (req, res) => {
  try {
    const { name, category } = req.body;
    if (!name || !category) throw new Error("Không có dữ liệu");
    const createdRooms = [];
    if (category && category.length > 0) {
      for (const roomInput of category) {
        createdRooms.push(roomInput);
      }
    }
    const newcategoryCollection = await categoryCollection.create({
      name,
      category: createdRooms,
    });

    return res.status(200).json({
      message: "Successfully created",
      newcategoryCollection,
    });
  } catch (error) {
    console.error("Error creating categoryCollection:", error);
    return res.status(500).json({ message: error.message });
  }
};
const updatecategoryCollectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category } = req.body; // category là danh sách các phòng từ client

    if (!id) throw new Error("Id not found");
    if (!name || !category || !Array.isArray(category)) {
      throw new Error("Không có dữ liệu");
    }

    // Lấy tài liệu categoryCollection từ DB
    const categoryCollectionFind = await categoryCollection.findById(id);
    if (!categoryCollectionFind)
      throw new Error("categoryCollection not found");

    // Tách các phòng đã tồn tại và chưa tồn tại
    const existingRooms = categoryCollectionFind.category.map((room) =>
      room.toString()
    );
    const alreadyExists = category.filter((room) =>
      existingRooms.includes(room)
    );
    if (alreadyExists.length > 0) {
      await categoryCollection.updateOne(
        { _id: id },
        { $pull: { category: { $in: alreadyExists } } }
      );
    }
    const newRooms = category.filter((room) => !existingRooms.includes(room));

    if (newRooms.length > 0) {
      await categoryCollection.updateOne(
        { _id: id },
        { $push: { category: { $each: newRooms } } }
      );
    }
    await categoryCollection.updateOne({ _id: id }, { $set: { name } });
    return res.status(200).json({
      success: true,
      message: "categoryCollection updated successfully",
      alreadyExists,
      newRooms,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllcategoryCollection = async (req, res) => {
  try {
    const getcategoryCollection = await categoryCollection.find().populate({
      path: "category",
      select: "title category image video view", // Lấy thông tin tên và ảnh sản phẩm
    });
    return res.status(200).json({
      success: getcategoryCollection ? true : false,
      getcategoryCollection,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const getcategoryCollectionById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Invalid");
    const getcategoryCollection = await categoryCollection
      .findById(id)
      .populate({
        path: "category",
        select: "title category", // Lấy thông tin tên và ảnh sản phẩm
      });
    return res.status(200).json({
      success: getcategoryCollection ? true : false,
      getcategoryCollection,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deletecategoryCollection = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!id) throw new Error("Invalid");
    const getcategoryCollection = await categoryCollection?.findByIdAndDelete(
      id
    );
    return res.status(200).json({
      success: getcategoryCollection ? true : false,
      getcategoryCollection,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllcategoryCollection,
  createcategoryCollection,
  getcategoryCollectionById,
  deletecategoryCollection,
  updatecategoryCollectionById,
};
