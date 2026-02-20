import { useEffect, useMemo, useState } from 'react';

import { Home, Bell, Trophy, ChevronDown, BadgePlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import NewSpaceDialog from './new-space-dialog/new-space-dialog';

import { useOrganizationStore } from '@/features/workspace/model/organization.store';
import { useWorkspaceStore } from '@/features/workspace/model/workspace.store';
import { useErrToast } from '@/shared/hooks/useErrToast';
import { Button } from '@/shared/ui/button/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/ui/collapsible/collapsible';
import { Separator } from '@/shared/ui/separator/separator';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/shared/ui/sidebar/sidebar';
import { Skeleton } from '@/shared/ui/skeleton/skeleton';

const AppSidebarContent = () => {
  const { t } = useTranslation('sidebar');
  const { getOrganizationSpaces, spaces } = useWorkspaceStore();
  const { organization } = useOrganizationStore();

  const { showErrToast } = useErrToast();

  const [isSpacesLoading, setIsSpacesLoading] = useState(true);

  const sidebarContentButtons = useMemo(
    () => [
      {
        name: t('buttons.home'),
        action: () => null,
        icon: Home,
      },
      {
        name: t('buttons.notifications'),
        action: () => null,
        icon: Bell,
      },
      {
        name: t('buttons.goals'),
        action: () => null,
        icon: Trophy,
      },
    ],
    [t],
  );

  useEffect(() => {
    if (!organization?.id) {
      return;
    }

    const handleGetOrganizationSpaces = async () => {
      setIsSpacesLoading(true);

      try {
        await getOrganizationSpaces(organization.id);
      } catch (err) {
        showErrToast(err);
      } finally {
        setIsSpacesLoading(false);
      }
    };

    handleGetOrganizationSpaces();
  }, [organization?.id]);

  console.log('spaces', spaces);

  return (
    <SidebarContent>
      <Separator className="my-2" />

      <SidebarGroupContent className="px-2">
        {sidebarContentButtons.map((item, index) => (
          <SidebarMenuItem key={item.name} className="list-none">
            <SidebarMenuButton asChild tooltip={item.name}>
              <Button key={index} variant="ghost" className="justify-start" onClick={item.action}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarGroupContent>

      <SidebarGroup>
        {isSpacesLoading ? (
          <Skeleton className="h-8 w-full rounded-md" />
        ) : (
          <SidebarMenu>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={t('buttons.spaces')}>
                    <BadgePlus />
                    <span>{t('buttons.spaces')}</span>
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    {spaces?.map(space => (
                      <SidebarMenuSubItem key={space.id}>
                        <SidebarMenuButton tooltip={space.name}>
                          <span>{space.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                    ))}
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <NewSpaceDialog />
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        )}
      </SidebarGroup>
    </SidebarContent>
  );
};

export default AppSidebarContent;
