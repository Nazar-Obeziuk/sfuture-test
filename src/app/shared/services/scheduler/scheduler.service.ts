import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, addDoc, arrayRemove, arrayUnion, collectionData, deleteDoc, doc, docData, getDoc, query, updateDoc, where } from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';
import { IUser } from '../../interfaces/user/user.interface';
import { IDayData } from '../../interfaces/scheduler-date/scheduler-date.interface';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  public scheduleCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
  ) {
    this.scheduleCollection = collection(this.afs, 'users');
  }

  getOneUser(id: string) {
    const userDocumentReference = doc(this.afs, `users/${id}`);
    return docData(userDocumentReference, { idField: 'id' });
  }

  setUserScheduleDay(userId: string, userDay: IDayData) {
    const userDocRef = doc(this.afs, 'users', userId);
    return updateDoc(userDocRef, {
      sheduleWeeks: arrayUnion(userDay)
    });
  }

  updateUser(user: IUser, userId: string) {
    const userDocumentReference = doc(this.afs, `users/${userId}`);
    return updateDoc(userDocumentReference, { ...user });
  }

  async updateUserScheduleDay(userId: string, dayId: string, updatedDay: IDayData) {
    const userDocRef = doc(this.afs, 'users', userId);
  
    const userDoc = await getDoc(userDocRef);
    const userData = userDoc.data() as any;
  
    const index = userData.sheduleWeeks.findIndex((day: any) => day.id === dayId);
  
    if (index !== -1) {
      userData.sheduleWeeks[index] = updatedDay;
  
      return updateDoc(userDocRef, { sheduleWeeks: userData.sheduleWeeks });
    } else {
      console.error(`Exercise with ID ${dayId} not found in userExercises`);
      return Promise.reject(`Exercise with ID ${dayId} not found in userExercises`);
    }
  }
  
  isSameDay(date1: string, date2: string): boolean {
    return (
      date1 === date2
    );
  }

  deleteUserExercise(userId: string, userDay: IDayData) {
    const userDocRef = doc(this.afs, 'users', userId);
    return updateDoc(userDocRef, {
      sheduleWeeks: arrayRemove(userDay)
    });
  }

}
