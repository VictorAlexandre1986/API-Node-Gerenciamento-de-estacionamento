// src/useCases/CreateParkingSpot.js
const ParkingSpotRepository = require('../repositories/ParkingSpotRepository.js');

class CreateParkingSpot {
  constructor(repository = new ParkingSpotRepository()) {
    this.repository = repository;
  }

  async execute(spotData) {
    // Aqui, você pode adicionar validações ou lógicas adicionais antes de criar a vaga
    return await this.repository.create(spotData);
  }
}

module.exports = CreateParkingSpot;
