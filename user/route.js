const express = require('express');
const controller = require('./controller');

const routes = express.Router();

routes.route('/').get(controller.getAllUsers);
routes.route('/:id/audio').post(controller.add);
routes.route('/:id/audio').put(controller.change);
routes.route('/:id/audio').delete(controller.remove);

module.exports = routes;
