import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MessageListComponent } from './message-list/message-list.component';
import { ComposeMessageDialogComponent } from './compose-message-dialog/compose-message-dialog.component';
import { MessageService } from './message.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [MessageListComponent, ComposeMessageDialogComponent],
  exports: [MessageListComponent],
  providers: [MessageService]
})
export class MessageModule { }
