import { HeaderWithRouter as Header } from './Header';
import { HomePage } from './HomePage';

// Routes definitions
// BrowserRouter is the top-level component that
// looks for Route components beneath it to determine
// all the different page paths.
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { AskPage } from './AskPage';
import { SearchPage } from './SearchPage';
import { SignInPage } from './SignInPage';
import { QuestionPage } from './QuestionPage';
import { NotFoundPage } from './NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App bg-blue-50 min-h-screen">
        <Header />
        {/* The Redirect component needs to be nested inside a Switch component */}
        <Switch>
          {/* All the routes pointing to the different pages */}
          {/* Allow redirection */}
          <Redirect from="/home" to="/" />
          {/* The attribute 'exact' is because the HomePage will be 
          rendered all time without it */}
          <Route exact path="/" component={HomePage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/ask" component={AskPage} />
          <Route path="/signin" component={SignInPage} />
          {/* :questionId is a route parameter */}
          <Route path="/question/:questionId" component={QuestionPage} />
          {/* Not found route */}
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
