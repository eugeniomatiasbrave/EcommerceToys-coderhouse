import app from '../app.js';
import request from 'supertest';
import { expect } from 'chai';
import path from 'path';
import __dirname from '../utils.js';

const testImage = path.join(__dirname, 'felipe-test.jpeg');

describe('Products API', function() {
    
    let authToken;
    let IdTest;
    
    before(async function() {

        process.env.PORT = 8081;
        // Verificar que el servidor esté corriendo
        await request(app)
            .get('/')
            .expect(200)
            .then(() => {
                console.log('Server is running and listening on the correct port' + process.env.PORT);
            })
            .catch(err => {
                console.error('Server is not running or listening on the correct port', err);
                throw err;
            });
          // Obtener un token de autenticación
        const loginResponse = await request(app)
        .post('/api/sessions/login')
        .send({ email: 'admin@example.com', password: 'admin' })
        .expect(200);
    
        authToken = loginResponse.body.token;
    });


    it('should create a product', async function() {
        const newProduct = {
            title: 'Test Product 3',
            description: 'Test Product 3 Description',
            price: 1000,
            code: 'aaa101',
            stock: 90,
            category: 'Test Category',
            status: true
        };
        const response = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${authToken}`)
            .field('title', newProduct.title)
            .field('description', newProduct.description)
            .field('price', newProduct.price)
            .field('code', newProduct.code)
            .field('stock', newProduct.stock)
            .field('category', newProduct.category)
            .field('status', newProduct.status)
            .expect('Content-Type', /json/)
            .expect(201);

        console.log('body test:', response.body);
        expect(response.body).to.have.property('message', 'Created');
    });
    

    it('should get all products', async function() {
        const response = await request(app)
            .get('/api/products')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).to.have.property('status', 200);
        expect(response.body).to.have.property('message', 'Success');
        expect(response.body.data).to.have.property('docs').that.is.an('array');
        expect(response.body.data.docs[1]).to.have.property('_id'); // Verificar que el SEGUNDO producto tenga un id
        expect(response.body.data.docs[1]).to.have.property('title'); // Verificar que el SEGUNDO producto tenga un título

        IdTest = response.body.data.docs[1]._id; 
        // Obtener el id del segundo producto para hacer las pruebas de crear, actualizar y eliminar. 
        // De esta forma siempre va a realizar el test sobre un producto CREADO que sera el segundo de la lista, que se sabe que existe, 
    });


    it('should get a product by id', async function() {
        const response = await request(app)
            .get(`/api/products/${IdTest}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).to.have.property('status', 200);
        expect(response.body).to.have.property('message', 'Success');
        expect(response.body.data).to.have.property('_id');
        expect(response.body.data).to.have.property('title');
    });

    it('should update a product', async function() {
        const updatedProduct = {
            title: 'Updated Test Product',
            description: 'Updated Test Product Description',
            code: 'aaa113',
            price: 2025,
            category: 'Test Category',
            status: true,
            stock: 90,

        };
        const response = await request(app)
            .put(`/api/products/${IdTest}`)
            .set('Authorization', `Bearer ${authToken}`)
            .field('title', updatedProduct.title)
            .field('description', updatedProduct.description)
            .field('price', updatedProduct.price)
            .field('code', updatedProduct.code)
            .field('stock', updatedProduct.stock)
            .field('category', updatedProduct.category)
            .field('status', updatedProduct.status)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).to.have.property('message', 'Success');

        
    });

    it('should delete a product', async function() {
        const response = await request(app)
            .delete(`/api/products/${IdTest}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect('Content-Type', /json/)
            .expect(200);
            
        expect(response.body).to.have.property('message', 'Success');
    });
 
});