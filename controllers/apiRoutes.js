const router = require("express").Router();
const db = require ("../models");

router.get("/workouts", (req,res) => {
 const getData = db.Workout.find({})
 .then((dbWorkout) => {
    res.json(dbWorkout)
 })
 .catch((err) => {
 res.status(500).json(err);
 })
});



router.post("/workouts", ({body}, res) => {
const postData = db.Workout.create(body)
.then((dbWorkout) => {
res.json(dbWorkout);
})
.catch((err) => {
res.status(500).json(err);
});
})


router.put("/workouts/:id", (req,res) => {
    const updateData = db.Workout.findOneAndUpdate({_id: req.params.id}, 
    {$inc: {totalDuration: req.body.duaration},
    $push: { excercises: req.body},
    },{ new: true })
    .then((dbWorkout) => {
    res.json(dbWorkout);
    })
    .catch((err) => {
    res.status(500).json(err);
    })
});


router.get("/workouts/range", async (req,res) => {
    try { const listOfworkouts = await db.Workout.aggregate([{
    $addFields: {
    totalDuration: {$sum: "$excercises.duration"},
    totalWeight: {$sum: "$exercises.weight"},
    totalSets: { $sum: "$excercises.sets"},
    totalReps: { $sum: "$excercises.distance"},
    totalDistance:{ $sum: "$excerises.distance"},
    },
    }]);
return res.json(listOfworkouts)
} catch(err) {
res.status(400).json(err);
}
});


module.exports = router;

