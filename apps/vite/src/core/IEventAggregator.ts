export type EventHandler<T = any> = (payload: T) => void;

export interface IEventAggregator {
  /**
   * Subscribe to an event
   */
  subscribe<T = any>(eventName: string, handler: EventHandler<T>): () => void;

  /**
   * Publish an event
   */
  publish<T = any>(eventName: string, payload?: T): void;
}
