import { FC } from 'react';

import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';

interface IAppLinkProps {
  title: string;
  path: string;
  className?: string;
}

const AppLink: FC<IAppLinkProps> = ({ title, path, className }) => {
  return (
    <Link to={path} className={cn('hover:underline', className)}>
      {title}
    </Link>
  );
};

export default AppLink;
