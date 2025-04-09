import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const body = req.query;
  if (
    !body.weight ||
    !body.height ||
    isNaN(Number(body.weight)) ||
    isNaN(Number(body.height))
  ) {
    res.status(400).send({ error: "malformatted parameters" });
  } else {
    const response = {
      weight: body.weight,
      height: body.height,
      bmi: calculateBmi(Number(body.height), Number(body.weight)),
    };

    res.json(response);
  }
});

app.post("/exercises", (req, res) => {
  const body = req.body;
  const daily_exercises = body.daily_exercises;
  const target = body.target;
  if (!daily_exercises || !target) {
    res.status(400).send({ error: "missing parameters" });
  } else if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every(
      (value) => typeof value === "number" && !isNaN(Number(value))
    ) ||
    isNaN(Number(target))
  ) {
    res.status(400).send({ error: "malformatted parameters" });
  } else {
    const result = calculateExercises(daily_exercises, target);
    res.json(result);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
