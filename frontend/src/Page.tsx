import { FC } from 'react';
import { PageTitle } from './PageTitle';

interface Props {
  title?: string;
}

export const Page: FC<Props> = ({ title, children }) => (
  <div className="container mx-auto">
    {title && <PageTitle>{title}</PageTitle>}
    {children}
  </div>
);
