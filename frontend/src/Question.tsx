import { FC } from 'react';
import { Link } from 'react-router-dom';
import { QuestionData } from './QuestionsData';

interface Props {
  data: QuestionData;
  showContent?: boolean;
}

export const Question: FC<Props> = ({ data, showContent }) => (
  <div className="bg-white shadow-md p-6 my-4 md:w-2/3 mx-auto">
    <h3 className="text-2xl mb-1">
      <Link to={`question/${data.questionId}`}>{data.title}</Link>
    </h3>
    {showContent && (
      <p className="mb-3">
        {data.content.length > 50
          ? `${data.content.substring(0, 50)}...`
          : data.content}
      </p>
    )}
    <p className="text-gray-600 text-sm">{`Asked by ${
      data.userName
    } on ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}`}</p>
  </div>
);

Question.defaultProps = {
  showContent: true,
};
