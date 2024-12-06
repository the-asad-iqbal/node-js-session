import User from "../models/userModel.js";

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.json({ message: "All fields are required!" }).status(400);

    const user = await User.create({
      name,
      email,
      password,
    });

    return res
      .status(201)
      .json({ message: "User created successfully!", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export { createUser };
