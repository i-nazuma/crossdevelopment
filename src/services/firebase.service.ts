import { Injectable } from '@angular/core';
import { collection } from "@firebase/firestore";
import {Firestore, collectionData} from "@angular/fire/firestore";
import {Observable} from "rxjs";

export interface User {
  id?: String
  name: String
  postal_code: number
  street_name: String
  door_number: number
  city: String
  email_address: String
}

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor(private firestore: Firestore) { }

  getUserProfiles(): Observable<User[]> {
    const userRef = collection(this.firestore, 'users')
    return collectionData(userRef) as Observable<User[]>
  }
}
