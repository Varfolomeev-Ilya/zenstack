import { Control, FieldValues, Path } from 'react-hook-form';

export interface IFormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  LeftIcon?: React.ElementType;
  rightEl?: React.ReactNode;
}
