import { ReactNode } from 'react';

interface NavbarContainerProps {
  children: ReactNode;
}

const NavbarContainer = ({ children }: NavbarContainerProps) => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 border-b-2">
      <div className="w-[90%] mx-auto">{children}</div>
    </div>
  );
};

export default NavbarContainer;
