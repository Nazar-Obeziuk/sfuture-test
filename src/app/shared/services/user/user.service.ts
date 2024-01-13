import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, collectionData } from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
  ) {
    this.userCollection = collection(this.afs, 'users');
  }

  getAllUsers() {
    return collectionData(this.userCollection, { idField: 'id' });
  }

}
