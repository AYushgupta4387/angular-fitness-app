import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-stop-training',
  template: `<h1 mat-dialog-title>
    Are you sure?
    <h1>
      <mat-dialog-actions>
        <mat-dialog-content>
          <p>You already got {{ passedData.progress }}%</p>
        </mat-dialog-content>
        <button mat-button [mat-dialog-close]="true">Yes</button>
        <!-- Values assinged to mat-dialog-close can be recieved in the parent component afterClosed -->
        <button mat-button [mat-dialog-close]="false">No</button>
      </mat-dialog-actions>
    </h1>
  </h1>`,
})
export class stopTrainingComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: any
  ) {} /* We have to inject MAT_DIALOG_DATA to recieve the data into this component */
}
