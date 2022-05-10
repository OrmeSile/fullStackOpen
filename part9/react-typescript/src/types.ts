export interface CourseProps {
  name: string;
  exerciseCount: number;
}
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartDescBase extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartDescBase {
  type: 'normal';
}
interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartDescBase {
  type: 'submission';
  exerciseSubmissionLink: string;
}
interface CourseSpecialPart extends CoursePartDescBase {
  type: 'special';
  requirements: string[];
}

export type CoursePart =
  | CourseSpecialPart
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart;
