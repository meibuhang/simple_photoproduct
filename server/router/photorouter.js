module.exports = function (app) {
    const photo= require('../controller/photo');
    //console.log(photo);
    app.post('/api/mf/savephoto', photo.savePhoto);
    app.get('/api/mf/getphoto', photo.getPhoto);
    app.get('/api/mf/getphoto/:id', photo.getPhotoById);
   app.patch('/api/mf/editphoto/:id', photo.updatePhoto);
   app.delete('/api/mf/getphoto/:id', photo.deletePhoto);
}