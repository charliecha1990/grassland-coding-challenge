import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../services/messaging.service';
import { ITextMessageData, TextMessage } from '../../models/text-message';
import { IImageMessageData, ImageMessage } from '../../models/image-message';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {
  messages: Array<ITextMessageData | IImageMessageData> = [];

  constructor(private messagingService: MessagingService) {}

  ngOnInit(): void {
    this.messagingService.messages$.subscribe((msgs) => {
      this.messages = [...msgs];
    });
  }

  isTextMessage(message: any): message is TextMessage {
    return message instanceof TextMessage;
  }

  isImageMessage(msg: any): msg is ImageMessage {
    return msg instanceof ImageMessage;
  }
}