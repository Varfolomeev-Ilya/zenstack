import { PanelLeft, PanelLeftClose } from 'lucide-react';

import { useSidebar } from '@/shared/hooks/useSidebar';
import { cn } from '@/shared/lib/helpers/cn';
import { Button } from '@/shared/ui/button/button';

const SidebarToggle = () => {
  const { toggleSidebar, state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle Sidebar"
      title="Toggle Sidebar"
      className={cn('absolute top-[50%] z-50', isCollapsed ? 'left-22' : 'left-30')}
      onClick={toggleSidebar}
    >
      {isCollapsed ? <PanelLeft /> : <PanelLeftClose />}
    </Button>
  );
};

export default SidebarToggle;
