process.env.NODE_ENV = 'test'

const Cats = require('../models/cat');
const Users = require('../models/user');


//setup on db before and after

beforeEach((done)=>{
    Cats.deleteMany({}, function(err) {});
    Users.deleteMany({}, function(err) {});
    done();
});

// afterEach((done)=>{
//   Cats.deleteMany({}, function(err) {});
//   Users.deleteMany({}, function(err) {});
//     done();
// });
