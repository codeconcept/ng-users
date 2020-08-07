import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserCustom } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  collectionName = 'users';
  
  constructor(private afs: AngularFirestore) { }

  createUser(user: (UserCustom)) {
    const newUser: UserCustom = {
      uid: user.uid,
      email: user.email!,
      emailVerified: user.emailVerified,
      createdAt: new Date(),
      socialSecurityNumber: '1-11-11-11-111-111-11'
    };

    const usersCollection = this.afs.collection<UserCustom>(this.collectionName);
    return usersCollection.add(newUser);
  }

  getUsers() {
    return this.afs.collection(this.collectionName).valueChanges({ idField: 'id' }) as Observable<unknown[]>;
  }

  getUser(id: string) {
    return this.afs.doc(`${this.collectionName}/${id}`).valueChanges() as Observable<UserCustom>;
  }
}
