const User = require('../model/User');
const mongoose = require('mongoose');

const createUser = async (req, res) => {
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

    return res.status(201).send(userSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
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

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).send({ message: 'User not found' });
    }
    const userUpdate = req.body;
    const userUpdated = await User.findByIdAndUpdate(userId, userUpdate, {
      new: true,
    });
    if (!userUpdated) {
      return res.status(400).send('error');
    }
    return res.status(200).send(userUpdated);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).send({ message: 'User not found' });
    }
    let userDeleted = await User.findByIdAndDelete({ _id: userId });
    if (!userDeleted) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ message: 'Usuario eliminado' });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { createUser, getUser, getUsers, updateUser, deleteUser };
