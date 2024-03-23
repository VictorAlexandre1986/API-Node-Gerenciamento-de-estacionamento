// src/useCases/FindParkingSpotById.js
const ParkingSpotRepository = require('../repositories/ParkingSpotRepository.js');

class FindParkingSpotById {
  constructor(repository = new ParkingSpotRepository()) {
    this.repository = repository;
  }

  async execute(id) {
    return await this.repository.findById(id);
  }
}

module.exports = FindParkingSpotById;
