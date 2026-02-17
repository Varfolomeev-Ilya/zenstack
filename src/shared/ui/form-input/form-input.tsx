import { useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';
import { Controller, FieldValues } from 'react-hook-form';

import { IFormInputProps } from './types.ts';

import { cn } from '@/shared/lib/helpers/cn';
import { Input } from '@/shared/ui/input/input';
import { Label } from '@/shared/ui/label/label';

const FormInput = <T extends FieldValues>({
  name,
  control,
  label,
  LeftIcon,
  rightEl,
  className,
  type,
  ...props
}: IFormInputProps<T> & React.ComponentPropsWithoutRef<typeof Input>) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const actualInputType = type === 'password' && isShowPassword ? 'text' : type;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref }, fieldState }) => (
        <div className="relative pb-4 w-full">
          <div
            className={cn(
              'relative w-full bg-background border border-border rounded-[10px] px-2 ',
              fieldState.error && 'border-destructive',
            )}
          >
            {label && (
              <Label
                htmlFor={name}
                className={cn(
                  'absolute left-2 transition-all duration-200 pointer-events-none bg-background rounded-full px-1 z-10',
                  value
                    ? '-top-2 text-xs opacity-100'
                    : 'top-1/2 -translate-y-1/2 text-sm opacity-0',
                  LeftIcon && value ? 'left-5 opacity-100' : LeftIcon && 'left-5 opacity-0',
                )}
              >
                {label}
              </Label>
            )}

            {LeftIcon && (
              <LeftIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground mt-[1px] z-10" />
            )}

            <Input
              ref={ref}
              id={name}
              value={value || ''}
              className={cn('h-9', LeftIcon && 'pl-6', rightEl && 'pr-9', className)}
              type={actualInputType}
              aria-invalid={Boolean(fieldState.error)}
              onChange={onChange}
              onBlur={onBlur}
              {...props}
            />

            {(rightEl || type === 'password') && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {rightEl && <div>{rightEl}</div>}
                {type === 'password' && (
                  <button
                    type="button"
                    className="focus:outline-none"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    {isShowPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                )}
              </div>
            )}
          </div>

          {fieldState.error && (
            <p className="absolute -bottom-0 text-xs text-destructive mt-1" id={`${name}-error`}>
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default FormInput;
