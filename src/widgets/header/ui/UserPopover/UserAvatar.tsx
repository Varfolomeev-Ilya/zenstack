import { getUserNameFirstSymbols } from '@/shared/lib/api/getUserNameFirstSymbols';

const UserAvatar = () => {
  // TODO: add real user values
  const user = {
    avatar_url: '',
    first_name: 'Ilya',
    last_name: 'Varfolomeev',
  };

  const userFirstSymbols = getUserNameFirstSymbols(user.first_name, user.last_name);

  return (
    <div className="flex items-center justify-center size-9 rounded-full">
      {user.avatar_url ? (
        <img src={user?.avatar_url} alt="User avatar" />
      ) : (
        <span>{userFirstSymbols}</span>
      )}
    </div>
  );
};

export default UserAvatar;
