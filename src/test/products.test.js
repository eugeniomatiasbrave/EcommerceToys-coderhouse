import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';

describe('Products API', function() {
    
    before(async function() {
        // Verificar que el servidor esté corriendo
        await request(app)
            .get('/')
            .expect(200)
            .then(response => {
                console.log('Server is running and listening on the correct port');
            })
            .catch(err => {
                console.error('Server is not running or listening on the correct port', err);
                throw err;
            });
       
    });

    let IdTest;

    it('should get all products', async function() {
        const response = await request(app)
            .get('/api/products')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).to.have.property('status', 200);
        expect(response.body).to.have.property('message', 'Success');
        expect(response.body.data).to.have.property('docs').that.is.an('array');
        expect(response.body.data.docs[0]).to.have.property('_id');
        expect(response.body.data.docs[0]).to.have.property('title');

        IdTest = response.body.data.docs[0]._id; // Guardar el id del primer producto para usarlo en el siguiente test
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

    it('should create a product', async function() {
        const newProduct = {
            title: 'Test Product6',
            description: 'Test Product Description',
            price: 100,
            code: 'TP0016',
            stock: 100,
            category: 'Test Category', 
        };
        const response = await request(app)
            .post('/api/products')
            .send(newProduct)
            .expect('Content-Type', /json/)
    });


    it('should update a product', async function() {
        const updatedProduct = {
            title: 'Updated Test Product',
            description: 'Updated Test Product Description',
            code: 'TP001',
            price: 100,
            category: 'Test Category',
            stock: 100,
            thumbnails: []
        };
        const response = await request(app)
            .put(`/api/products/${IdTest}`)
            .send(updatedProduct)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).to.have.property('status', 200);
        expect(response.body).to.have.property('message', 'Success');
        expect(response.body.data).to.have.property('_id');
        expect(response.body.data).to.have.property('title', updatedProduct.title);
        expect(response.body.data).to.have.property('description', updatedProduct.description);
    });

    it('should delete a product', async function() {
        const response = await request(app)
            .delete(`/api/products/${IdTest}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).to.have.property('status', 200);
        expect(response.body).to.have.property('message', 'Success');
    });
 
});