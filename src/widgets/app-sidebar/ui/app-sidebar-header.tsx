import { Atom } from 'lucide-react';

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar/sidebar';

const AppSidebarHeader = () => {
  return (
    <SidebarHeader className="px-2 py-2.5">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            className="hover:bg-transparent active:bg-transparent"
            tooltip="Reload"
            onClick={() => window.location.reload()}
          >
            <Atom />
            <p className="text-2xl font-bold text-foreground">ZenStack</p>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export default AppSidebarHeader;
