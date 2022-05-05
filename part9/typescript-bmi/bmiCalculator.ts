const calculateBmi = (height: number, mass: number): string => {
  const result = mass / Math.pow(height / 100, 2);
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

console.log(calculateBmi(180, 95));
