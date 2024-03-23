// Importe suas classes de caso de uso aqui
const CreateParkingSpot = require('../usecases/CreateParkingSpot.js');
const FindAllParkingSpots = require('../usecases/FindAllParkingSpots.js');
const FindParkingSpotById = require('../usecases/FindParkingSpotById.js');
const UpdateParkingSpot = require('../usecases/UpdateParkingSpot.js');
const DeleteParkingSpot = require('../usecases/DeleteParkingSpot.js');

class ParkingSpotController {
  // Método para buscar todas as vagas
  async findAll(request, reply) {
    try {
      const findAllParkingSpots = new FindAllParkingSpots();
      const spots = await findAllParkingSpots.execute();
      request.log.info('Entrou no controller de buscar todas as vagas de estacionamento');
      return spots;
    } catch (error) {
      request.log.error('Entrou no controller de buscar todas as vagas de estacionamento');
      reply.code(500).send({ error: 'Erro ao buscar vagas de estacionamento' });
    }
  }

  // Método para buscar uma vaga por ID
  async findById(request, reply) {
    try {
      const { id } = request.params;
      const findParkingSpotById = new FindParkingSpotById();
      const spot = await findParkingSpotById.execute(id);
      request.log.info('Entrou no controller de buscar uma vaga de estacionamento pelo ID');
      if (!spot) {
        request.log.warn('Entrou no controller de buscar uma vaga de estacionamento pelo ID');
        return reply.code(404).send({ error: 'Vaga não encontrada' });
      }
      return spot;
    } catch (error) {
      request.log.error('Entrou no controller de buscar uma vaga de estacionamento pelo ID');
      reply.code(500).send({ error: 'Erro ao buscar a vaga de estacionamento' });
    }
  }

  // Método para criar uma nova vaga
  async create(request, reply) {
    try {
      const createParkingSpot = new CreateParkingSpot();
      const spot = await createParkingSpot.execute(request.body);
      request.log.info('Entrou no controller de criar uma nova vaga de estacionamento');
      return spot;
    } catch (error) {
      request.log.error('Entrou no controller de criar uma nova vaga de estacionamento');
      reply.code(500).send({ error: 'Erro ao criar vaga de estacionamento' });
    }
  }

  // Método para atualizar uma vaga existente
  async update(request, reply) {
    try {
      const { id } = request.params;
      const updateParkingSpot = new UpdateParkingSpot();
      const updatedSpot = await updateParkingSpot.execute(id, request.body);
      request.log.info('Entrou no controller de atualizar uma vaga de estacionamento');
      return updatedSpot;
    } catch (error) {
      request.log.error('Entrou no controller de atualizar uma vaga de estacionamento');
      reply.code(500).send({ error: 'Erro ao atualizar vaga de estacionamento' });
    }
  }

  // Método para deletar uma vaga
  async delete(request, reply) {
    try {
      const { id } = request.params;
      const deleteParkingSpot = new DeleteParkingSpot();
      await deleteParkingSpot.execute(id);
      request.log.info('Entrou no controller de deletar uma vaga de estacionamento');
      return { message: 'Vaga de estacionamento deletada com sucesso' };
    } catch (error) {
      request.log.error('Entrou no controller de deletar uma vaga de estacionamento');
      reply.code(500).send({ error: 'Erro ao deletar vaga de estacionamento' });
    }
  }
}

module.exports = ParkingSpotController;
