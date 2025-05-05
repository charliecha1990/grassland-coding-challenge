import { Component, Input } from '@angular/core';
import { TextMessage } from '../../models/text-message';
import { BaseMessageComponent } from '../base-message/base-message.component';

@Component({
  selector: 'app-text-message',
  templateUrl: './text-message.component.html',
  styleUrls: ['./text-message.component.scss']
})
export class TextMessageComponent extends BaseMessageComponent {
  override message!: TextMessage;

  get isFromAnna(): boolean {
    return this.message?.from === 'Anna';
  }
}