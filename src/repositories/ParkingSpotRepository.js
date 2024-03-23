const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ParkingSpotRepository {
  /**
   * Busca todas as vagas de estacionamento.
   * @returns Uma promessa que resolve com todas as vagas de estacionamento.
   */
  async findAll() {
    return await prisma.parkingSpot.findMany();
  }

  /**
   * Cria uma nova vaga de estacionamento.
   * @param {Object} spotData Dados da vaga de estacionamento a ser criada.
   * @returns Uma promessa que resolve com a vaga de estacionamento criada.
   */
  async create(spotData) {
    return await prisma.parkingSpot.create({
      data: spotData,
    });
  }

  /**
   * Atualiza uma vaga de estacionamento existente.
   * @param {number} id O ID da vaga de estacionamento a ser atualizada.
   * @param {Object} spotData Dados da vaga de estacionamento a ser atualizada.
   * @returns Uma promessa que resolve com a vaga de estacionamento atualizada.
   */
  async update(id, spotData) {
    return await prisma.parkingSpot.update({
      where: { id: parseInt(id, 10) },
      data: spotData,
    });
  }

  /**
   * Deleta uma vaga de estacionamento.
   * @param {number} id O ID da vaga de estacionamento a ser deletada.
   * @returns Uma promessa que resolve quando a vaga de estacionamento é deletada.
   */
  async delete(id) {
    return await prisma.parkingSpot.delete({
      where: { id: parseInt(id, 10) },
    });
  }

  /**
   * Busca uma vaga de estacionamento pelo ID.
   * @param {number} id O ID da vaga de estacionamento.
   * @returns Uma promessa que resolve com a vaga de estacionamento, se encontrada.
   */
  async findById(id) {
    return await prisma.parkingSpot.findUnique({
      where: { id: parseInt(id, 10) },
    });
  }
}

module.exports = ParkingSpotRepository;
