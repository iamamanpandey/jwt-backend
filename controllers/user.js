const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ userName: username });
    res.status(200).send(user);
    console.log(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
