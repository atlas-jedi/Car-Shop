import {
  Model,
  Schema,
  model,
  models,
  isValidObjectId,
} from 'mongoose';
import ICar from '../Interfaces/ICar';
import UnprocessableEntityError from '../Errors/UnprocessableEntityError';
import NotFoundError from '../Errors/NotFoundError';

class CarODM {
  private schema: Schema;
  private model: Model<ICar>;

  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    this.model = models.Car || model('Car', this.schema);
  }

  private checkValidId(id: string) {
    if (!isValidObjectId(id)) throw new UnprocessableEntityError('Invalid mongo id');
  }

  public async create(car: ICar): Promise<ICar> {
    return this.model.create(car);
  }

  public async findAll(): Promise<ICar[]> {
    return this.model.find({});
  }

  public async findById(id: string): Promise<ICar | null> {
    this.checkValidId(id);
    return this.model.findById(id);
  }

  public async update(id: string, car: ICar) {
    this.checkValidId(id);
    const result = await this.model.findByIdAndUpdate(id, car);
    if (result === null) throw new NotFoundError('Car not found');
    return { id, ...car };
  }
}

export default CarODM;