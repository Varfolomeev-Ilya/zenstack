import { FC } from 'react';

import AuthIllustrationSrc from '@shared/assets/auth-illustration.png';

interface IAuthLayoutWrapperProps {
  children: React.ReactNode;
}

const AuthLayoutWrapper: FC<IAuthLayoutWrapperProps> = ({ children }) => {
  return (
    <div className="w-full h-full flex flex-col gap-10 items-center lg:flex-row bg-background">
      <div className="flex flex-col items-center justify-center w-full relative max-w-[40%]">
        <img src={AuthIllustrationSrc} alt="Auth illustration" />
      </div>
      <div className="flex flex-col items-center justify-center py-6 px-7 w-full text-foreground">
        <div className="flex flex-col w-full max-w-[540px] p-5 border border-border rounded-[14px] bg-card text-card-foreground shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayoutWrapper;
