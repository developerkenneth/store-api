const express = require("express");
const productsRouter = express.Router();
const {index, find} = require("../controllers/products");


productsRouter.get("/", index);
productsRouter.get("/:id", find);

module.exports = productsRouter;