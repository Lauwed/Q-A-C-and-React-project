import { FC, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Page } from './Page';
import { QuestionList } from './QuestionList';
import { searchQuestions, QuestionData } from './QuestionsData';

// React gives us access to all the query parameters in a
// search string inside the location object.
export const SearchPage: FC<RouteComponentProps> = ({ location }) => {
  // Setting the state
  const [questions, setQuestions] = useState<QuestionData[]>([]);

  // The criteria query parameter from the browser
  // URLSearchParams is a native JS function
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('criteria') || '';

  // Invoke search when the component first renders and
  // when the search variable changes using
  // the useEffect hook.
  useEffect(() => {
    const doSearch = async (criteria: string) => {
      const foundResults = await searchQuestions(criteria);
      setQuestions(foundResults);
    };
    doSearch(search);
  }, [search]);

  return (
    <Page title="Search results">
      {search && <p className="text-3xl tracking-tighter">for "{search}"</p>}
      <QuestionList data={questions} />
    </Page>
  );
};
