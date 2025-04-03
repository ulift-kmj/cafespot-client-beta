import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8">{children}</div>;
};

export default Container;
