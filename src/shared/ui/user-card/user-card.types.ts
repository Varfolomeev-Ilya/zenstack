export interface IUserCardProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  email?: string;
  size?: 'sm' | 'md';
}
