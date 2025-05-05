import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../services/messaging.service';
import { ITextMessageData, TextMessage } from '../../models/text-message';
import { IImageMessageData, ImageMessage } from '../../models/image-message';
import { MessageTypes } from '../../models/message';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {
  messages: Array<ITextMessageData | IImageMessageData> = [];

  constructor(private messagingService: MessagingService) {}

  ngOnInit(): void {
    this.messagingService.messages$.subscribe((msg) => {
      this.messages.push(msg);
    });
  }

  isTextMessage(message: any): boolean {
    return message.messageType ===  MessageTypes.TEXT;
   // return message instanceof TextMessage;
  }

  isImageMessage(message: any): boolean{
    return message.messageType ===  MessageTypes.IMAGE;
   // return msg instanceof ImageMessage;
  }
}