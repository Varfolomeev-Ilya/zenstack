import AppSidebarContent from './ui/app-sidebar-content';
import AppSidebarFooter from './ui/app-sidebar-footer';
import AppSidebarHeader from './ui/app-sidebar-header';

import { Sidebar } from '@/shared/ui/sidebar/sidebar';

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <AppSidebarHeader />

      <AppSidebarContent />

      <AppSidebarFooter />
    </Sidebar>
  );
}
