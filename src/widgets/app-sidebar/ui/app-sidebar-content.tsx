import { useMemo } from 'react';

import { Home, Bell, Trophy, ChevronDown, Plus, BadgePlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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

const AppSidebarContent = () => {
  const { t } = useTranslation('sidebar');

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
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between"
                        onClick={() => null}
                      >
                        <span>{t('buttons.newSpace')}</span>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default AppSidebarContent;
