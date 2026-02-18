import { Blocks } from 'lucide-react';

import OrganizationPopover from './organization-popover/organization-popover';

import { useSidebar } from '@/shared/hooks/useSidebar';
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar/sidebar';

const AppSidebarFooter = () => {
  const { state } = useSidebar();
  const isSidebarCollapsed = state === 'collapsed';

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <OrganizationPopover>
            <SidebarMenuButton tooltip="Organization" className="flex items-center gap-2">
              <Blocks />
              {!isSidebarCollapsed && 'Organization'}
            </SidebarMenuButton>
          </OrganizationPopover>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default AppSidebarFooter;
