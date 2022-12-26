const User = require('../../users/model/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!email || !username || !password) {
      return res.status(400).send({ message: 'User validation failed' });
    }
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).send({ message: 'User is already registered' });
    }
    const newUser = new User({ username, email, password });
    newUser.password = await newUser.encryptPassword(password);

    const userSaved = await newUser.save();
    if (!userSaved) {
      return res.status(500).send({ message: 'Internal Server Error' });
    }
    const token = jwt.sign(
      { id: userSaved._id, username, email },
      process.env.SECRET,
      {
        expiresIn: 7200,
      }
    );
    return res.status(200).json({ auth: true, token });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userFound = await User.findOne({ username });
    if (!userFound) {
      return res.status(404).send({ message: 'User not found' });
    }
    const validPassword = await userFound.validatePassword(password);
    if (!validPassword) {
      return res.status(401).send({ auth: false, token: null });
    }
    const token = jwt.sign(
      {
        id: userFound._id,
        username,
        email: userFound.email,
      },
      process.env.SECRET,
      { expiresIn: 7200 }
    );
    return res.status(200).json({ auth: true, token });
  } catch (error) {
    return res.status(401).send({ auth: false, token: null });
  }
};

const perfil = async (req, res) => {
  try {
    const { userId } = req;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).send({ message: 'User not found' });
    }
    const userFound = await User.findById({ _id: userId });
    if (!userFound) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.status(200).send(userFound);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
module.exports = { signUp, signIn, perfil };
