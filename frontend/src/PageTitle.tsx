import { FC } from 'react';

interface Props {}

export const PageTitle: FC<Props> = ({ children }) => (
  <h2 className="text-sm uppercase text-gray-700 font-bold leading-none">
    {children}
  </h2>
);
