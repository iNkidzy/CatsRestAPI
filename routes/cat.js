const router  = require("express").Router();
const cat = require("../models/cat");
const { verifyToken } = require("../validation");

//TODO: CRUD

//Create cats

router.post("/",verifyToken, (req, res) => {

    data = req.body; //encoded in json

    cat.insertMany(data)
    .then(data => { res.status(201).send(data); })
    .catch(err => {res.status(500).send({message: err.message});
})

});


// Read all cats

router.get("/", (req, res)=> {

    cat.find() //cat.find({}, { __v:0}) query + projection params, here we exclude the __v:0 projection mongo makes so we get only the fields we want yay
    .then(data => {
        res.send(data); //mapArray(data)
     })
    .catch(err => {res.status(500).send({message: err.message});
})

});

// Read all cats in stock
router.get("/instock", (req, res)=> {

    cat.find({ inStock: true})
    .then(data => { res.send(data); })
    .catch(err => {res.status(500).send({message: err.message});
})

});

// Read all cats by color/ Get only purple cats
router.get("/color", (req, res)=> {

    cat.find({ color:'purple'})
    .then(data => { res.send(data); })
    .catch(err => {res.status(500).send({message: err.message});
})

});

// Read specific cat
router.get("/:id", (req, res)=> {

    cat.findById(req.params.id)
    .then(data => { res.send(data); })
    .catch(err => {res.status(500).send({message: err.message});
})

});


// Update specific cat

router.put("/:id", verifyToken, (req, res)=> {
    const id = req.params.id;

    cat.findByIdAndUpdate(id, req.body)
    .then(data => { 
        !data ? res.status(404).send({message:"Cannot update cat with id:" + id + ".Maybe cat was not found!"}) :  res.send({message: "Cat was successfully updated!"})  
    })

    .catch(err => {res.status(500).send({message: "Error updating cat with id:" + id});
})
});

// Delete a cat

router.delete("/:id", verifyToken, (req, res)=> {
    const id = req.params.id;

    cat.findByIdAndDelete(id)
    .then(data => { 
        !data ? res.status(404).send({message:"Cannot delete cat with id:" + id + ".Cat was not found!"}) :  res.send({message: "Cat was successfully deleted!"})  
    })

    .catch(err => {res.status(500).send({message: "Error deleting cat with id:" + id});
})
});

function mapArray(inputArray) {
   
    let outputArray = inputArray.map(e => (
    {
        id: e._id,
        name: e.name,
        age: e.age,
        color: e.color,
        description: e.description,
        price: e.price,
        inStock: e.inStock,

        // add uri(HATEOAS) for this specific resource
        uri: "/api/cats/" + e._id
    }
    ));

    return outputArray;
};


module.exports = router;