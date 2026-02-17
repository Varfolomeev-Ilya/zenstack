import UserPopover from '@/widgets/header/ui/user-popover/user-popover';

const Header = () => {
  return (
    <header
      aria-label="header"
      className="flex w-full items-center justify-between py-4 px-5 border-b border-border bg-background h-[61px]"
    >
      <div></div>
      <UserPopover />
    </header>
  );
};

export default Header;
