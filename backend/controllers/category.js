const Category = require("../models/category");

//middleware
exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category)=>{
        if(err){
            return res.status(400).json({
                error : "Category not found in DB"
            });
        }
        req.category = category;
    });
    next();
}
//other methods
exports.createCategory= (req, res) =>{
    const category = new Category(req.body);
    category.save((err, category)=>{
        if(err){
            return res.status(400).json({
                error : "Not able to save the category"
            });
        }
        return res.json({category});
    });
}

exports.getCategory = (req, res) =>{
    return res.json(req.category);
}

exports.getAllCategory = (req, res) =>{
    Category.find().exec((err, categories)=>{
        if(err){
            return res.status(400).json({
                error : "No category found"
            });
        }
        res.json(categories);
    });
}

exports.updateCategory= (req,res) =>{
    const category = req.category;
    category.name = req.body.name;
    category.save((err, updatedcategory)=>{
        if(err){
            return res.status(400).json({
                error : "Cant update category"
            });
        }
        res.json(updatedcategory);
    });
}

exports.removeCategory = (req, res)=>{
    const category = req.category;
    category.remove((err, removedcategory)=>{
        if(err){
            return res.status(400).json({
                error : "Cant delete category"
            });
        }
        res.json({
            message: "Successfully deleted"
        });
    });
}
