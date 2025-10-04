import { Container } from 'inversify';

export interface IModule {
  /**
   * Registers types with the dependency injection container
   */
  registerTypes(container: Container): void;

  /**
   * Called after all modules are loaded and types are registered
   */
  onInitialized(container: Container): void;
}

export interface ModuleInfo {
  name: string;
  module: IModule;
  dependencies?: string[];
}
