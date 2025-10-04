import { injectable } from 'inversify';
import type { IEventAggregator, EventHandler } from './IEventAggregator';

@injectable()
export class EventAggregator implements IEventAggregator {
  private events: Map<string, Set<EventHandler>> = new Map();

  subscribe<T = any>(eventName: string, handler: EventHandler<T>): () => void {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Set());
    }

    this.events.get(eventName)!.add(handler);

    // Return unsubscribe function
    return () => {
      const handlers = this.events.get(eventName);
      if (handlers) {
        handlers.delete(handler);
      }
    };
  }

  publish<T = any>(eventName: string, payload?: T): void {
    const handlers = this.events.get(eventName);
    if (handlers) {
      handlers.forEach(handler => handler(payload));
    }
  }
}
