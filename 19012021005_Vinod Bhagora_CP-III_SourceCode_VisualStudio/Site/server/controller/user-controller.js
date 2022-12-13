import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Token from "../model/token.js";
import User from "../model/user.js";

dotenv.config();

export const singupUser = async (request, response) => {
  try {
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(request.body.password, salt);
    const hashedPassword = await bcrypt.hash(request.body.password, 10);

    const user = {
      username: request.body.username,
      name: request.body.name,
      password: hashedPassword,
    };

    const newUser = new User(user);
    await newUser.save();

    return response.status(200).json({ msg: "Signup successfull" });
  } catch (error) {
    return response.status(500).json({ msg: "Error while signing up user" });
  }
};

export const deleteUsers = (req, res) => {
  const { users } = req.body;

  User.deleteMany({ _id: users })
    .then(() => {
      return res.status(400).json({ msg: "Users Deleted Successfully!" });
    })
    .catch((err) => res.status(400).json({ msg: "Error to delete users!" }));
};

export const getUsers = (req, res) => {
  User.find().exec((err, users) => {
    if (err) {
      return res.status(400).json({ msg: "No users found!" });
    }
    return res.status(200).json(users);
  });
};

export const deleteUser = (req, res) => {
  User.remove({ _id: req.params.userId }).exec((err, user) => {
    if (err) {
      return res.status(400).json({ msg: "Unable to delete user!" });
    }
    return res.status(200).json({ msg: "Successfully Deleted!" });
  });
};

export const loginUser = async (request, response) => {
  let user = await User.findOne({ username: request.body.username });

  if (!user) {
    return response.status(400).json({ msg: "Username does not match" });
  }

  const { name, username, role } = user;

  // return response.json(user);

  try {
    let match = await bcrypt.compare(request.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = new Token({ token: refreshToken });
      await newToken.save();

      response.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: name,
        username: username,
        role: role,
      });
    } else {
      response.status(400).json({ msg: "Password does not match" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ msg: error.message });

    // msg: "error while login the user", err
  }
};

export const logoutUser = async (request, response) => {
  const token = request.body.token;
  await Token.deleteOne({ token: token });

  response.status(204).json({ msg: "logout successfull" });
};

export const getUserCount = (req, res) => {
  User.countDocuments({}, function (err, count) {
    if (err) {
      return res.status(400).json({ msg: "No Users found!" });
    } else {
      return res.status(200).json(count);
    }
  });
};
