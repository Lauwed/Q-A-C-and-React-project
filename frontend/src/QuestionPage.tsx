import React, { FC, useState, Fragment, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Page } from './Page';
import { QuestionData, getQuestion, postAnswer } from './QuestionsData';
import { AnswerList } from './AnswerList';
import { Form, required, minLength, Values } from './Form';
import { Field } from './Field';

interface RouteParams {
  questionId: string;
}

export const QuestionPage: FC<RouteComponentProps<RouteParams>> = ({
  match,
}) => {
  // Store the question in the state.
  // The state is null by default while the question is fetched.
  const [question, setQuestion] = useState<QuestionData | null>(null);

  // useEffect hook function allows a side effect, such
  // as fetching data, to be performed in a component.
  // First parameter ; function to be execute
  // Seconde parameter ; When the function should
  // be executed.
  useEffect(() => {
    const doGetQuestion = async (questionId: number) => {
      const foundQuestion = await getQuestion(questionId);
      setQuestion(foundQuestion);
    };

    if (match.params.questionId) {
      const questionId = Number(match.params.questionId);
      doGetQuestion(questionId);
    }
  }, [match.params.questionId]);

  const handleSubmit = async (values: Values) => {
    const result = await postAnswer({
      questionId: question!.questionId,
      content: values.content,
      userName: 'Fred',
      created: new Date(),
    });
    return { success: result ? true : false };
  };

  return (
    <Page>
      <div className="bg-white shadow-md p-10 my-4 md:w-2/3 mx-auto">
        <h2 className="text-3xl font-bold tracking-tight mb-1">
          {question === null ? '' : question.title}
        </h2>
        {/* A conditional rendering logic must return 
        only a single parent React element. */}
        {question !== null && (
          <Fragment>
            <p className="mb-4">{question.content}</p>
            <p className="text-gray-600 text-sm">{`Asked by ${
              question.userName
            } on ${question.created.toLocaleDateString()} ${question.created.toLocaleTimeString()}`}</p>
            <AnswerList data={question.answers} />
            <div className="border-t border-gray-300 pt-6 mt-8">
              <Form
                submitCaption="Submit your answer"
                onSubmit={handleSubmit}
                successMessage="There was a problem with your answer"
                failureMessage="Your answer was successfully submitted"
                validationRules={{
                  content: [
                    { validator: required },
                    { validator: minLength, arg: 50 },
                  ],
                }}
              >
                <Field name="content" label="Your answer" type="Textarea" />
              </Form>
            </div>
          </Fragment>
        )}
      </div>
    </Page>
  );
};
