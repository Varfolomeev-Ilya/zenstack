import { FC, useMemo, useState } from 'react';

import { PopoverTrigger } from '@radix-ui/react-popover';
import { Settings, UserPlus, History } from 'lucide-react';

import { Button } from '@/shared/ui/button/button';
import { Popover, PopoverContent } from '@/shared/ui/popover/popover';
import { Separator } from '@/shared/ui/separator/separator';

interface IOrganizationPopoverProps {
  children: React.ReactNode;
}

const OrganizationPopover: FC<IOrganizationPopoverProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const organizationPopoverActions = useMemo(
    () => [
      {
        name: 'Settings',
        action: () => null,
        icon: Settings,
      },
      {
        name: 'History',
        action: () => null,
        icon: History,
      },
    ],
    [],
  );

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
          Invite
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default OrganizationPopover;
