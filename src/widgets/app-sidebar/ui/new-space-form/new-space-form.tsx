import { FC, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { INewSpaceFormProps, TNewSpaceFormSchema } from './new-space-form.constants';

import { useOrganizationStore } from '@/features/workspace/model/organization.store';
import { useWorkspaceStore } from '@/features/workspace/model/workspace.store';
import { useErrToast } from '@/shared/hooks/useErrToast';
import { Button } from '@/shared/ui/button/button';
import FormInput from '@/shared/ui/form-input/form-input';

const NewSpaceForm: FC<INewSpaceFormProps> = ({ onClose }) => {
  const { t } = useTranslation('common');
  const { showErrToast } = useErrToast();
  const { organization } = useOrganizationStore();
  const { addSpaceToOrganization } = useWorkspaceStore();

  const { control, handleSubmit } = useForm<TNewSpaceFormSchema>({
    defaultValues: {
      title: '',
      description: '',
    },
    mode: 'onChange',
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<TNewSpaceFormSchema> = async data => {
    setIsLoading(true);

    if (!organization?.id) {
      return;
    }

    try {
      await addSpaceToOrganization({
        organizationId: organization?.id,
        name: data.title,
        description: data.description,
      });
    } catch (err) {
      showErrToast(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        control={control}
        label={t('inputs.titleInput.label')}
        placeholder={t('inputs.titleInput.placeholder')}
        type="text"
        name="title"
        disabled={isLoading}
      />
      <FormInput
        control={control}
        label={t('inputs.descriptionInput.label')}
        placeholder={t('inputs.descriptionInput.placeholder')}
        type="text"
        name="description"
        disabled={isLoading}
      />

      <div className="flex item-center justify-between gap-2 mt-4">
        <Button
          type="button"
          variant="destructive"
          className="w-1/3"
          disabled={isLoading}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button type="submit" className="w-1/3" disabled={isLoading}>
          Create
        </Button>
      </div>
    </form>
  );
};

export default NewSpaceForm;
