import { ChangeEvent, FC, useState, FormEvent } from 'react';
// With Link, there is no server requests,
// which is great for performance.
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { UserIcon, SearchIcon } from './Icons';

export const Header: FC<RouteComponentProps> = ({ history, location }) => {
  // The default value of the search box is the criteria
  // route query parameter
  const searchParams = new URLSearchParams(location.search);
  const criteria = searchParams.get('criteria') || '';

  // State to store the search value. defaulting to the criteria value
  const [search, setSearch] = useState(criteria);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push(`/search?criteria=${search}`);
  };

  return (
    <div className="flex justify-between py-4 bg-white shadow-md mb-8">
      <Link className="text-3xl font-bold px-4 mx-4 tracking-tighter" to="./">
        Q & A
      </Link>
      <form onSubmit={handleSearchSubmit} className="relative">
        <label className="sr-only">Search...</label>
        <input
          className="focus:ring-blue-500 focus:border-blue-500 rounded-md sm:text-sm border-gray-300"
          type="search"
          placeholder="Search..."
          value={search}
          onChange={handleSearchInputChange}
        />
        <button className="">
          <span className="sr-only">Search</span>
          <SearchIcon />
        </button>
      </form>
      <Link className="px-4 mx-4 flex items-center" to="./signin">
        <UserIcon />
        <span className="ml-2">Sign in</span>
      </Link>
    </div>
  );
};

// Use of withRouter function to get the props passed into
// the controlled component, here the search bar
export const HeaderWithRouter = withRouter(Header);
