interface bmiValues {
  height: number;
  mass: number;
}

const parseArguments = (args: Array<string>): bmiValues => {
  if (args.length < 4) throw new Error('missing arguments');
  if (args.length > 4) throw new Error('too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers.');
  }
};

const calculateBmi = (height: number, mass: number) => {
  const result = mass / Math.pow(height / 100, 2);
  const consoleResult = () => {
    if (result < 16) {
      return 'Underweight (Severe thinness)';
    }
    if (result < 16.9) {
      return 'Underweight (Moderate thinness)';
    }
    if (result < 18.4) {
      return 'Underweight (Mild thinness)';
    }
    if (result < 24.9) {
      return 'Normal (healthy weight)';
    }
    if (result < 29.9) {
      return 'Overweight (Pre-obese)';
    }
    if (result < 34.9) {
      return 'Obese (Class I)';
    }
    if (result < 39.9) {
      return 'Obese (Class II)';
    }
    return 'Obese (Class III)';
  };
  console.log(consoleResult())
};


try {
  const { height, mass } = parseArguments(process.argv);
  calculateBmi(height, mass);
} catch (e: unknown) {
  let errorMessage = 'Something bad happened.';
  if (e instanceof Error) {
    errorMessage += ' Error: ' + e.message;
  }
  console.log(errorMessage);
}
