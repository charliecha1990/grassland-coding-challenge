export type MessageType = 'text' | 'image';

export enum MessageTypes { 
  TEXT = 'text',
  IMAGE = 'image'
}

export abstract class Message {
  constructor(
    public readonly from: string,
    public readonly profilePictureUrl: string,
    public readonly content: any
  ) {}

  public abstract get messageType(): MessageType;
}
