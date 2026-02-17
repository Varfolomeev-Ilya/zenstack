import { FC } from 'react';

import { IUserAvatarProps } from './user-avatar.types';

import { getUserNameFirstSymbols } from '@/shared/lib/api/getUserNameFirstSymbols';

const UserAvatar: FC<IUserAvatarProps> = ({ firstName, lastName, avatarUrl }) => {
  const userFirstSymbols = getUserNameFirstSymbols(firstName, lastName);

  return (
    <div className="flex items-center justify-center size-[36px] rounded-full">
      {avatarUrl ? <img src={avatarUrl} alt="User avatar" /> : <span>{userFirstSymbols}</span>}
    </div>
  );
};

export default UserAvatar;
