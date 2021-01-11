import React from 'react';
import user from './user.svg';
import search from './search.svg';

export const UserIcon = () => <img src={user} alt="User icon." />;

export const SearchIcon = () => (
  <img className="absolute right-3 top-1/4" src={search} alt="Search icon." />
);
