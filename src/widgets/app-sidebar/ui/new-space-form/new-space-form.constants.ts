import * as z from 'zod';

export const newSpaceFormSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export type TNewSpaceFormSchema = z.infer<typeof newSpaceFormSchema>;

export interface INewSpaceFormProps {
  onClose: () => void;
}
