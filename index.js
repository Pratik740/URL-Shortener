const express = require('express')
const app = express();
const path = require('path')
require('dotenv').config(); // Load environment variables
const {connectMongoDb} = require('./connection')
const PORT = process.env.PORT || 8000;
const cookieParser = require('cookie-parser')
const {checkForAuthentication, restrictTo} = require('./middlewares/auth')

const urlRouter = require('./routes/url')
const staticRouter = require('./routes/staticRoute')
const userRouter = require('./routes/user')

// Connection
connectMongoDb(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.log(`Some error occurred ${err}`))


app.set("view engine","ejs")  // Tells Express to use ejs as templating engine for rendering views(templates)
app.set("views",path.resolve("./views"))   // Specifies the directory where Express should look for template files.

app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/url',checkForAuthentication,restrictTo(["NORMAL","ADMIN"]),urlRouter);
app.use('/user',userRouter);
app.use("/",staticRouter);


app.listen(PORT,() => console.log(`Server has been started on PORT ${PORT}`))



