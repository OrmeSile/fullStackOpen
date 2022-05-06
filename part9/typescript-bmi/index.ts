import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  console.log(req.query);
  if (!isNaN(Number(height)) && !isNaN(Number(weight)) && height && weight) {
    const bmiString = calculateBmi(Number(height), Number(weight));
    res.json({
      weight,
      height,
      bmi: bmiString,
    });
  } else {
    res.json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;
  if (isNaN(target) || !Array.isArray(daily_exercises)) {
    res.status(400).send({ error: 'malformatted parameters' });
  } else if (!target || daily_exercises.length === 0) {
    res.status(400).send({ error: 'parameters missing' });
  } else if (!isNaN(target) && Array.isArray(daily_exercises)) {
    const exerciseResults = calculateExercises(daily_exercises, target);
    res.status(200).send(exerciseResults);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
