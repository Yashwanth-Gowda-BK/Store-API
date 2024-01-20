
const Product = require('../models/product');

const getAllProductStatic = async (req,res)=>{
    const products = await Product.find({}).select('name price').sort('name').limit(5);
    res.status(200).json({products, nbHits:products.length});
}

const getAllProduct = async (req,res)=>{
    const {featured,name,company, sort, fields, } = req.query;
    const queryObj = {};
    
    if(featured){
        queryObj.featured = featured === 'true' ? true : false;
    }
    if(name){
        queryObj.name = { $regex: name, $options: 'i' };
    }
    if(company){
        queryObj.company = company;
    }

    console.log(queryObj);

    let result =  Product.find(queryObj);
    if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }
    else{
        result = result.sort('createdAt')
    }

    if(fields){
        const filedList = fields.split(',').join(' ');
        result = result.select(filedList)
    }

    const page= Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1)* limit;

    result = result.skip(skip).limit(limit)

    
    const products = await result
    res.status(200).json({products, nbHits:products.length});
}

module.exports = {
    getAllProduct,
    getAllProductStatic
} 