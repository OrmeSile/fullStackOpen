interface ExerciseReview {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Arguments {
  hoursPerDays: Array<number>
  target: number
}

type ExerciseRating = 1 | 2 | 3;



const parseMultipleArguments = (args: Array<string>): Arguments => {
  if (args.length < 4) throw new Error('missing arguments');
  const stringArguments = Array.from(args).slice(2)
  const numberArguments = stringArguments.map(a => Number(a))
  stringArguments.forEach(arg => {
    if (isNaN(Number(arg))) {
      throw new Error('some arguments were not numbers')
    }
  })
  const target = numberArguments[0]
  const hoursPerDays = numberArguments.slice(0)

  return {
    hoursPerDays,
    target
  }

}

const calculateExercises = (
  hoursPerDays: Array<number>,
  target: number
): ExerciseReview => {
  const periodLength: number = hoursPerDays.length;
  const trainingDays: number = hoursPerDays.filter((d) => d !== 0).length;
  const average: number =
    hoursPerDays.reduce((total, current) => total + current, 0) / periodLength;
  let rating: ExerciseRating;
  const ratingFunc = ():string => {
    if (average < target * 0.8) {
      rating = 1;
      return 'Too little exercise.';
    }
    if (average >= target * 0.8 && average <= target * 1.2) {
      rating = 2;
      return 'Keep up the good work !';
    } else {
      rating = 3;
      return 'exceeded expectations !';
    }
  };
  const ratingDescription = ratingFunc()
  const success = average >= target

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
};

try {
  const { hoursPerDays, target } = parseMultipleArguments(process.argv)
  console.log(calculateExercises(hoursPerDays, target))
} catch (e: unknown) {
  let errorMessage = 'Something bad happened'
  if (e instanceof Error) {
    errorMessage += ' Error: ' + e.message
  }
  console.log(errorMessage)
}