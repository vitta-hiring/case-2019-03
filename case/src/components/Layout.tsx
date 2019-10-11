import React from 'react';
import { Helmet } from 'react-helmet';

export const Layout: React.FC = ({ children }) => {
  const meta = [
    {
      name: 'keywords',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem magnam modi repellendus.',
    },
    {
      name: 'robots',
    },
  ];
  return (
    <div>
      <Helmet title="Prontuário médico" meta={meta}>
        <html lang="pt-br" />
      </Helmet>
      <main>{children}</main>
    </div>
  );
};
