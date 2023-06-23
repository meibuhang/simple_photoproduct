const tbProduct=require("../models").product;

//todo for adding Product
exports.addProduct=(req,res)=>{

    
let data = {
    productName : req.body.productName,
    productDesc : req.body.productDesc,
    price : req.body.price,
    qty : req.body.qty
}

//todo validasi input
const errors = [];
if(!data.productName) errors.push (" `Product Name` isrequired");
if(!data.productDesc) errors.push("`Description` is required");
if(!data.price) errors.push("`qty` is required");
if(!data.qty) errors.push("`qty` is required");
const hasErrors = Boolean(errors.length);

if (hasErrors) {
    return res.status(422).json({
        errors: errors
    });
}

//todo create product send as Json Response

tbProduct.create(data).then( dataProduct =>{
    res.status(200).send({
        "item": data,
        "message": "product success created",
        "status": "OK",
        dataProduct,
    })
}).catch((err) => { // trying to get error
        res.status(500).json({
          message: err
        });
})
}


//list all product
// exports.listProduct=(req,res)=>{
// tbProduct.findAll({

// })
// }

