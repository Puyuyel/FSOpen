interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartBase {
  description: string;
  requirements: string[];
  kind: "special";
}

type Part =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Content = (props: { parts: Part[] }) => {
  return (
    <div>
      {props.parts.map((part) => {
        switch (part.kind) {
          case "basic":
            return (
              <p key={part.name}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <br />
                <i>{part.description}</i>
              </p>
            );
          case "group":
            return (
              <p key={part.name}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <br />
                project exercises {part.groupProjectCount}
              </p>
            );
          case "background":
            return (
              <p key={part.name}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <br />
                <i>{part.description}</i>
                <br />
                submit to {part.backgroundMaterial}
              </p>
            );
          case "special":
            return (
              <p key={part.name}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <br />
                <i>{part.description}</i>
                <br />
                required skills: {part.requirements.join(", ")}
              </p>
            );
          default:
            return assertNever(part);
        }
      })}
    </div>
  );
};

interface TotalProps {
  total: number;
}

const Total = (props: TotalProps) => {
  return <p>Number of exercises {props.total}</p>;
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: Part[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
