import { useState } from 'react';

import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import NewSpaceForm from '../new-space-form/new-space-form';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog/dialog';
import { SidebarMenuButton } from '@/shared/ui/sidebar/sidebar';

const NewSpaceDialog = () => {
  const { t } = useTranslation('sidebar');
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton className="w-full">
          <span>{t('buttons.newSpace')}</span>
          <Plus className="h-4 w-4" />
        </SidebarMenuButton>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">Fill in the fields to create a new space</DialogTitle>
          <NewSpaceForm onClose={() => setOpen(false)} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NewSpaceDialog;
