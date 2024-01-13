import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collectionData, deleteDoc, doc, docData, query, updateDoc, where } from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';
import { IExerciseRequest } from '../../interfaces/exercise/exercise.interface';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  public exerciseCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
  ) { 
    this.exerciseCollection = collection(this.afs, 'exercises');
  }

  getAllExercises() {
    return collectionData(this.exerciseCollection, { idField: 'id' });
  }

  getAllExercisesByCategory(name: string) {
    const exerciseDocumentReference = query(collection(this.afs, 'exercises'), where('category.name', '==', name));
    return collectionData(exerciseDocumentReference, { idField: 'id' });
  }

  getOneExercise(id: string) {
    const exerciseDocumentReference = doc(this.afs, `exercises/${id}`);
    return docData(exerciseDocumentReference, { idField: 'id' });
  }

  createExercise(exercise: IExerciseRequest) {
    return addDoc(this.exerciseCollection, exercise);
  }

  updateExercise(exercise: IExerciseRequest, id: string) {
    const exerciseDocumentReference = doc(this.afs, `exercises/${id}`);
    return updateDoc(exerciseDocumentReference, { ...exercise });
  }

  deleteExercise(id: string) {
    const exerciseDocumentReference = doc(this.afs, `exercises/${id}`);
    return deleteDoc(exerciseDocumentReference);
  }

}
