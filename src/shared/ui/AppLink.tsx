import { FC } from 'react';

import { Link } from 'react-router-dom';

import { cn } from '@/shared/lib/helpers/cn';

interface IAppLinkProps {
  title: string;
  path: string;
  className?: string;
}

const AppLink: FC<IAppLinkProps> = ({ title, path, className }) => {
  return (
    <Link to={path} className={cn('text-primary hover:underline font-medium', className)}>
      {title}
    </Link>
  );
};

export default AppLink;
