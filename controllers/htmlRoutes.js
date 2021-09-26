const router = require("express").Router();
const path = require("path");


router.get("/", (req,res) => {
res.sendFile(path.join(_dirname,"../views/index.html"))
});

router.get("/exercise", (req,res) => {
res.sendFile(path.join(_dirname, "../views/excercise.html"))
});

router.get("/stats", (req,res) => {
res.sendFile(path.join(_dirname, "../views/stats.html"))
});

module.expports = router;



