import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, addDoc, arrayRemove, arrayUnion, collectionData, deleteDoc, doc, docData, getDoc, query, updateDoc, where } from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';
import { IPlan } from '../../interfaces/plan/plan.interface';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  public planCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore,
  ) { 
    this.planCollection = collection(this.afs, 'users');
  }

  getUser(id: string) {
    const userDocumentReference = doc(this.afs, `users/${id}`);
    return docData(userDocumentReference, { idField: 'id' });
  }

  createUserEvent(userId: string, userEvent: IPlan) {
    const userDocRef = doc(this.afs, 'users', userId);
    return updateDoc(userDocRef, {
      planEvents: arrayUnion(userEvent)
    });
  }  

  async updateUserEvent(userId: string, eventId: string, updateEvent: IPlan) {
    const userDocRef = doc(this.afs, 'users', userId);
  
    const userDoc = await getDoc(userDocRef);
    const userData = userDoc.data() as any;
  
    const index = userData.planEvents.findIndex((event: any) => event.id === eventId);
  
    if (index !== -1) {
      userData.planEvents[index] = updateEvent;
  
      return updateDoc(userDocRef, { planEvents: userData.planEvents });
    } else {
      console.error(`Exercise with ID ${eventId} not found in userExercises`);
      return Promise.reject(`Exercise with ID ${eventId} not found in userExercises`);
    }
  }

  deleteUserEvent(userId: string, userEvent: IPlan) {
    const userDocRef = doc(this.afs, 'users', userId);
    return updateDoc(userDocRef, {
      planEvents: arrayRemove(userEvent)
    });
  }

}
