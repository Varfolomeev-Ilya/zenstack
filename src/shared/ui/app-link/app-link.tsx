import { FC } from 'react';

import { Link } from 'react-router-dom';

import { IAppLinkProps } from './app-link.types';

import { cn } from '@/shared/lib/helpers/cn';

const AppLink: FC<IAppLinkProps> = ({ title, path, className }) => {
  return (
    <Link to={path} className={cn('text-primary hover:underline font-medium', className)}>
      {title}
    </Link>
  );
};

export default AppLink;
