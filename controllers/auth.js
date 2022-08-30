const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const {
    name,
    email,
    password,
    firstName,
    lastName,
    userName,
    address,
    role,
  } = req.body;
  try {
    const newUser = await new User({
      email,
      name,
      firstName,
      lastName,
      userName,
      address,
      password,
      role,
    }).save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (user && user.password === password) {
      const token = jwt.sign(
        { userName: userName, role: user.role },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      res.status(200).json({ user: user, token: token });
    } else {
      res.status(400).json({ message: "invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
