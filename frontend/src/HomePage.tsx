import { useEffect, useState, FC } from 'react';
// Give access to the history object which can
// be used to programmatically navigate.
import { RouteComponentProps } from 'react-router-dom';
import { QuestionList } from './QuestionList';
import { getUnansweredQuestions, QuestionData } from './QuestionsData';
import { Page } from './Page';
import { PageTitle } from './PageTitle';

export const HomePage: FC<RouteComponentProps> = ({ history }) => {
  // State component
  const [questions, setQuestions] = useState<QuestionData[] | null>(null);
  const [questionsLoading, setQuestionsLoading] = useState(true);

  useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      const unansweredQuestions = await getUnansweredQuestions();
      // Set states when the data is retrieved
      setQuestions(unansweredQuestions);
      setQuestionsLoading(false);
    };

    doGetUnansweredQuestions();
  }, []);

  // Click event handle
  const handleAskQuestionClick = () => {
    //The history object in ReactRouter keeps track of the locations that have
    // been visited in the app.
    // The push method pushes a new entry into the history stack and performs
    // navigation to the location that's passed as a parameter.
    history.push('/ask');
  };

  return (
    <Page>
      <div className="flex justify-around mb-10 items-center">
        <PageTitle>Unanswered Questions</PageTitle>
        <button
          onClick={handleAskQuestionClick}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Ask a question
        </button>
      </div>
      {questionsLoading ? (
        <div className="mx-auto w-1/4 p-4 bg-white text-center">Loading...</div>
      ) : (
        <QuestionList data={questions || []} />
      )}
    </Page>
  );
};
