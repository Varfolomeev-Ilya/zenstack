import { forwardRef } from 'react';

import { cn } from '../../lib/helpers/cn';

import { IUserCardProps } from './user-card.types';

import UserAvatar from '@/widgets/header/ui/user-avatar/user-avatar';

export const UserCard = forwardRef<HTMLDivElement, IUserCardProps>(
  ({ firstName, lastName, avatarUrl, email, className, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3 w-full',
          size == 'sm' && 'text-sm',
          size == 'md' && 'text-md',
          className,
        )}
        {...props}
      >
        <UserAvatar firstName={firstName} lastName={lastName} avatarUrl={avatarUrl} />
        <div className="flex flex-col justify-center items-start">
          <p>
            {firstName} {lastName}
          </p>
          <p>{email}</p>
        </div>
      </div>
    );
  },
);

UserCard.displayName = 'UserCard';

export default UserCard;
