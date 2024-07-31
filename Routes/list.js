const router = require("express").Router();
const User = require("../Models/user");
const List = require("../Models/list");

//Create Todo

router.post("/addTask", async (req, res) => {
  try {
    const { title, desc, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const list = new List({ title, desc, user: existingUser });
      await list.save().then(() => {
        res.status(200).json({ list });
      });
      existingUser.list.push(list);
      existingUser.save();
    } else {
      res.status(200).json({ message: "user not exist" });
    } 
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error });
  }
}); 
 
//Update Task

router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, desc } = req.body;
    const existingUser = true;
    if (!existingUser) {
      return res.status(400).json({ message: "User not exist" });
    }
    const updatedList = await List.findByIdAndUpdate(
      req.params.id,
      { title, desc },  
      { new: true }
    );
    res.status(200).json(updatedList);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error });
  }
}); 

//Delete Task

router.delete("/deleteTask/:id", async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.id).then(() => {
      res.status(200).json({ message: "Task Deleted" });
    });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", error });
  }
});

//Get Task

router.get("/getTask/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
    if (list.length === 0) {
      res.status(200).json({ error: "No tasks found" });
    } else {
      res.status(200).json({ tasks: list });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
  
module.exports = router;
