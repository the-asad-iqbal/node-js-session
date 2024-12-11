import User from "../models/userModel.js";

const signupUser = async (req, res) => {
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

// 12131124 => ghasfxb67q3e67tq23n45y924y89p56t4 => qxguon4rg7xc5n0cm w8e === ghasfxb67q3e67tq23n45y924y89p56t4 : true/false
const loginUser = async (req, res) => {
  try {
    const { email, password } = await req.body;

    if (!email || !password)
      return res.json({ message: "All fields are required!" }).status(400);

    const user = await User.findOne({ email });

    if (!user)
      return res.json({ message: "Invalid email or password!" }).status(404);

    const isValidPassword = await user.isValidPassword(password); // true/ false

    if (!isValidPassword)
      return res.json({ message: "Invalid email or password!" }).status(404);

    // tokens, jwt

    const token = await user.generateToken();

    // response cookies => add => authToken : token
    res.cookie("authToken", token, { httpOnly: true, secure: true });

    return res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

// loggedin users => access
const allUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});

    return res.status(200).json({ users: allUsers });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Something went wrong!" });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("authToken");

    return res.status(200).json({ message: "Logout successful!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
export { signupUser, loginUser, allUsers, logoutUser };
