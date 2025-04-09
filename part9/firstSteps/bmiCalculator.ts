interface BmiValues {
  stature: number;
  mass: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      stature: Number(args[2]),
      mass: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (stature: number, mass: number): string => {
  if (stature === 0) return "cant't divide by 0!";
  const bmi = mass / (stature / 100) ** 2;
  if (bmi < 16) {
    return "Underweight  (Severe thinness)";
  } else if (bmi >= 16 && bmi < 17) {
    return "Underweight (Moderate thinness)";
  } else if (bmi >= 17 && bmi < 18.5) {
    return "Underweight (Mild thinness)";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal (Healthy weight)";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight (Pre-obese)";
  } else if (bmi >= 30 && bmi < 35) {
    return "Obese (Class I)";
  } else if (bmi >= 35 && bmi < 40) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

try {
  const { stature, mass } = parseBmiArguments(process.argv);
  console.log(calculateBmi(stature, mass));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
