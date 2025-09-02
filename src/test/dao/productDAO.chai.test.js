import ProductDAO from '../../dao/mongo/ProductDAO.js';
import { expect } from 'chai';
import mongoose from 'mongoose';
import { faker } from "@faker-js/faker";


describe('Tests unitarios de ProductDAO', () => {
    let productDAO;

	before(async () => {
        // Conectar a la base de datos de prueba
        await mongoose.connect('mongodb://localhost:27017/productsTest');
        // Inicializar el DAO de productos
        productDAO = new ProductDAO();
    });

    after(async () => {
        // Desconectar de la base de datos de prueba
        await mongoose.disconnect();
    });


    it('Debería crear un product', async () => {
        const newProductTest = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription({ max: 45 }),
            code: faker.internet.password(3, false),
            price: faker.commerce.price({ min: 100, max: 3000, dec: 0 }) ,// 133,
            category: faker.commerce.department(),
            stock: faker.number.int(100),
            status: faker.datatype.boolean(), 
            slug: faker.helpers.slugify(faker.commerce.productName()),
            thumbnails: []
        };
        const response = await productDAO.create(newProductTest);

        expect(response).to.have.property('title');
        expect(response).to.have.property('_id');
        expect(response.title).to.be.equal(newProductTest.title);
    });

    it('Deberia otener todos los productos', async () => {
        const response = await productDAO.getViews();
        expect(response).to.be.an('array');
    });

});