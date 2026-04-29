const Product = require("../models/product");

const index = async (req, res) => {
        const { featured, company, search, fields, sort, filterNumeric } = req.query;
        const queries = {};
        if (featured) {
                queries.featured = featured === "true" ? true : false;
        }

        if (company) {
                queries.company = company;
        }

        if (search) {
                queries.name = { $regex: search, $options: "i" };
        }

        // filtering using numeric values
        if (filterNumeric) {
                const filterMap = {
                        '>': '$gt',
                        '>=': '$gte',
                        '=': '$eq',
                        '<': '$lt',
                        '<=': '$lte'
                };
                const regEx = /\b(<|>|=|<=|=>)\b/g;

                let filters = filterNumeric.replace(regEx, (match) => `-${filterMap[match]}-`);
                const validFields = ['rating', 'price'];
                filters = filters.split(',').forEach( item => {
                        const [field, operator, value] = item.split('-');
                        if (validFields.includes(field)) {
                                queries[field] = { [operator] : Number(value) }
                        }
                });

        }

        console.log(queries);
        let result = Product.find(queries);


        // for sorted list
        if (sort) {
                const sortList = sort.split(",").join(" ");
                result = result.sort(sortList);
        } else {
                result = result.sort("created_at");
        }

        if (fields) {
                const fieldsList = fields.split(",").join(" ");
                result = result.select(fieldsList);
        }


        // building pagination
        const page = Number(req.query.page || 1);
        const limit = parseInt(req.query.limit || 10);
        const skip = (page - 1) * limit;

        result.limit(limit).skip(skip);

        const products = await result;

        return res.status(200).json({ msg: "products where found successfully", products: products, hit_count: products.length });
}

const find = (req, res) => {
        const { id } = req.params;
        return res.status(200).json({ msg: `product was found successfully with id:${id}` });
}


module.exports = { index, find };