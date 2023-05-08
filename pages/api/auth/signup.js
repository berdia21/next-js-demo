import User from "../../../models/user";
import dbConnect from "../../../utils/dbConnect";
import handler from "../../../utils/handler";

handler.post(createUser);

async function createUser(req, res) {
  const data = req.body;

  const { userName, name, password } = data;

  dbConnect();

  try {
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "Account already exists" });
    }
    const user = new User({ userName, name, password });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export default handler;
