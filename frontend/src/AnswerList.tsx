import { FC } from 'react';
import { AnswerData } from './QuestionsData';
import { Answer } from './Answer';

interface Props {
  data: AnswerData[];
}

export const AnswerList: FC<Props> = ({ data }) => {
  return (
    <div className="border-t border-gray-300 pt-6 mt-8">
      <h3 className="text-2xl font-bold mb-2">Answers ({data.length})</h3>
      <ul>
        {data.map((answer) => (
          <li className="py-4">
            <Answer data={answer} />
          </li>
        ))}
      </ul>
    </div>
  );
};
