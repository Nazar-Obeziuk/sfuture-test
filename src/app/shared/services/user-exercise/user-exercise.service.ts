import { Injectable } from '@angular/core';
import { IExerciseRequest, IExerciseResponse } from '../../interfaces/exercise/exercise.interface';
import { CollectionReference, addDoc, Firestore, collectionData, deleteDoc, doc, docData, query, updateDoc, where, arrayUnion, getDoc, arrayRemove } from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';
import { IUser } from '../../interfaces/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserExerciseService {

  public userCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore,
  ) {
    this.userCollection = collection(this.afs, 'users');
  }

  getAllUsers() {
    return collectionData(this.userCollection, { idField: 'id' });
  }

  getOneUser(id: string) {
    const userDocumentReference = doc(this.afs, `users/${id}`);
    return docData(userDocumentReference, { idField: 'id' });
  }

  setUserExercise(userId: string, userExercise: IExerciseResponse) {
    const userDocRef = doc(this.afs, 'users', userId);
    return updateDoc(userDocRef, {
      userExercises: arrayUnion(userExercise)
    });
  }

  updateUser(user: IUser, userId: string) {
    const userDocumentReference = doc(this.afs, `users/${userId}`);
    return updateDoc(userDocumentReference, { ...user });
  }

  async updateUserExercise(userId: string, exerciseId: string, updatedExercise: IExerciseResponse) {
    const userDocRef = doc(this.afs, 'users', userId);
  
    const userDoc = await getDoc(userDocRef);
    const userData = userDoc.data() as any;
  
    const index = userData.userExercises.findIndex((exercise: any) => exercise.id === exerciseId);
  
    if (index !== -1) {
      userData.userExercises[index] = updatedExercise;
  
      return updateDoc(userDocRef, { userExercises: userData.userExercises });
    } else {
      console.error(`Exercise with ID ${exerciseId} not found in userExercises`);
      return Promise.reject(`Exercise with ID ${exerciseId} not found in userExercises`);
    }
  }

  deleteUserExercise(userId: string, userExercise: IExerciseResponse) {
    const userDocRef = doc(this.afs, 'users', userId);
    return updateDoc(userDocRef, {
      userExercises: arrayRemove(userExercise)
    });
  }

}

