import { Injectable } from '@angular/core';
import { ICoachResponse } from '../../interfaces/coach/coach.interface';
import { CollectionReference, Firestore, arrayRemove, arrayUnion, collectionData, doc, docData, getDoc, updateDoc } from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';
import { Observable, from } from 'rxjs';
import { IUser } from '../../interfaces/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserCoachService {

  public userCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
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

  // setUserCoach(userId: string, userCoach: ICoachResponse) {
  //   const userDocRef = doc(this.afs, 'users', userId);
  //   return from(updateDoc(userDocRef, {
  //     coaches: arrayUnion(userCoach)
  //   }));
  // }

  setUserCoach(userId: string, userCoach: ICoachResponse) {
    const userDocRef = doc(this.afs, 'users', userId);
    return updateDoc(userDocRef, {
      coaches: arrayUnion(userCoach)
    });
  }

  async updateUserCoach(userId: string, coachId: string, updatedCoach: ICoachResponse) {
    const userDocRef = doc(this.afs, 'users', userId);
  
    const userDoc = await getDoc(userDocRef);
    const userData = userDoc.data() as any;
  
    const index = userData.userExercises.findIndex((coach: any) => coach.id === coachId);
  
    if (index !== -1) {
      userData.coaches[index] = updatedCoach;
  
      return updateDoc(userDocRef, { coaches: userData.coaches });
    } else {
      console.error(`Exercise with ID ${coachId} not found in userExercises`);
      return Promise.reject(`Exercise with ID ${coachId} not found in userExercises`);
    }
  }

  deleteUserCoach(userId: string, userCoach: ICoachResponse) {
    const userDocRef = doc(this.afs, 'users', userId);
    return updateDoc(userDocRef, {
      coaches: arrayRemove(userCoach)
    });
  }

}
