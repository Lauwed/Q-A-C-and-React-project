// An interface is a contract that defines
// a type with a collection of propety
// and method defintions without any implementation.
// Purely used in Typescript.
export interface QuestionData {
  // The ': number' is a type annotation
  questionId: number;
  title: string;
  content: string;
  userName: string;
  created: Date;
  // Array type
  answers: AnswerData[];
}

export interface AnswerData {
  answerId: number;
  content: string;
  userName: string;
  created: Date;
}

export interface PostQuestionData {
  title: string;
  content: string;
  userName: string;
  created: Date;
}

export interface PostAnswerData {
  questionId: number;
  content: string;
  userName: string;
  created: Date;
}

const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getUnansweredQuestions = async (): Promise<QuestionData[]> => {
  await wait(500);
  return questions.filter((q) => q.answers.length === 0);
};

export const getQuestion = async (
  questionId: number,
): Promise<QuestionData | null> => {
  await wait(500);
  const results = questions.filter((q) => q.questionId === questionId);
  return results.length === 0 ? null : results[0];
};

export const searchQuestions = async (
  criteria: string,
): Promise<QuestionData[]> => {
  await wait(500);
  return questions.filter(
    (q) =>
      q.title.toLowerCase().indexOf(criteria.toLocaleLowerCase()) >= 0 ||
      q.content.toLowerCase().indexOf(criteria.toLowerCase()) >= 0,
  );
};

// Simulate the creation of a question
export const postQuestion = async (
  question: PostQuestionData,
): Promise<QuestionData | undefined> => {
  await wait(500);
  const questionId = Math.max(...questions.map((q) => q.questionId)) + 1;
  const newQuestion: QuestionData = {
    ...question, // Get all the informations from the param type PostQuestionData (Only title, content, ..)
    questionId,
    answers: [],
  };
  questions.push(newQuestion);
  return newQuestion;
};

// Simulate the creation of an answer
export const postAnswer = async (
  answer: PostAnswerData,
): Promise<AnswerData | undefined> => {
  await wait(500);
  const question = questions.filter(
    (q) => q.questionId === answer.questionId,
  )[0];
  const answerInQuestion: AnswerData = {
    answerId: 99,
    ...answer,
  };
  question.answers.push(answerInQuestion);
  return answerInQuestion;
};

const questions: QuestionData[] = [
  {
    questionId: 1,
    title: 'Why should I learn TypeScript ?',
    content:
      'TypeScript seems to be getting popular so I wonder if it is worth my time learning it ? What benefits does it gives?',
    userName: 'Bob',
    created: new Date(),
    answers: [
      {
        answerId: 1,
        content: 'Ta catch problems earlier speeding up your developments',
        userName: 'Jane',
        created: new Date(),
      },
      {
        answerId: 2,
        content:
          'So, that you can use the Javascript features of tomorrow, today',
        userName: 'Fred',
        created: new Date(),
      },
    ],
  },
  {
    questionId: 2,
    title: 'Which state managment tool shoud I use ?',
    content:
      'There seem to be a fair few state management tools around for React - React, unstated, ... Which one should I use ?',
    userName: 'Bob',
    created: new Date(),
    answers: [],
  },
];
