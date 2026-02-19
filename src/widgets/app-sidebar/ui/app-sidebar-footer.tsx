import { Blocks } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import OrganizationPopover from './organization-popover/organization-popover';

import { useOrganizationStore } from '@/features/workspace/model/organization.store';
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
  const { organization } = useOrganizationStore();
  const isSidebarCollapsed = state === 'collapsed';

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <OrganizationPopover>
            <SidebarMenuButton
              tooltip={t('buttons.organization')}
              className="flex items-center gap-2 h-auto"
            >
              <Blocks className="self-end mb-1" />
              <div className="flex flex-col justify-center w-full">
                {!isSidebarCollapsed && t('buttons.organization')}

                <p>{organization?.name}</p>
              </div>
            </SidebarMenuButton>
          </OrganizationPopover>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default AppSidebarFooter;
