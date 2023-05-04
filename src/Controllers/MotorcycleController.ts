import { NextFunction, Request, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';
import IMotorcycle from '../Interfaces/IMotorcycle';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async findAll() {
    const motorcycles = await this.service.findAll();
    return this.res.status(200).json(motorcycles);
  }

  public async findById() {
    const { id } = this.req.params;
    try {
      const motorcycle = await this.service.findById(id);
      return this.res.status(200).json(motorcycle);
    } catch (err) {
      this.next(err);
    }
  }

  public async create() {
    const motorcycle: IMotorcycle = this.req.body;
    try {
      const newMotorcycle = await this.service.createMotorcycle(motorcycle);
      return this.res.status(201).json(newMotorcycle);
    } catch (err) {
      this.next(err);
    }
  }

  public async update() {
    const { id } = this.req.params;
    const motorcycle: IMotorcycle = this.req.body;
    try {
      const result = await this.service.update(id, motorcycle);
      return this.res.status(200).json(result);
    } catch (err) {
      this.next(err);
    }
  }
}

export default MotorcycleController;