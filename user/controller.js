const mongoose = require('mongoose');
const User = require('./model');
const Busboy = require('busboy');
const path = require('path');
http = require('http'),
    os = require('os'),
    fs = require('fs');

const { ObjectId } = mongoose.Types;


// function streamUpload( userId, userModel){
//     busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
//         const finalName = `${id}_${filename}`
//         let saveTo = path.resolve('uploads', path.basename(finalName));
//         file.pipe(fs.createWriteStream(saveTo));
//         res.locals.audioName = finalName;
//     });
//     busboy.on('finish', async function () {
//         const updateFields = {
//             audio: res.locals.audioName,
//             updatedAt: Date.now(),
//         };
//         const user = await User.findOneAndUpdate(
//             { _id: ObjectId(id) },
//             updateFields,
//             { new: true },
//         );
//         res.status(200).send(user);
//     });
//     return req.pipe(busboy);
// }

/**
 * Add audio
 * @public
 */

exports.add = async (req, res) => {
    try {
        const { id } = req.params;
        const busboy = new Busboy({ headers: req.headers,  }, );

        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            const finalName = `${id}_${filename}`
            let saveTo = path.resolve('uploads', path.basename(finalName));
            file.pipe(fs.createWriteStream(saveTo));
            res.locals.audioName = finalName;
        });
        busboy.on('finish', async function () {
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
        return res.status(400).json({ message: "Something went wrong! Please try again" });
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
            const filePath = path.resolve('uploads', audio)
            console.log(filePath);
            fs.unlink(filePath, async () => {
                await User.findOneAndUpdate(query, update);
                res.status(200).send({});
            });
        }

    } catch (error) {
        return res.status(400).json({ message: "Something went wrong! Please try again" });
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
        return res.status(400).json({ message: "No users were created yet!" })
    }
};
