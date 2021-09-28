const express = require("express")
const logger = require ("morgan");
const mongoose = require("mongoose");
const path = require("path");



const app = express();
const PORT = process.env.PORT || 3001;


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));


app.use(require("./controllers"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout",{
userNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindandModify: false,
});


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
