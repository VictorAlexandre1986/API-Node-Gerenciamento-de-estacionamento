const fastify = require('fastify')({ logger: (true) });
const parkingSpotRoutes = require('./src/routes/parkingSpotRoutes');

// Registre as rotas da aplicação
fastify.register(parkingSpotRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
