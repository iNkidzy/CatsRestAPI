process.env.NODE_ENV = 'dev'

const Cats = require('../models/cat');
const Users = require('../models/user');


//setup on db before and after

before((done)=>{
    Cats.deleteMany({}, function(err) {});
    //Users.deleteMany({}, function(err) {});
    done();
});

// after((done)=>{
//     Cats.deleteMany({}, function(err) {});
//     //Users.deleteMany({}, function(err) {});
//     done();
// });
