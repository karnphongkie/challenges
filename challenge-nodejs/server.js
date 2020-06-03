const Hapi = require('@hapi/hapi');
const Boom = require('@hapi/boom');
const dotenv = require('dotenv');
const BuildTreeController = require('./controllers/buildTreeController');

dotenv.config();
const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
  });

  server.route({
    method: 'POST',
    path: '/',
    handler: (request, h) => {
      try {
        const { payload } = request;
        const tree = BuildTreeController.buildTree(payload);
        return h.response(tree);
      } catch (error) {
        console.log(error);
        return Boom.badRequest(error);
      }
    },
  });

  server.route({
    method: '*',
    path: '/{any*}',
    handler() {
      return '404 Not Found';
    },
  });
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
