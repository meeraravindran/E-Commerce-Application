const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { parseInt, sortBy } = require("lodash");
//midleware
exports.getProductById = (req, res, next, id) =>{
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err){
            return res.json({
                error: "Product not found"
            });
        }
        req.product = product;
        next();
    });
}

exports.photo =(req, res, next) =>{
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

exports.updateStock= (req, res, next) =>{
    let myOperations = req.body.order.product.map(prod =>{
        return{
            updateOne: {
                filter :{_id: prod._id},
                update : {$inc: {stock :-prod.count, sold: +prod.count}}
            }
        }
    });
    Product.bulkWrite(myOperations, {}, (err,products) =>{
        if(err){
            return res.status(400).json({
                error :"Bulk operation failed"
            });
        }
        next();
    });
}
//methods
exports.createProduct = (req, res) =>{
    // 
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) =>{
        if(err){
            return res.json({
                error : "Problem with image"
            });
        }
        //destructing fields
        const {name, description, stock, price, category} = fields;
        if(!name || !description || !stock || !price || !category){
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        //todo...fields
        let product = new Product(fields);

        //handling the file
        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    error: "File is too big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        //save to DB
        product.save((err, product)=>{
            if(err){
                return res.status(400).json({
                    error: "Saving product failed"
                });
            }
            res.json(product);
        });
    });
}

exports.getProduct = (req, res) =>{
    req.product.photo = undefined;
    return res.json(req.product);
}

exports.removeProduct = (req, res)=>{
    let product = req.product;
    product.remove((err, deletedproduct)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to delete"
            });
        }
        res.json({
            message: "Deleted sucessfully"
        });
    });
}

exports.updateProduct = (req, res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) =>{
        if(err){
            return res.json({
                error : "Problem with image"
            });
        }
        //updation code 
        let product = req.product;
        product = _.extend(product, fields);
        //handling the file
        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    error: "File is too big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        //save to DB
        product.save((err, product)=>{
            if(err){
                return res.status(400).json({
                    error: "Product updation failed"
                });
            }
            res.json(product);
        });
    });
}

exports.getAllProducts = (req, res)=>{
    let limit =req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy? req.query.sortBy : "_id";
    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err,productlist)=>{
        if(err){
            return res.json({
                error: "No product found!!"
            });
        }
        res.json(productlist);
    })
}

exports.getAllUniqueCategory = (req,res) =>{
    Product.distinct("category", {}, (err, category) =>{
        if(err){
            return res.status(400).json({
                error: "No category found"
            });
        }
        res.json(category);
    });
}