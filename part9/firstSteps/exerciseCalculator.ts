interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
}

interface Arguments {
  period: number[];
  target: number;
}

const parseArguments = (args: string[]): Arguments => {
  if (args.length < 3) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  const period = [];
  for (let i = 3; args[i] !== undefined; i++) period.push(Number(args[i]));
  return { period, target };
};

export const calculateExercises = (period: number[], target: number): Result => {
  const periodLength = period.length;
  const trainingDays = period.filter((day) => day !== 0).length;
  const average = period.reduce((a, b) => a + b) / period.length;
  const success = average >= target;
  const rating =
    target - average > 0.3 ? 1 : Math.abs(target - average) <= 0.3 ? 2 : 3;
  let ratingDescription;
  if (rating === 1) {
    ratingDescription = "Too bad. Keep grinding";
  } else if (rating === 2) {
    ratingDescription = "Not too bad but not too good either";
  } else {
    ratingDescription = "Very good! Keep up the pace";
  }
  return {
    periodLength,
    trainingDays,
    average,
    target,
    success,
    rating,
    ratingDescription,
  };
};

try {
  const { period, target } = parseArguments(process.argv);
  console.log(calculateExercises(period, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
