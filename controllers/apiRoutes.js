const router = require("express").Router();
const db = require ("../models");



router.get("/workouts", (req,res) => {
 db.Workout.find({})
 .then((dbWorkout) => {
    res.json(dbWorkout)
 })
 .catch((err) => {
 res.status(500).json(err);
 })
});



router.post("/workouts", ({ body }, res) => {
db.Workout.create(body)
.then((dbWorkout) => {
res.json(dbWorkout);
})
.catch((err) => {
res.status(500).json(err);
});
})


router.put("/workouts/:id", (req,res) => {
    db.Workout.findOneAndUpdate({_id: req.params.id}, 
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
    try { const allWorkouts = await db.Workout.aggregate([{
    $addFields: {
    totalDuration: {$sum: "$exercises.duration"},
    totalWeight: {$sum: "$exercises.weight"},
    totalSets: { $sum: "$exercises.sets"},
    totalReps: { $sum: "$exercises.reps"},
    totalDistance:{ $sum: "$exercises.distance"},
    },
    }]);
return res.json(allWorkouts)
} catch(err) {
res.status(400).json(err);
}
});


module.exports = router;

