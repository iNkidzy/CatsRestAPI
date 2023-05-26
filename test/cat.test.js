const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../app');

chai.use(chaiHttp);

describe('Cats tests', () => {



    // POST Create functional test
    it('should register + login a user, create a cat and verify 1 in DB', (done) => {

        // 1) Register new user
        let user = {
            username: "Lucky",
            name: "Lucky Jack",
            email: "mail@email.com",
            password: "12345678"
        }
        chai.request(server)
            .post('/api/user/signup')
            .send(user)
            .end((err, res) => {
                
                // Asserts
                expect(res.status).to.be.equal(200);   
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.equal(null);
               
                // 2) Login the user
                chai.request(server)
                    .post('/api/user/login')
                    .send({
                        "username": "Lucky",
                        "password": "12345678"
                    })
                    .end((err, res) => {
                        // Asserts                        
                        expect(res.status).to.be.equal(200);
                        expect(res.body.error).to.be.equal(null);                        
                        let token = res.body.data.token;

                        // 3) Create new cat
                        let cat =
                        {
                            name: "Test Cat",
                            age: 3,
                            color: "purple",
                            description: "Test Cat Description",
                            price: 100,
                            inStock: true
                        };

                        chai.request(server)
                            .post('/api/cats')
                            .set({ "auth-token": token })
                            .send(cat)
                            .end((err, res) => {
                                
                                // Asserts
                                expect(res.status).to.be.equal(201);                                
                                expect(res.body).to.be.a('array');
                                expect(res.body.length).to.be.eql(1);
                                
                                let savedCat = res.body[0];
                                expect(savedCat.name).to.be.equal(cat.name);
                                expect(savedCat.age).to.be.equal(cat.age);
                                expect(savedCat.color).to.be.equal(cat.color);
                                expect(savedCat.description).to.be.equal(cat.description);
                                expect(savedCat.price).to.be.equal(cat.price);
                                expect(savedCat.inStock).to.be.equal(cat.inStock);


                                // 4) Verify one cat in test DB ---
                                chai.request(server)
                                    .get('/api/cats')
                                    .end((err, res) => {
                                        
                                        // Asserts
                                        expect(res.status).to.be.equal(200);                                
                                        expect(res.body).to.be.a('array');                                
                                        expect(res.body.length).to.be.eql(1);
                                
                                        done();
                                    });
                            });
                    });
            });
    });

    // Valid input test (register, login, )
    it('should register + login a user, create cat and delete it from DB', (done) => {

        // 1) Register new user
        let user = {
            username: "Lucky",
            name: "Lucky Jack",
            email: "mail@email.com",
            password: "12345678"
        }
        chai.request(server)
            .post('/api/user/signup')
            .send(user)
            .end((err, res) => {
                
                // Asserts
                expect(res.status).to.be.equal(200);   
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.equal(null);
                
                // 2) Login the user
                chai.request(server)
                    .post('/api/user/login')
                    .send({
                        "username": "Lucky",
                        "password": "12345678"
                    })
                    .end((err, res) => {
                        // Asserts                        
                        expect(res.status).to.be.equal(200);                         
                        expect(res.body.error).to.be.equal(null);                        
                        let token = res.body.data.token;

                        // 3) Create new cat
                        let cat =
                        {
                            name: "Test Cat",
                            age: 3,
                            color: "purple",
                            description: "Test Cat Description",
                            price: 100,
                            inStock: true
                        };

                        chai.request(server)
                            .post('/api/cats')
                            .set({ "auth-token": token })
                            .send(cat)
                            .end((err, res) => {
                                
                                // Asserts
                                expect(res.status).to.be.equal(201);                                
                                expect(res.body).to.be.a('array');
                                expect(res.body.length).to.be.eql(1);
                                
                                let savedCat = res.body[0];
                                expect(savedCat.name).to.be.equal(cat.name);
                                expect(savedCat.age).to.be.equal(cat.age);
                                expect(savedCat.color).to.be.equal(cat.color);
                                expect(savedCat.description).to.be.equal(cat.description);
                                expect(savedCat.price).to.be.equal(cat.price);
                                expect(savedCat.inStock).to.be.equal(cat.inStock);

                                // 4) Delete cats
                                chai.request(server)
                                    .delete('/api/cats/' + savedCat._id)
                                    .set({ "auth-token": token })
                                    .end((err, res) => {
                                        
                                        // Asserts
                                        expect(res.status).to.be.equal(200);                                        
                                        const actualVal = res.body.message;
                                        expect(actualVal).to.be.equal('Cat was successfully deleted!');        
                                        done();
                                    });
                                    
                            });
                    });
            });
    });
    
});