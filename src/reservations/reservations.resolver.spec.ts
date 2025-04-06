/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsResolver } from './reservations.resolver';
import { ReservationsService } from './reservations.service';
import { CreateReservationInput } from './dto/create-reservation.input';
import { Reservation } from './entities/reservation.entity';
import { v4 as uuidv4 } from 'uuid';

describe('ReservationsResolver', () => {
  let resolver: ReservationsResolver;
  let service: ReservationsService;

  const mockReservation: Reservation = {
    id: uuidv4(),
    roomId: uuidv4(),
    userId: uuidv4(),
    room: {
      id: uuidv4(),
      roomName: 'B101',
      roomType: 'SINGLE',
      roomDesc: null,
      roomCapacity: 1,
      roomPrice: 60000,
      outsideView: false,
      status: 'AVAILABLE',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    user: {
      id: uuidv4(),
      username: 'johndoe',
      email: 'johndoe@me.com',
      password: 'passwoRD123**',
    },
    startDate: new Date('2025-04-06'),
    endDate: new Date('2025-04-08'),
    status: 'PAST',
    guests: 1,
    totalNights: 2,
    totalDays: 3,
    totalWeekendPairs: 0,
    basePrice: 60000,
    totalPrice: 120000,
    discount: 0,
    weekendSurcharge: 0,
    extraServicesFee: 0,
    hasDiscount: false,
    hasExtraServices: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const serviceMock = {
    create: jest.fn().mockResolvedValue(mockReservation),
    findAll: jest.fn().mockResolvedValue([mockReservation]),
    findOne: jest.fn().mockResolvedValue(mockReservation),
    update: jest.fn().mockResolvedValue(mockReservation),
    cancel: jest.fn().mockResolvedValue('Reservation canceled'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsResolver,
        {
          provide: ReservationsService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    resolver = module.get<ReservationsResolver>(ReservationsResolver);
    service = module.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a reservation', async () => {
    const input: CreateReservationInput = {
      roomId: uuidv4(),
      userId: uuidv4(),
      guests: 1,
      hasExtraServices: false,
      startDate: new Date('2025-04-10'),
      endDate: new Date('2025-04-15'),
    };

    const result = await resolver.createReservation(input);

    expect(service.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(mockReservation);
  });

  it('should return all reservations', async () => {
    const result = await resolver.findAll();

    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockReservation]);
  });

  it('should return a reservation by ID', async () => {
    const id = mockReservation.id;

    const result = await resolver.findOne(id);

    expect(service.findOne).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockReservation);
  });

  it('should cancel a reservation', async () => {
    const id = mockReservation.id;

    const result = await resolver.cancelReservation(id);

    expect(service.cancel).toHaveBeenCalledWith(id);
    expect(result).toBe('Reservation canceled');
  });
});
