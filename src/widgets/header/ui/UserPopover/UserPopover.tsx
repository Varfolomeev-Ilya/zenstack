import { useCallback, useMemo, useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover';
import { LogOut, Moon, Settings, Sun, UserPen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import UserAvatar from './UserAvatar';

import { useAuthStore } from '@/features/auth/model/auth.store';
import { ROUTES } from '@/shared/constants';
import { useErrToast } from '@/shared/hooks/useErrToast';
import { useTheme } from '@/shared/hooks/useTheme';
import { Button } from '@/shared/ui/button';

const UserPopover = () => {
  const { logout, user } = useAuthStore();

  const navigate = useNavigate();
  const { showErrToast } = useErrToast();
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation('common');

  const [open, setOpen] = useState(false);

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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <UserAvatar
            firstName={user?.first_name}
            lastName={user?.last_name}
            avatarUrl={user?.avatar_url}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-40">
        {popoverActions.map((item, idx) => (
          <Button
            key={idx}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              item.action();
              setOpen(false);
            }}
          >
            {item.icon}
            {item.name}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default UserPopover;
