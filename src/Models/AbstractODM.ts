import {
  Model,
  Schema,
  model,
  models,
  isValidObjectId,
} from 'mongoose';
import UnprocessableEntityError from '../Errors/UnprocessableEntityError';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  private schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(modelName, this.schema);
  }

  private checkValidId(id: string) {
    if (!isValidObjectId(id)) throw new UnprocessableEntityError('Invalid mongo id');
  }

  public async create(obj: T): Promise<T> {
    return this.model.create(obj);
  }

  public async findAll(): Promise<T[]> {
    return this.model.find({});
  }

  public async findById(id: string): Promise<T | null> {
    this.checkValidId(id);
    return this.model.findById(id);
  }

  public async update(id: string, obj: Partial<T>) {
    this.checkValidId(id);
    const result = await this.model.findByIdAndUpdate(id, obj);
    if (result === null) return null;
    return { id, ...obj };
  }
}

export default AbstractODM;