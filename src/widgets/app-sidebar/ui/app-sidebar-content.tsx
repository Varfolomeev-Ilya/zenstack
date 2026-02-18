import { Home, Bell, Trophy, ChevronDown, Plus, BadgePlus } from 'lucide-react';

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

const sidebarContentLinks = [
  {
    name: 'Home',
    url: '#',
    icon: Home,
  },
  {
    name: 'Notifications',
    url: '#',
    icon: Bell,
  },
  {
    name: 'Goals',
    url: '#',
    icon: Trophy,
  },
];

const AppSidebarContent = () => {
  return (
    <SidebarContent>
      <Separator className="my-2" />

      <SidebarGroupContent className="px-2">
        {sidebarContentLinks.map(project => (
          <SidebarMenuItem key={project.name} className="list-none">
            <SidebarMenuButton asChild tooltip={project.name}>
              <a href={project.url}>
                <project.icon />
                <span>{project.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarGroupContent>

      <SidebarGroup>
        <SidebarMenu>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip="Spaces">
                  <BadgePlus />
                  <span>Spaces</span>
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
                        <span>New space</span>
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
