const Hapi = require('@hapi/hapi');
const Boom = require('@hapi/boom');
const dotenv = require('dotenv');
const Path = require('path');
const BuildTreeController = require('../controllers/buildTreeController');

dotenv.config();

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  routes: {
    cors: true,
    files: {
      relativeTo: Path.join(__dirname, '../public'),
    },
  },
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

exports.init = async () => {
  await server.initialize();
  return server;
};

exports.start = async () => {
  // eslint-disable-next-line global-require
  await server.register(require('@hapi/inert'));

  server.route({
    method: 'GET',
    path: '/index',
    handler(request, h) {
      return h.file(`index.html`);
    },
  });

  server.route({
    method: 'GET',
    path: '/script.js',
    handler(request, h) {
      return h.file('script.js');
    },
  });

  server.route({
    method: 'GET',
    path: '/pagination.js',
    handler(request, h) {
      return h.file('pagination.js');
    },
  });

  server.route({
    method: '*',
    path: '/{any*}',
    handler() {
      return Boom.notFound();
    },
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
