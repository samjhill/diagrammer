import { EventEmitter } from 'events';

export class EventBus extends EventEmitter {
  private static instance: EventBus;

  private constructor() {
    super();
  }

  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  // User events
  public emitUserCreated(user: User): void {
    this.emit('user:created', user);
  }

  public emitUserUpdated(user: User): void {
    this.emit('user:updated', user);
  }

  public emitUserDeleted(userId: number): void {
    this.emit('user:deleted', { userId });
  }

  // Authentication events
  public emitUserLoggedIn(user: User): void {
    this.emit('auth:login', user);
  }

  public emitUserLoggedOut(userId: number): void {
    this.emit('auth:logout', { userId });
  }

  // System events
  public emitSystemError(error: Error): void {
    this.emit('system:error', error);
  }

  public emitSystemWarning(message: string): void {
    this.emit('system:warning', { message });
  }

  // Event subscription helpers
  public onUserCreated(callback: (user: User) => void): void {
    this.on('user:created', callback);
  }

  public onUserUpdated(callback: (user: User) => void): void {
    this.on('user:updated', callback);
  }

  public onUserDeleted(callback: (data: { userId: number }) => void): void {
    this.on('user:deleted', callback);
  }

  public onUserLoggedIn(callback: (user: User) => void): void {
    this.on('auth:login', callback);
  }

  public onUserLoggedOut(callback: (data: { userId: number }) => void): void {
    this.on('auth:logout', callback);
  }

  public onSystemError(callback: (error: Error) => void): void {
    this.on('system:error', callback);
  }

  public onSystemWarning(callback: (data: { message: string }) => void): void {
    this.on('system:warning', callback);
  }
}

interface User {
  id: number;
  name: string;
  email: string;
}
