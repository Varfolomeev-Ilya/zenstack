import { FC } from 'react';

import { getUserNameFirstSymbols } from '@/shared/lib/api/getUserNameFirstSymbols';

interface IUserAvatarProps {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}
const UserAvatar: FC<IUserAvatarProps> = ({ firstName, lastName, avatarUrl }) => {
  const userFirstSymbols = getUserNameFirstSymbols(firstName, lastName);

  return (
    <div className="flex items-center justify-center size-9 rounded-full">
      {avatarUrl ? <img src={avatarUrl} alt="User avatar" /> : <span>{userFirstSymbols}</span>}
    </div>
  );
};

export default UserAvatar;
