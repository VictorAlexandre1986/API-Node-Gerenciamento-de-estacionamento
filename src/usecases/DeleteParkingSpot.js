// src/useCases/DeleteParkingSpot.js
const ParkingSpotRepository = require('../repositories/ParkingSpotRepository.js');

class DeleteParkingSpot {
  constructor(repository = new ParkingSpotRepository()) {
    this.repository = repository;
  }

  async execute(id) {
    // Adicione aqui validações ou lógicas adicionais antes da exclusão
    return await this.repository.delete(id);
  }
}

module.exports = DeleteParkingSpot;
