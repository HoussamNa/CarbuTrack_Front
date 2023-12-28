import { Component, EventEmitter, Output } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class DeleteConfirmationComponent {
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

  confirm() {
      this.confirmationService.confirm({
          header: 'Are you sure?',
          message: 'Please confirm to proceed.',
          accept: () => {
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
          },
          reject: () => {
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
          }
      });
  }
}
