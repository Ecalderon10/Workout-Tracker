const express = require("express");
const logger = require ("morgan");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));



mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout",{
userNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindandModify: false,
});


app.use(require("./controllers/apiRoutes"));
app.use(require("./controllers/htmlRoutes"));


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});