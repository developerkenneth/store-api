require("dotenv").config();

// error handler
require("express-async-errors");

const express = require("express");
const app = express();
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const connectDB = require("./db/connect");

// get product router
const productsRouter = require("./routes/products");

// define port 
const PORT = process.env.PORT || 4000;

// home

app.get("/", (req, res)=>{
    console.log("hello world");
        res.json({
            msg: "app has been created successfully"
        });
});


// routes
// product route
app.use("/api/v1/products", productsRouter);

// checking for page that are not available
app.use(notFound);

// handles all the error
app.use(errorHandlerMiddleware);


async function startServer (){
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, ()=>{
            console.log(`app started on port: ${PORT} http://localhost:${PORT} `);
        })
    }catch(error){
        console.log(error);
        process.exit(0);
    }
}


startServer();