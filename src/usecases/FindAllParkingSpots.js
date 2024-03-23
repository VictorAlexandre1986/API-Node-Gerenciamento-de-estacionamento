// src/useCases/FindAllParkingSpots.js
const ParkingSpotRepository = require('../repositories/ParkingSpotRepository.js');

class FindAllParkingSpots {
  constructor(repository = new ParkingSpotRepository()) {
    this.repository = repository;
  }

  async execute() {
    return await this.repository.findAll();
  }
}

module.exports = FindAllParkingSpots;
