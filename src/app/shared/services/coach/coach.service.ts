import { Injectable } from '@angular/core';
import { CollectionReference, collectionData, Firestore, doc, docData, deleteDoc, updateDoc, addDoc } from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';
import { ICoachRequest } from '../../interfaces/coach/coach.interface';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  public coachCollection!: CollectionReference<DocumentData>

  constructor(
    private afs: Firestore
  ) { 
    this.coachCollection = collection(this.afs, 'coaches');
  }

  getAllCoaches() {
    return collectionData(this.coachCollection, { idField: 'id' });
  }

  getOneCoach(id: string) {
    const coachDocumentReference = doc(this.afs, `coaches/${id}`);
    return docData(coachDocumentReference, { idField: 'id' });
  }

  createCoach(coach: ICoachRequest) {
    return addDoc(this.coachCollection, coach);
  }
  
  updateCoach(coach: ICoachRequest, id: string) {
    const coachDocumentReference = doc(this.afs, `coaches/${id}`);
    return updateDoc(coachDocumentReference, { ...coach });
  }
  
  deleteCoach(id: string) {
    const coachDocumentReference = doc(this.afs, `coaches/${id}`);
    return deleteDoc(coachDocumentReference);
  }

}
