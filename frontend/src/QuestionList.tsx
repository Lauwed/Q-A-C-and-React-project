// Functional Component (FC) is a generic TypeScript type
// we can use to pass strongly-typed props to a function-based
// component. The syntax is FC<Props>.
import { FC } from 'react';
import { QuestionData } from './QuestionsData';
import { Question } from './Question';

interface Props {
  data: QuestionData[];
}

export const QuestionList: FC<Props> = ({ data }) => {
  return (
    <ul>
      {data.map((question) => (
        <li key={question.questionId}>
          <Question data={question} />
        </li>
      ))}
    </ul>
  );
};
