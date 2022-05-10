import { CourseProps } from "../types";

const Total = ({ parts }: { parts: Array<CourseProps> }) => {
  return (
    <div>
      <p>
        Number of exercises{' '}
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total