/*eslint-disable */
const mongoose = require('mongoose');
const Busboy = require('busboy');
const path = require('path');
const User = require('./model');
http = require('http'),
  os = require('os'),
  fs = require('fs');

const { ObjectId } = mongoose.Types;

/**
 * Add audio
 * @public
 */

exports.add = async (req, res) => {
  try {
    const { id } = req.params;
    const busboy = new Busboy({ headers: req.headers });

    busboy.on('file', (fieldname, file, filename) => {
      const finalName = `${id}_${filename}`;
      const saveTo = path.resolve('uploads', path.basename(finalName));
      file.pipe(fs.createWriteStream(saveTo));
      res.locals.audioName = finalName;
    });
    busboy.on('finish', async () => {
      const updateFields = {
        audio: res.locals.audioName,
        updatedAt: Date.now(),
      };
      const user = await User.findOneAndUpdate(
        { _id: ObjectId(id) },
        updateFields,
        { new: true },
      );
      res.status(200).send(user);
    });
    return req.pipe(busboy);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong! Please try again' });
  }
};
/**
 * Change audio
 * @public
 */

exports.change = async (req, res) => {
  try {
    const { id } = req.params;
    const busboy = new Busboy({ headers: req.headers });

    busboy.on('file', (fieldname, file, filename) => {
      const finalName = `${id}_${filename}`;
      const saveTo = path.resolve('uploads', path.basename(finalName));
      file.pipe(fs.createWriteStream(saveTo));
      res.locals.audioName = finalName;
    });
    busboy.on('finish', async () => {
      const updateFields = {
        audio: res.locals.audioName,
        updatedAt: Date.now(),
      };
      const user = await User.findOne({ _id: ObjectId(id) });
      console.log(user);
      if (user.audio) {
        const filePath = path.resolve('uploads', user.audio);
        fs.unlinkSync(filePath);
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: ObjectId(id) },
        updateFields,
        { new: true },
      );
      res.status(200).send(updatedUser);
    });
    return req.pipe(busboy);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong! Please try again' });
  }
};

/**
 * Remove Audio
 * @public
 */

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const query = { _id: ObjectId(id) };
    const update = {
      audio: '',
      updatedAt: Date.now(),
    };

    const { audio } = await User.findOne(query);
    if (audio) {
      const filePath = path.resolve('uploads', audio);
      console.log(filePath);
      fs.unlink(filePath, async () => {
        await User.findOneAndUpdate(query, update);
        res.status(200).send({});
      });
    }
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong! Please try again' });
  }
};

/**
 * Get All user
 * @public
 */

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (error) {
    return res.status(400).json({ message: 'No users were created yet!' });
  }
};
