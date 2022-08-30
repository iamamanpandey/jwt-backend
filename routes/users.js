const express = require("express");
const router = express.Router();

const { isAdmin } = require("../middleware/auth");
const { getAllUsers, getUser } = require("../controllers/user");

router.get("/users", isAdmin, getAllUsers);
router.get("/users/:username", getUser);

module.exports = router;
