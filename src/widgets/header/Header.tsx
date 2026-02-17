import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/constants';

const Header = () => {
  return (
    <header
      aria-label="header"
      className="flex w-full items-center justify-between py-4 px-5 border-b border-border bg-background"
    >
      <Link to={ROUTES.HOME}>
        <p className="text-2xl font-bold text-foreground">ZenStack</p>
      </Link>
    </header>
  );
};

export default Header;
