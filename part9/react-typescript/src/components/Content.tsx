import { CoursePart } from "../types";
import { Part } from "./Part";

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map((part: CoursePart) => {
        return <Part key={part.name} part={part}/>
      })}
    </div>
  );
};

export default Content