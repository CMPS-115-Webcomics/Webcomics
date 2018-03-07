import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
// import { OperationService } from '../operation.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'wcm-confirm-operation-dialog',
  templateUrl: './confirm-operation-dialog.component.html',
  styleUrls: ['./confirm-operation-dialog.component.scss']
})
export class ComposeOperationDialogComponent implements OnInit {
  public challenge: string;
  public input: string;

  public challengeControl = new FormControl('', [Validators.required]);

  constructor(
    private ref: MatDialogRef<ComposeOperationDialogComponent>
  ) { }

  public done() {
    this.ref.close(true);
  }

  public cancel() {
    this.ref.close(false);
  }

  ngOnInit() {
  }

}
