module.exports = function (app) {
    const product= require('../controller/product');
    app.post('/api/mf/addproduct', product.addProduct);
   // app.get("/api/mf/listproduct", product.listProduct);

}