import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { stopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) {}

  ngOnInit() {
    this.startOrResumeTraining();
  }

  startOrResumeTraining() {
    const step =
      (this.trainingService.getRunningExercise().duration / 100) * 1000; // Progress will increase by 1 in every STEP MILLI SECONDS.

    this.timer = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(stopTrainingComponent, {
      data: {
        progress: this.progress /* We will pass this data to the dialog */,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTraining();
      }
    });
  }
}
