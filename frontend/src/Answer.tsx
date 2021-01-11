import { FC } from 'react';
import { AnswerData } from './QuestionsData';

interface Props {
  data: AnswerData;
}

export const Answer: FC<Props> = ({ data }) => (
  <div>
    <h4>{data.content}</h4>
    <p className="text-gray-600 text-sm">{`Answered by ${
      data.userName
    } on ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}`}</p>
  </div>
);
