import {Message, MessageType, MessageTypes} from './message';

export class ImageMessage extends Message {

  constructor(
    public readonly from: string,
    public readonly profilePictureUrl: string,
    public readonly content: string // For simplicity, this is just a string url to the image in the assets folder
  ) {
    super(from, profilePictureUrl, content);
  }

  public override get messageType(): MessageType {
    return MessageTypes.IMAGE;
  }
}

export interface IImageMessageData { 
  from: string;
  profilePictureUrl: string;
  content: string;
}