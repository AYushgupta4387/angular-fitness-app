import { Component, OnInit, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  Firestore,
  collection,
  onSnapshot,
  docSnapshots,
  collectionData,
  getDocs,
} from '@angular/fire/firestore';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[] = [];
  collection: any;
  firestore: Firestore = inject(Firestore);
  // exerciseCollection = collection(this.firestore, 'exercisesAvailable');
  firestoreExercises: any;
  allDocs: any;

  constructor(private trainingService: TrainingService) {
    // this.collection = collection(this.firestore, 'availableExercises');
    // this.firestoreExercises = collectionData(this.collection);

    // getDocs(this.collection).then((res: any) => {
    //   res.forEach((ex: any) => {
    //     this.allDocs.push({ ...ex.data(), id: ex.id });
    //   });
    // });

    async function getExerciseData() {
      const exercisesCollection = collection(
        this.firestore,
        'availableExercises'
      );
      const exercisesSnapshot = await getDocs(exercisesCollection);
      const excercisesList = exercisesSnapshot.docs.map((doc) => doc.data());

      return excercisesList;
    }
  }

  ngOnInit() {}

  // subscribeToExercises() {
  //   const unsubscribe = onSnapshot(this.exerciseCollection, (snapshot) => {
  //     this.exercises = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...(doc.data() as Exercise),
  //     }));
  //   });

  //   // Optionally store the unsubscribe function if you want to unsubscribe later
  //   // this.unsubscribe = unsubscribe;
  // }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
