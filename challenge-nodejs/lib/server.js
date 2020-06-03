const Hapi = require('@hapi/hapi');
const Boom = require('@hapi/boom');
const dotenv = require('dotenv');
const BuildTreeController = require('../controllers/buildTreeController');

dotenv.config();

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
});

server.route({
  method: 'POST',
  path: '/build-tree',
  handler: (request, h) => {
    try {
      const { payload } = request;
      const tree = BuildTreeController.buildTree(payload);
      return h.response(tree);
    } catch (error) {
      return Boom.badRequest(error);
    }
  },
});

server.route({
  method: '*',
  path: '/{any*}',
  handler() {
    return Boom.notFound();
  },
});

exports.init = async () => {
  await server.initialize();
  return server;
};

exports.start = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
