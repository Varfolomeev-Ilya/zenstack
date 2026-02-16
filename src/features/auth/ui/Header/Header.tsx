import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { useAuthStore } from '@/features/auth/model/auth.store';
import { supabaseUserClient } from '@/features/user/api/userApi';
import { ROUTES } from '@/shared/constants';
import { useErrToast } from '@/shared/hooks/useErrToast';
import { Spinner } from '@/shared/ui/spinner';
import UserPopover from '@/widgets/header/ui/UserPopover/UserPopover';

const Header = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { showErrToast } = useErrToast();
  const { userId, setUser } = useAuthStore();

  useEffect(() => {
    if (!userId) {
      return;
    }

    const handleGetUserProfile = async () => {
      setIsLoading(true);

      try {
        const response = await supabaseUserClient.getUserProfile(userId);
        setUser(response?.data);
      } catch (err) {
        showErrToast(err);
      } finally {
        setIsLoading(false);
      }
    };

    handleGetUserProfile();
  }, [userId]);

  return (
    <header
      aria-label="header"
      className="flex w-full items-center justify-between py-4 px-5 border-b border-border bg-background"
    >
      <Link to={ROUTES.HOME}>
        <p className="text-2xl font-bold text-foreground">ZenStack</p>
      </Link>

      {isLoading ? <Spinner className="size-9" /> : <UserPopover />}
    </header>
  );
};

export default Header;
