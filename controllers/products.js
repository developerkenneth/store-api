
const index = (req, res)=>{
        return res.status(200).json({msg : "products where found successfully"});
}

const find = (req, res)=>{
        const {id} = req.params ;
        return res.status(200).json({msg : `product was found successfully with id:${id}`});
}


module.exports = {index, find};