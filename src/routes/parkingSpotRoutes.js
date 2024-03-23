// src/routes/parkingSpotRoutes.js
const ParkingSpotController = require('../controllers/ParkingSpotController');

// Este método configura todas as rotas para vagas de estacionamento
function parkingSpotRoutes(fastify, options, done) {
  const controller = new ParkingSpotController();

  // Buscar todas as vagas de estacionamento
  fastify.get('/parking-spots', async (request, reply) => {
    try {
      const spots = await controller.findAll(request, reply);
      request.log.info('Entrou na rota de buscar todas as vagas de estacionamento');
      reply.send(spots);
    } catch (error) {
      reply.code(500).send({ error: 'Erro ao buscar vagas de estacionamento' });
      request.log.error('Erro ao buscar vagas de estacionamento');
    }
  });

  // Buscar uma vaga de estacionamento pelo ID
  fastify.get('/parking-spots/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const spot = await controller.findById(id);
      if (spot) {
        request.log.info('Entrou na rota de buscar uma vaga de estacionamento pelo ID');
        reply.send(spot);
      } else {
        request.log.warn('Vaga de estacionamento não encontrada');
        reply.code(404).send({ error: 'Vaga de estacionamento não encontrada' });
      }
    } catch (error) {
      request.log.error('Erro ao buscar vaga de estacionamento');
      reply.code(500).send({ error: 'Erro ao buscar vaga de estacionamento' });
    }
  });

  // Criar uma nova vaga de estacionamento
  fastify.post('/parking-spots', async (request, reply) => {
    try {
      const spot = await controller.create(request, reply);
      request.log.info('Entrou na rota de criar uma nova vaga de estacionamento');
      reply.code(201).send(spot);
    } catch (error) {
      request.log.error('Erro ao criar vaga de estacionamento');
      reply.code(500).send({ error: 'Erro ao criar vaga de estacionamento' });
    }
  });

  // Atualizar uma vaga de estacionamento
  fastify.put('/parking-spots/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const updatedSpot = await controller.update(id, request.body);
      request.log.info('Entrou na rota de atualizar uma vaga de estacionamento');
      reply.send(updatedSpot);
    } catch (error) {
      request.log.error('Erro ao atualizar vaga de estacionamento');
      reply.code(500).send({ error: 'Erro ao atualizar vaga de estacionamento' });
    }
  });

  // Deletar uma vaga de estacionamento
  fastify.delete('/parking-spots/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      await controller.delete(id);
      request.log.info('Entrou na rota de deletar uma vaga de estacionamento');
      reply.code(200).send({ message: 'Vaga de estacionamento deletada com sucesso' });
    } catch (error) {
      request.log.error('Erro ao deletar vaga de estacionamento');
      reply.code(500).send({ error: 'Erro ao deletar vaga de estacionamento' });
    }
  });

  done();
}

module.exports = parkingSpotRoutes;
