import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import NotFoundError from '../Errors/NotFoundError';

class CarService {
  private carODM = new CarODM();

  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async findAll(): Promise<(Car | null)[]> {
    const cars = await this.carODM.findAll();
    return cars.map((car) => this.createCarDomain(car));
  }

  public async findById(id: string): Promise<Car | null> {
    const car = await this.carODM.findById(id);
    if (car === null) throw new NotFoundError('Car not found');
    return this.createCarDomain(car);
  }

  public async createCar(car: ICar) {  
    const newCar = await this.carODM.create(car);
    return this.createCarDomain(newCar);
  }
}

export default CarService;