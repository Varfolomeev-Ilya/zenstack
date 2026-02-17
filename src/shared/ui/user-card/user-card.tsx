import { forwardRef } from 'react';

import { cn } from '../../lib/helpers/cn';

import { IUserCardProps } from '.';

import UserAvatar from '@/widgets/Header/ui/user-avatar/user-avatar';

// TODO: Add real values and separate types
export const UserCard = forwardRef<HTMLDivElement, IUserCardProps>(
  ({ firstName, lastName, avatarUrl, email, className, size, ...props }, ref) => {
    const showUserName = 'Anonymous user';

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
        <div className="flex flex-col justify-center">
          <p>{showUserName}</p>
          <p>{email}</p>
        </div>
      </div>
    );
  },
);

UserCard.displayName = 'UserCard';

export default UserCard;
