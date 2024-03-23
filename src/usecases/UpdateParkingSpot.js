// src/useCases/UpdateParkingSpot.js
const ParkingSpotRepository = require('../repositories/ParkingSpotRepository.js');

class UpdateParkingSpot {
  constructor(repository = new ParkingSpotRepository()) {
    this.repository = repository;
  }

  async execute(id, spotData) {
    // Adicione aqui validações ou lógicas adicionais antes da atualização
    return await this.repository.update(id, spotData);
  }
}

module.exports = UpdateParkingSpot;
