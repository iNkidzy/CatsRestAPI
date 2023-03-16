process.env.NODE_ENV = 'dev'

const Cats = require('../models/cat');

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server  = require('../app');



chai.use(chaiHttp);

describe('CatsTester', () =>
{
    describe('Test Routes', ()=>{
    //Test Routes
        it('Test default welcome route', (done) => 
        {
            chai.request(server)
            .get('/api/welcome')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');    
                const result = res.body.message;
                expect(result).to.be.equal('Welcome this is the Cat RestAPI using the MEN stack! :) ');        
                done();
    
            });
        });
    });

    describe('Test CRUD', ()=>{

    // is EMPTY for cleanup
    //  it('should verify that we have 0 products on DB', (done) => 
    //  {
    //      chai.request(server)
    //      .get('/api/cats')
    //      .end((err, res) => {
    //          res.should.have.status(200);
    //          res.body.should.be.a('array');
    //          res.body.length.should.be.eql(0);   
    //          done();
    //      });
    //  });
 

     // POST
     it('should CREATE a cat', (done) => 
     {
 
         let cat = {
             name: "Kiki TESTcat",
             age: 1,
             color: "purple",
             description: "very cute test cat",
             price: 230,
             inStock: true
         }
 
         chai.request(server)
         .post('/api/cats')
         .send(cat)
         .end((err, res) => {
             res.should.have.status(201);
   
             done();
         });
     });


    
    // GET
     it('should GET all cats', (done) => 
     {
         chai.request(server)
         .get('/api/cats')
         .end((err, res) => {
            res.should.have.status(200);
            //res.should.be.json;
            res.body.should.be.a('array');
            done();
         });
     });


      // GET BY ID
    //   it('should GET cats by ID', (done) => 
    //   {
    //     var newCat = new Cats({
    //          name: "Kiki The ONE",
    //          age: 3,
    //          color: "purple",
    //          description: "very cute test cat",
    //          price: 230,
    //          inStock: true
    //       });
    //       newCat.save(function(err, data) {
    //         chai.request(server)
    //           .get('/cats/'+ data.id)
    //           .end(function(err, res){
    //             //res.should.have.status(201);
    //             //res.should.be.json;
    //             res.body.should.be.a('object');
    //             res.body.should.have.property('_id');
    //             res.body.should.have.property('name');
    //             res.body.should.have.property('age');
    //             res.body.should.have.property('color');
    //             res.body.should.have.property('description');  
    //             res.body.should.have.property('price');  
    //             res.body.should.have.property('inStock'); 
                
    //             res.body.name.should.equal('Kiki The ONE');
    //             res.body.age.should.equal(3);
    //             res.body.color.should.equal('purple');
    //             res.body.description.should.equal('very cute test cat');  
    //             res.body.price.should.equal(230);  
    //             res.body.inStock.should.equal(true);
    //             res.body._id.should.equal(data.id);
    //             done();
    //           });
    //       });
    //     });


     // DELETE BY ID




     // UPDATE BY ID



     // GET BY COLOR 


     // GET ALL IN STOCK
     
    });
});
