import {Message, MessageType, MessageTypes} from './message';

export class TextMessage extends Message {

  constructor(
    public readonly from: string,
    public readonly profilePictureUrl: string,
    public readonly content: string
  ) {
    super(from, profilePictureUrl, content);
  }

  public override get messageType(): MessageType {
    return MessageTypes.TEXT;
  }
}

export interface ITextMessageData { 
  from: string;
  profilePictureUrl: string;
  content: string;
}