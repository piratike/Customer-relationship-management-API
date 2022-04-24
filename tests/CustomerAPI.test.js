/**
 * Test for the Customer Creator Class.
 * 
 */
const request = require('supertest');
const app = require('../app.js');

/**
 * Creation of Customers Tests
 */
describe('Customer Creator Class tests', function() {

    it('Create a new Customer', function(done) {

        request(app)
            .post('/api/customers')
            .set('Accept', 'application/json')
            .type('form')
            .send({
                name: 'Customer',
                surname: '1',
                email: 'customer1@gmail.com',
                birthdate: '01/01/2000'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {

                expect(JSON.parse(res.text).Result).toEqual('Success');

                if(err) return done(err);
                return done();

            });

    });

    it('Create an existing Customer', function(done) {

        request(app)
            .post('/api/customers')
            .set('Accept', 'application/json')
            .type('form')
            .send({
                name: 'Customer',
                surname: '2',
                email: 'customer1@gmail.com',
                birthdate: '02/01/2000'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {

                expect(JSON.parse(res.text).Result).toEqual('Error');
                expect(JSON.parse(res.text).Message).toEqual('A Customer with that email already exists.');

                if(err) return done(err);
                return done();

            }
        );

    });

    it('Create a Customer without data', function(done) {

        request(app)
            .post('/api/customers')
            .set('Accept', 'application/json')
            .type('form')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {

                expect(JSON.parse(res.text).Result).toEqual('Error');
                expect(JSON.parse(res.text).Message).toEqual('Some needed data is missing.');

                if(err) return done(err);
                return done();

            }
        );

    });

});

/**
 * Obtaining the Customers Tests
 */
describe('Customer Lister Class tests', function() {

    it('List all Customers', function(done) {

        request(app)
            .get('/api/customers')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {

                expect(JSON.parse(res.text).Result).toEqual('Success');
                expect(JSON.parse(JSON.parse(res.text).Data)[0]).toEqual({
                    name: 'Customer',
                    surname: '1',
                    email: 'customer1@gmail.com',
                    birthdate: '01/01/2000'
                });

                if(err) return done(err);
                return done();

            });

    });

    it('List a Customer', function(done) {

        request(app)
            .get('/api/customers/customer1@gmail.com')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {

                expect(JSON.parse(res.text).Result).toEqual('Success');
                expect(JSON.parse(JSON.parse(res.text).Data)).toEqual({
                    name: 'Customer',
                    surname: '1',
                    email: 'customer1@gmail.com',
                    birthdate: '01/01/2000'
                });

                if(err) return done(err);
                return done();

            });

    });

    it('List a Customer that doesn\'t exists', function(done) {

        request(app)
            .get('/api/customers/customer2@gmail.com')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {

                expect(JSON.parse(res.text).Result).toEqual('Error');
                expect(JSON.parse(res.text).Message).toEqual('Customer doesn\'t exists.');

                if(err) return done(err);
                return done();

            });

    });

});

/**
 * Updating Customers Tests
 */
describe('Customer Updater Class tests', function() {

    it('Update a Customer', function(done) {

        request(app)
            .put('/api/customers/customer1@gmail.com')
            .set('Accept', 'application/json')
            .type('form')
            .send({
                name: 'Customer',
                surname: '3',
                email: 'customer3@gmail.com',
                birthdate: '01/01/2000'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {

                expect(JSON.parse(res.text).Result).toEqual('Success');

                if(err) return done(err);
                return done();

            });

    });

    it('Update a Customer that doesn\'t exists', function(done) {

        request(app)
            .put('/api/customers/customer1@gmail.com')
            .set('Accept', 'application/json')
            .type('form')
            .send({
                name: 'Customer',
                surname: '3',
                email: 'customer3@gmail.com',
                birthdate: '01/01/2000'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {

                expect(JSON.parse(res.text).Result).toEqual('Error');
                expect(JSON.parse(res.text).Message).toEqual('Customer doesn\'t exists.');

                if(err) return done(err);
                return done();

            });

    });

    it('Update a Customer without data given', function(done) {

        request(app)
            .put('/api/customers/customer3@gmail.com')
            .set('Accept', 'application/json')
            .type('form')
            .send({})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {

                expect(JSON.parse(res.text).Result).toEqual('Error');
                expect(JSON.parse(res.text).Message).toEqual('Some needed data is missing.');

                if(err) return done(err);
                return done();

            });

    });

});

/**
 * Removing Customers Tests
 */
describe('Customer Deleter Class tests', function() {

    it('Delete a Customer that doesn\'t exists', function(done) {

        request(app)
            .delete('/api/customers/customer4@gmail.com')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {

                expect(JSON.parse(res.text).Result).toEqual('Error');
                expect(JSON.parse(res.text).Message).toEqual('Customer doesn\'t exists.');

                if(err) return done(err);
                return done();

            });

    });

    it('Delete a Customer', function(done) {

        request(app)
            .delete('/api/customers/customer3@gmail.com')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {

                expect(JSON.parse(res.text).Result).toEqual('Success');

                if(err) return done(err);
                return done();

            });

    });

    it('Delete a Customer without data stored', function(done) {

        request(app)
            .delete('/api/customers/customer4@gmail.com')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {

                expect(JSON.parse(res.text).Result).toEqual('Error');
                expect(JSON.parse(res.text).Message).toEqual('No Customers currently stored.');

                if(err) return done(err);
                return done();

            });

    });

});
