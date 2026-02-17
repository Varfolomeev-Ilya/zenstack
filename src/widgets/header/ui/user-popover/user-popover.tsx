import { useCallback, useEffect, useMemo, useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover';
import { LogOut, Moon, Settings, Sun, UserPen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/features/auth/model/auth.store';
import { supabaseUserClient } from '@/features/user/api/userApi';
import { ROUTES } from '@/shared/constants';
import { useErrToast } from '@/shared/hooks/useErrToast';
import { useTheme } from '@/shared/hooks/useTheme';
import { cn } from '@/shared/lib/helpers/cn';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { Skeleton } from '@/shared/ui/skeleton';
import UserCard from '@/shared/ui/UserCard';

const UserPopover = () => {
  const { logout, setUser, user, userId } = useAuthStore();

  const navigate = useNavigate();
  const { showErrToast } = useErrToast();
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation('common');

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isDarkTheme = theme === 'dark';

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate(ROUTES.LOGIN);
    } catch (err) {
      showErrToast(err);
    }
  }, [showErrToast, navigate, logout]);

  const popoverActions = useMemo(
    () => [
      {
        name: t('links.profile'),
        action: () => null,
        icon: <UserPen />,
      },
      {
        name: t('links.theme'),
        action: toggleTheme,
        icon: isDarkTheme ? <Sun /> : <Moon />,
      },
      {
        name: t('links.settings'),
        action: () => null,
        icon: <Settings />,
      },
      {
        name: t('links.logout'),
        action: handleLogout,
        icon: <LogOut />,
      },
    ],
    [isDarkTheme, toggleTheme, handleLogout, t],
  );

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

  if (isLoading) {
    // TODO: style skeleton
    return <Skeleton />;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <UserCard
          firstName={user?.first_name}
          lastName={user?.last_name}
          avatarUrl={user?.avatar_url}
          email={user?.email}
        />
      </PopoverTrigger>

      <PopoverContent align="start" side="right" className="w-[240px] p-2 rounded-2xl">
        <UserCard
          firstName={user?.first_name}
          lastName={user?.last_name}
          avatarUrl={user?.avatar_url}
          email={user?.email}
          size="sm"
        />

        <Separator className="my-1" />

        {popoverActions.map((item, idx) => (
          <>
            <Button
              key={idx}
              variant="ghost"
              className={cn(
                'w-full justify-start py-1 px-1.5',
                item.name === t('links.logout') && 'text-red-600',
              )}
              onClick={() => {
                item.action();
                setOpen(false);
              }}
            >
              {item.icon}
              {item.name}
            </Button>

            {idx === popoverActions.length - 2 && <Separator className="my-1" />}
          </>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default UserPopover;
