import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import Motorcycle from '../../../src/Domains/Motorcycle';

const motorcycleInput: IMotorcycle = {
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

const motorcycleOutput: Motorcycle = new Motorcycle({
  id: '64533cb5c37bbcf2ec7c3fa6',
  model: 'Honda Cb 600f Hornet',
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
});

const motos: IMotorcycle[] = [
  {
    id: '6348513f34c397abcad040b2',
    model: 'Honda Cb 700f Hornet',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 700,
  },
  {
    id: '75398273957a3f1cbae084d9',
    model: 'Yamaha YZF-R6',
    year: 2020,
    color: 'Blue',
    status: false,
    buyValue: 70.000,
    category: 'Sport',
    engineCapacity: 600,
  },
];

describe('Testa a unidade Service de Motorcycle', function () {
  describe('Deve cadastrar um novo moto', function () {
    it('deve retornar a saída correta de um novo moto', async function () {
      sinon.stub(Model, 'create').resolves(motorcycleOutput);
  
      const service = new MotorcycleService();
      const result = await service.createMotorcycle(motorcycleInput);
  
      expect(result).to.be.deep.equal(motorcycleOutput);
    });
  });
  
  describe('Deve listar todos os motos', function () {
    it('deve retornar a lista correta dos motos', async function () {
      sinon.stub(Model, 'find').resolves(motos);

      const service = new MotorcycleService();
      const result = await service.findAll();

      expect(result).to.be.deep.equal(motos);
    });
  });

  describe('Deve retornar busca de moto por id', function () {
    beforeEach(function () {
      sinon.restore();
    });

    it('deve retornar os dados correspondentes ao id', async function () {
      sinon.stub(Model, 'findById').resolves(motorcycleOutput);

      const service = new MotorcycleService();
      const result = await service.findById('64533cb5c37bbcf2ec7c3fa6');
    
      expect(result).to.be.deep.equal(motorcycleOutput);
    });

    it('deve retornar erro ao pesquisar por id inválido', async function () {
      const service = new MotorcycleService();
      try {
        await service.findById('invalid');
      } catch (err) {
        expect(err).to.be.an.instanceOf(Error);
      }
    });
  });

  describe('Deve atualizar moto por id', function () {
    beforeEach(function () {
      sinon.restore();
    });

    it('deve retornar corretamente o moto atualizado', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleOutput);
      
      const service = new MotorcycleService();
      const result = await service.update('64533cb5c37bbcf2ec7c3fa6', motorcycleInput);
    
      expect(result).to.be.deep.equal(motorcycleOutput);
    });

    it('deve retornar erro ao tentar atualizar moto inexistente', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
    
      const service = new MotorcycleService();
      try {
        await service.update('64533cb5c37bbcf2ec7c366', motorcycleInput);
      } catch (err) {
        expect(err).to.be.an.instanceof(Error);
      }
    });
  });
});
