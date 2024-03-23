// tests/ParkingSpotCrud.test.js
const { PrismaClient } = require('@prisma/client');
const CreateParkingSpot = require('../src/usecases/CreateParkingSpot');
const FindAllParkingSpots = require('../src/usecases/FindAllParkingSpots');
const FindParkingSpotById = require('../src/usecases/FindParkingSpotById');
const UpdateParkingSpot = require('../src/usecases/UpdateParkingSpot');
const DeleteParkingSpot = require('../src/usecases/DeleteParkingSpot');
const ParkingSpotRepository = require('../src/repositories/ParkingSpotRepository');

const prisma = new PrismaClient();

async function clearDatabase() {
  await prisma.parkingSpot.deleteMany({});
}

describe('ParkingSpot CRUD operations', () => {
  let createdSpotId;

  beforeAll(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a parking spot successfully', async () => {
    const parkingSpotRepository = new ParkingSpotRepository();
    const createParkingSpot = new CreateParkingSpot(parkingSpotRepository);

    const spotData = {
      car: 'Test Car',
      name: 'Test Name',
      plate: 'TEST-1234',
      entryTime: new Date(),
      spotNumber: 1,
    };

    const createdSpot = await createParkingSpot.execute(spotData);
    createdSpotId = createdSpot.id;

    expect(createdSpot).toHaveProperty('id');
    expect(createdSpot.car).toEqual(spotData.car);
  });

  it('should retrieve all parking spots', async () => {
    const parkingSpotRepository = new ParkingSpotRepository();
    const findAllParkingSpots = new FindAllParkingSpots(parkingSpotRepository);

    const spots = await findAllParkingSpots.execute();
    expect(spots.length).toBeGreaterThan(0);
  });

  it('should retrieve a parking spot by ID', async () => {
    const parkingSpotRepository = new ParkingSpotRepository();
    const findParkingSpotById = new FindParkingSpotById(parkingSpotRepository);

    const spot = await findParkingSpotById.execute(createdSpotId);
    expect(spot.id).toEqual(createdSpotId);
  });

  it('should update a parking spot', async () => {
    const parkingSpotRepository = new ParkingSpotRepository();
    const updateParkingSpot = new UpdateParkingSpot(parkingSpotRepository);

    const updatedSpotData = {
      car: 'Updated Car',
      name: 'Updated Name',
      plate: 'UPDT-5678',
      entryTime: new Date(),
      spotNumber: 2,
    };

    const updatedSpot = await updateParkingSpot.execute(createdSpotId, updatedSpotData);
    expect(updatedSpot.car).toEqual(updatedSpotData.car);
  });

  it('should delete a parking spot', async () => {
    const parkingSpotRepository = new ParkingSpotRepository();
    const deleteParkingSpot = new DeleteParkingSpot(parkingSpotRepository);

    await deleteParkingSpot.execute(createdSpotId);
    const spot = await prisma.parkingSpot.findUnique({
      where: { id: createdSpotId },
    });

    expect(spot).toBeNull();
  });
});
