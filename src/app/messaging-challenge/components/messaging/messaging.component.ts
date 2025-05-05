import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../services/messaging.service';
import { ITextMessageData } from '../../models/text-message';
import { IImageMessageData } from '../../models/image-message';

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
      this.messages = msgs;
    });
  }
}