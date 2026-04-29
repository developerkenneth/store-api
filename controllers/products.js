const Product = require("../models/product");

const index = async (req, res) => {
        const { featured, company, search } = req.query;
        const queries = {};
        if (featured) {
                queries.featured = featured === "true" ? true : false;
        }

        if (company) {
                queries.company = company;
        }

        if(search){
                queries.name = {$regex: search, $options: "i"};
        }
        const products = await Product.find(queries);
        return res.status(200).json({ msg: "products where found successfully", products: products });
}

const find = (req, res) => {
        const { id } = req.params;
        return res.status(200).json({ msg: `product was found successfully with id:${id}` });
}


module.exports = { index, find };