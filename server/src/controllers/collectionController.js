const collection = require("../models/collection");
const users = require("../models/users");

const createCollection = async (req, res) => {
  try {
    const { title, image, video, category } = req.body;

    const newCollection = await collection.create({
      title,
      image: req?.files?.images[0]?.filename,
      video: req?.files?.videos[0]?.filename,
      category,
    });
    newCollection.save();
    return res.status(200).json({
      success: newCollection
        ? "Successfully created"
        : "Failed to create collection",
      newCollection,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const updateCollectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, images, videos, category } = req.body;
    const newCollection = await collection.findByIdAndUpdate(id, {
      title,
      image: images?.length > 0 ? images : req?.files?.images[0]?.filename,
      video: videos?.length > 0 ? videos : req?.files?.videos[0]?.filename,
      category,
    });
    return res.status(200).json({
      success: newCollection
        ? "Successfully updated"
        : "Failed to create collection",
      newCollection,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const getCollectionDifference = async (req, res) => {
  try {
    const { id } = req.params;
    const collections = await collection.find();
    const fillterCollection = collections.filter(
      (collection) => collection.id !== id
    );
    return res.status(200).json({
      success: collections ? true : false,
      fillterCollection,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const getAllCollection = async (req, res) => {
  try {
    const collections = await collection.find();
    return res.status(200).json({
      success: collections ? true : false,
      collections,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const getCollectionById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Invalid");
    const collections = await collection.findById(id);
    return res.status(200).json({
      success: collections ? true : false,
      collections,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateCollection = async (req, res) => {
  try {
    const { id, userId } = req.params;
    let data = await collection.findById(id);
    let user = await users.findById(userId);
    if (!user) throw new Error("User not found");
    if (!data) throw new Error("Collection not found");

    const { title, image, video, view } = req.body;
    // if (!title || !image || !video) throw new Error("Invalid");
    const filterViewUser = !data?.view?.includes(user?._id);
    if (filterViewUser) {
      data = await collection.findByIdAndUpdate(id, {
        $push: { view: user?._id },
      });
      data.save();
    }
    return res.status(200).json({
      success: data ? true : false,
      data,
    });
  } catch (error) {
    console.log(error.message);
  }
};
const deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error("Invalid");
    const movie = await collection?.findByIdAndDelete(id);
    console.log(movie);
    return res.status(200).json({
      success: movie ? true : false,
      movie,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllCollection,
  createCollection,
  getCollectionById,
  updateCollection,
  deleteCollection,
  getCollectionDifference,
  updateCollectionById,
};
