export const getUserNameFirstSymbols = (firstName?: string, lastName?: string) => {
  if (!firstName && !lastName) {
    return 'AU';
  }
  return `${firstName?.slice(0, 1) || ''}${lastName?.slice(0, 1) || ''}`;
};
