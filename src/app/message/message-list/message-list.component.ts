import { Component, OnInit } from '@angular/core';
import { MessageService, Message } from '../message.service';

@Component({
  selector: 'wcm-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  public messages: Message[];

  constructor(private messageService: MessageService) {
    messageService.getMessages().then(msgs => this.messages = msgs);
  }

  ngOnInit() {
  }

}
