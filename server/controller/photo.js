const tbPhoto = require("../models").photoProduct;
const path = require('path');
const fs = require('fs');


exports .getPhoto = async(req,res)=>{
    try {
        const response = await tbPhoto.findAll();  //to do get All Photo
        res.json(response);
       
    } catch (error) {
        console.log(error.message);
        
    }
}

exports .getPhotoById = async(req,res)=>{
    try {
        const response = await tbPhoto.findOne({ //get photo by id
            where :{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

exports .savePhoto = (req,res)=>{
    if (req.files === null) return res.status(400).json(
        {msg:"No File Uploaded"}
    )
  
    const name = req.body.name;
    console.log (name);
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName= file.md5 + ext;
    const url=`${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType=['.png','.jpeg','.jpg'];
    const idProduct = req.body.idproduct;
    if(!allowedType.includes(ext.toLowerCase())) 
     return res.status(422).json(
        {msg:"invalid images"}
        ); 
        //check size photo < 5MB 
    if (fileSize>5000000)
    return res.status(422).json(
        {msg:"Images must be less than 5MB "}
        );
    file.mv(`./public/images/${fileName}`, async(err)=>{
        if (err) return res.status(500).json({msg: err.message});
        try {
            await tbPhoto.create(
                {name:name,image:fileName, url:url, idproduct:idProduct}
            ); res.status(201).json({msg:"Product Created Successfully"});        

        } catch (error) {
            console.log(error.message);
            
        }
    }
    
    )
}
exports .deletePhoto = async(req,res,next)=>{
    const resp = await tbPhoto.findOne({
        where: {
            id : req.params.id
        }
    });
    if (!resp) return res.status(404).json({ msg : "No Data Found"});
    try {
       
        //const filepath = `../public/images/${resp.image}`;
        const filepath = `./public/images/${resp.image}`;
        fs.unlinkSync(filepath);
        await tbPhoto.destroy ({
            where : {
                id : req.params.id
            } 
        });
        res.status(200).json({msg : "Product Deleted Successfully"})
    } catch (error) {
        console.log(error.message);
        next(error);
        
    }
}

exports .updatePhoto = async(req,res,next)=>{
    const resp = await tbPhoto.findOne({
        where: {
            id : req.params.id
        }
    });
    if (!resp) return res.status(404).json({ msg : "No Data Found"});
    let fileName="";
    if (req.files === null) {//if file is empty, user just want to update the title without update the images
        fileName = tbPhoto.image;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName= file.md5 + ext;
        const allowedType=['.png','.jpeg','.jpg'];
        if(!allowedType.includes(ext.toLowerCase()))  return res.status(422).json({msg:"invalid images"}); 
        //check size photo < 5MB 
        if (fileSize>5000000) return res.status(422).json({msg:"Images must be less than 5MB "});
        //const filepath = `../public/images/${resp.image}`;
        const filepath = `./public/images/${resp.image}`;
        fs.unlinkSync(filepath);
        file.mv(`./public/images/${fileName}`, (err)=>{
            if (err) return res.status(500).json({msg: err.message});
           
        })
    }
    const name = req.body.name;
    const idproduct= req.body.idproduct
    const url=`${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
        await tbPhoto.update({name: name,image:fileName,url:url,idproduct:idproduct}, {
            where:{
                id:req.params.id
            }
        });
        res.status(200).json({msg:"Photo Updated Successfully"})
         
    } catch (error) {
        console.log(error.message); 
    }
}