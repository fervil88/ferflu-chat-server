const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { genJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return res.status(400).json({
        ok: false,
        msg: 'Email already exist',
      });
    }

    const user = User(req.body);

    //encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();

    //Gen JWT
    const token = await genJWT(user.id, user.name, user.email);
    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contact customer support',
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const userDb = await User.findOne({ email });
    if (!userDb) {
      return res.status(404).json({
        ok: false,
        msg: 'User not found',
      });
    }

    const validPassword = bcrypt.compareSync(password, userDb.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: 'Password invalid',
      });
    }

    const token = await genJWT(userDb.id);
    res.json({
      ok: true,
      user: userDb,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error on login',
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  const token = await genJWT(uid);
  const userDb = await User.findById(uid);
  res.json({
    ok: true,
    user: userDb,
    token,
  });
};

module.exports = { createUser, login, renewToken };
