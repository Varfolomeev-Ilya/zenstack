import { FC, useEffect, useMemo, useState } from 'react';

import { PopoverTrigger } from '@radix-ui/react-popover';
import { Settings, UserPlus, History } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { IOrganizationPopoverProps } from './organization-popover.types';

import { useOrganizationStore } from '@/features/workspace/model/organization.store';
import { useErrToast } from '@/shared/hooks/useErrToast';
import { Button } from '@/shared/ui/button/button';
import { Popover, PopoverContent } from '@/shared/ui/popover/popover';
import { Separator } from '@/shared/ui/separator/separator';
import { Skeleton } from '@/shared/ui/skeleton/skeleton';

const OrganizationPopover: FC<IOrganizationPopoverProps> = ({ children }) => {
  const { t } = useTranslation('sidebar');
  const { getOrganization, organization } = useOrganizationStore();
  const { showErrToast } = useErrToast();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const organizationPopoverActions = useMemo(
    () => [
      {
        name: t('buttons.settings'),
        action: () => null,
        icon: Settings,
      },
      {
        name: t('buttons.history'),
        action: () => null,
        icon: History,
      },
    ],
    [t],
  );

  useEffect(() => {
    const handleGerOrganizationData = async () => {
      setIsLoading(true);

      try {
        await getOrganization('1');
      } catch (err) {
        showErrToast(err);
      } finally {
        setIsLoading(false);
      }
    };

    handleGerOrganizationData();
  }, []);

  console.log('organization', organization);

  if (isLoading) {
    return <Skeleton className="w-full h-8" />;
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="end" side="right" className="w-[160px] p-2 rounded-2xl flex flex-col">
        {organizationPopoverActions.map((item, index) => (
          <Button key={index} variant="ghost" className="justify-start" onClick={item.action}>
            <item.icon className="mr-2 h-4 w-4" />
            {item.name}
          </Button>
        ))}
        <Separator className="my-1" />
        <Button variant="ghost" className="justify-start" onClick={() => setOpen(false)}>
          <UserPlus className="mr-2 h-4 w-4" />
          {t('buttons.invite')}
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default OrganizationPopover;
