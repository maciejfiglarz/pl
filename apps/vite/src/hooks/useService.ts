import { useContext } from 'react';
import { ContainerContext } from '../context/ContainerContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useService<T>(serviceIdentifier: any): T {
  const container = useContext(ContainerContext);

  if (!container) {
    throw new Error('useService must be used within a ContainerProvider');
  }

  return container.get<T>(serviceIdentifier);
}
