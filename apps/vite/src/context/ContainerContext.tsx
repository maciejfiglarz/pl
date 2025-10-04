import { createContext } from 'react';
import { Container } from 'inversify';

export const ContainerContext = createContext<Container | null>(null);

export const ContainerProvider: React.FC<{ container: Container; children: React.ReactNode }> = ({
  container,
  children,
}) => {
  return <ContainerContext.Provider value={container}>{children}</ContainerContext.Provider>;
};
