import { CoursePart } from '../types';
import { assertNever } from '../utils';

export const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <div>
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
        </div>
      );
    case 'groupProject':
      return (
        <div>
          <p>
            <strong>
              {part.name} {part.groupProjectCount}
            </strong>
          </p>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case 'submission':
      return (
        <div>
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
          <p>submit to {part.exerciseSubmissionLink}</p>
        </div>
      );
    case 'special':
      return (
        <div>
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
          <p>
            required skills:{' '}
            {part.requirements.map((skill) => (
              <span key={skill}>{skill}, </span>
            ))}
          </p>
        </div>
      );
    default:
      return assertNever(part);
  }
};
