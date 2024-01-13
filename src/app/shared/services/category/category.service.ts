import { Injectable } from '@angular/core';
import { CollectionReference, collectionData, Firestore, doc, docData, deleteDoc, updateDoc, addDoc } from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';
import { ICategoryRequest } from '../../interfaces/category/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public categoryCollection!: CollectionReference<DocumentData>

  constructor(
    private afs: Firestore
  ) { 
    this.categoryCollection = collection(this.afs, 'categories');
  }

  getAllCategories() {
    return collectionData(this.categoryCollection, { idField: 'id' });
  }

  getOneCategory(id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return docData(categoryDocumentReference, { idField: 'id' });
  }

  createCategory(category: ICategoryRequest) {
    return addDoc(this.categoryCollection, category);
  }
  
  updateCategory(category: ICategoryRequest, id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return updateDoc(categoryDocumentReference, { ...category });
  }
  
  deleteCategory(id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return deleteDoc(categoryDocumentReference);
  }

}
