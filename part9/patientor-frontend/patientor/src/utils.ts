export const assertNever = (value: never) => {
  throw new Error(
    `unHandled discriminated union member: ${JSON.stringify(value)}`
  );
};
