const router = require("express").Router();
const User = require("../Models/user");

//sign in
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.status(200).json({ user: user, message: "User saved" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(200).json({ message: "User already exists" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
});
  
//Login 

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res
        .status(200)
        .json({ message: "User not found, or please signup first" });
    }
    const isPasswordCorrect = await User.findOne({
      password: req.body.password,
    }); 
    if (!isPasswordCorrect) {
      res.status(200).json({ message: "Invalid password" });
    }
    const { password, ...others } = user._doc;
    res.status(200).json({ message: "Login success", others });
  } catch (error) {
    res.status(200).json({ message: "Internal error" });
  }
});
  
module.exports = router;
