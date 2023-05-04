import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

const carInput: ICar = {
  model: 'Uno da Escada',
  year: 1960,
  color: 'Red',
  buyValue: 1500,
  doorsQty: 2,
  seatsQty: 2,
};

const carOutput: Car = new Car({
  id: '64533cb5c37bbcf2ec7c3fa6',
  model: 'Uno da Escada',
  year: 1960,
  color: 'Red',
  status: false,
  buyValue: 1500,
  doorsQty: 2,
  seatsQty: 2,
});

const cars = [
  {
    id: '634852326b35b59438fbea2f',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    id: '634852326b35b59438fbea31',
    model: 'Tempra',
    year: 1995,
    color: 'Black',
    status: false,
    buyValue: 39,
    doorsQty: 2,
    seatsQty: 5,
  },
];

describe('Testa a unidade Service de Car', function () {
  describe('Deve cadastrar um novo carro', function () {
    it('deve retornar a saída correta de um novo carro', async function () {
      sinon.stub(Model, 'create').resolves(carOutput);
  
      const service = new CarService();
      const result = await service.createCar(carInput);
  
      expect(result).to.be.deep.equal(carOutput);
    });
  });
  
  describe('Deve listar todos os carros', function () {
    it('deve retornar a lista correta dos carros', async function () {
      sinon.stub(Model, 'find').resolves(cars);

      const service = new CarService();
      const result = await service.findAll();

      expect(result).to.be.deep.equal(cars);
    });
  });

  describe('Deve retornar busca de carro por id', function () {
    beforeEach(function () {
      sinon.restore();
    });

    it('deve retornar os dados correspondentes ao id', async function () {
      sinon.stub(Model, 'findById').resolves(carOutput);

      const service = new CarService();
      const result = await service.findById('64533cb5c37bbcf2ec7c3fa6');
    
      expect(result).to.be.deep.equal(carOutput);
    });

    it('deve retornar erro ao pesquisar por id inválido', async function () {
      const service = new CarService();
      try {
        await service.findById('invalid');
      } catch (err) {
        expect(err).to.be.an.instanceOf(Error);
      }
    });
  });

  describe('Deve atualizar carro por id', function () {
    beforeEach(function () {
      sinon.restore();
    });

    it('deve retornar corretamente o carro atualizado', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(carOutput);
      
      const service = new CarService();
      const result = await service.update('64533cb5c37bbcf2ec7c3fa6', carInput);
    
      expect(result).to.be.deep.equal(carOutput);
    });

    it('deve retornar erro ao tentar atualizar carro inexistente', async function () {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
    
      const service = new CarService();
      try {
        await service.update('64533cb5c37bbcf2ec7c366', carInput);
      } catch (err) {
        expect(err).to.be.an.instanceof(Error);
      }
    });
  });
});
