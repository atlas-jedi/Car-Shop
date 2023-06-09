import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';
import ICar from '../Interfaces/ICar';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async findAll() {
    const cars = await this.service.findAll();
    return this.res.status(200).json(cars);
  }

  public async findById() {
    const { id } = this.req.params;
    try {
      const car = await this.service.findById(id);
      return this.res.status(200).json(car);
    } catch (err) {
      this.next(err);
    }
  }

  public async create() {
    const car: ICar = this.req.body;
    try {
      const newCar = await this.service.createCar(car);
      return this.res.status(201).json(newCar);
    } catch (err) {
      this.next(err);
    }
  }

  public async update() {
    const { id } = this.req.params;
    const car: ICar = this.req.body;
    try {
      const result = await this.service.update(id, car);
      return this.res.status(200).json(result);
    } catch (err) {
      this.next(err);
    }
  }
}

export default CarController;