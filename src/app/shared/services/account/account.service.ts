import { Injectable } from '@angular/core';
import { Auth, User, updateEmail, updatePassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public isUserLogin = false;
  public isUserLogin$ = new Subject<boolean>;

  constructor(
    private fireStore: Firestore,
    private auth: Auth
  ) { }
  
  // login(credential: ILogin): Observable<any> {
  //   return this.http.get<any>(`${this.api.auth}?email=${credential.email}&password=${credential.password}`)
  // }

  updateUserData(userId: string, newData: any): Promise<void> {
    const userDocRef = doc(this.fireStore, 'users', userId);
    return setDoc(userDocRef, newData, { merge: true });
  }

  // updateUserAuth(userId: string, newData: any): Promise<void> {
  //   const userDocRef = doc(this.auth, 'users', userId);
  //   return setDoc(userDocRef, newData, { merge: true })
  // }

  // async updateUserAuth(userId: string, newData: any): Promise<void> {
  //   try {
  //     const currentUser = await this.auth.currentUser;

  //     if (newData.email) {
  //       await updateEmail(currentUser as User, newData.email);
  //     }

  //     if (newData.password) {
  //       await updatePassword(currentUser as User, newData.password);
  //     }

  //     // Якщо ви також хочете оновити інші дані користувача, ви можете використовувати свій власний метод
  //     // Наприклад: await this.updateUserData(userId, newData);

  //     this.isUserLogin$.next(true);
  //   } catch (error) {
  //     console.error('Помилка при оновленні даних користувача:', error);
  //   }
  // }

}
