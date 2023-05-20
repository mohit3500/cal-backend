const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const usernameCheck = await User.findOne({ username });
  if (usernameCheck)
    return res.status(409).json({ msg: 'Username already used' });

  const emailCheck = await User.findOne({ email });
  if (emailCheck) return res.status(409).json({ msg: 'Email already used' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    username,
    password: hashedPassword,
  });
  const token = jwt.sign({ id: user._id }, process.env.SecretKey);
  const sendUser = await User.findOne({ username }).select('-password');
  try {
    res
      .status(201)
      .json({ user: sendUser, token, msg: 'Register Successfully' });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user)
    return res.status(400).json({ msg: 'Username or Password is wrong' });

  const verPassword = await bcrypt.compare(password, user.password);
  if (!verPassword)
    return res.status(400).json({ msg: 'Username or Password is wrong' });

  const sendUser = await User.findOne({ username }).select('-password');
  const token = jwt.sign({ id: user._id }, process.env.SecretKey);

  try {
    res.status(201).json({ msg: 'Login Successfully', user: sendUser, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { register, login };
