import { Container } from 'inversify';
import type { ModuleInfo } from './IModule';

export class ModuleCatalog {
  private modules: Map<string, ModuleInfo> = new Map();
  private container: Container;

  constructor(container: Container) {
    this.container = container;
  }

  /**
   * Register a module in the catalog
   */
  registerModule(moduleInfo: ModuleInfo): void {
    if (this.modules.has(moduleInfo.name)) {
      throw new Error(`Module ${moduleInfo.name} is already registered`);
    }
    this.modules.set(moduleInfo.name, moduleInfo);
  }

  /**
   * Initialize all modules in dependency order
   */
  initialize(): void {
    const sortedModules = this.topologicalSort();

    // First pass: Register all types
    sortedModules.forEach(moduleInfo => {
      console.log(`Registering types for module: ${moduleInfo.name}`);
      moduleInfo.module.registerTypes(this.container);
    });

    // Second pass: Initialize all modules
    sortedModules.forEach(moduleInfo => {
      console.log(`Initializing module: ${moduleInfo.name}`);
      moduleInfo.module.onInitialized(this.container);
    });
  }

  /**
   * Sort modules by dependencies using topological sort
   */
  private topologicalSort(): ModuleInfo[] {
    const sorted: ModuleInfo[] = [];
    const visited = new Set<string>();
    const visiting = new Set<string>();

    const visit = (moduleName: string) => {
      if (visited.has(moduleName)) return;
      if (visiting.has(moduleName)) {
        throw new Error(`Circular dependency detected: ${moduleName}`);
      }

      visiting.add(moduleName);

      const moduleInfo = this.modules.get(moduleName);
      if (!moduleInfo) {
        throw new Error(`Module ${moduleName} not found`);
      }

      // Visit dependencies first
      if (moduleInfo.dependencies) {
        moduleInfo.dependencies.forEach(dep => visit(dep));
      }

      visiting.delete(moduleName);
      visited.add(moduleName);
      sorted.push(moduleInfo);
    };

    // Visit all modules
    this.modules.forEach((_, moduleName) => visit(moduleName));

    return sorted;
  }
}
