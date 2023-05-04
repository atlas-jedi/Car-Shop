import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import NotFoundError from '../Errors/NotFoundError';

class MotorcycleService {
  private motorcycleODM = new MotorcycleODM();

  private createMotorcycleDomain(motorcycle: IMotorcycle): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async findAll(): Promise<(Motorcycle | null)[]> {
    const cars = await this.motorcycleODM.findAll();
    return cars.map((motorcycle) => this.createMotorcycleDomain(motorcycle));
  }

  public async findById(id: string): Promise<Motorcycle | null> {
    const motorcycle = await this.motorcycleODM.findById(id);
    if (motorcycle === null) throw new NotFoundError('Motorcycle not found');
    return this.createMotorcycleDomain(motorcycle);
  }

  public async createMotorcycle(motorcycle: IMotorcycle) {  
    const newMoto = await this.motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMoto);
  }

  public async update(id: string, motorcycle: IMotorcycle) {
    const result = await this.motorcycleODM.update(id, motorcycle);
    if (result === null) throw new NotFoundError('Motorcycle not found');
    return this.createMotorcycleDomain(result as IMotorcycle);
  }
}

export default MotorcycleService;