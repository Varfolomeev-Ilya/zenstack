import { Blocks } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import OrganizationPopover from './organization-popover/organization-popover';

import { useSidebar } from '@/shared/hooks/useSidebar';
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/ui/sidebar/sidebar';

const AppSidebarFooter = () => {
  const { t } = useTranslation('sidebar');
  const { state } = useSidebar();
  const isSidebarCollapsed = state === 'collapsed';

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <OrganizationPopover>
            <SidebarMenuButton
              tooltip={t('buttons.organization')}
              className="flex items-center gap-2"
            >
              <Blocks />
              {!isSidebarCollapsed && t('buttons.organization')}
            </SidebarMenuButton>
          </OrganizationPopover>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default AppSidebarFooter;
