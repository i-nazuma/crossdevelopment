import { Injectable } from '@angular/core';
import { Firestore, doc, docData, updateDoc } from "@angular/fire/firestore";
import { Observable } from "rxjs";

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

  tmp: User = {
    id: 'C71vOaRY2A6TqUR53PDT',
    name: "Ibo",
    postal_code: 1090,
    street_name: "Sesame Street",
    door_number: 1,
    city: "Vienna",
    email_address: "ibrahim@adouni.dev"
  }

  constructor(private firestore: Firestore) {
    //this.updateUser(this.tmp)
  }

  getUser(id): Observable<User> {
    const userRef = doc(this.firestore, `users/${id}`)
    return docData(userRef, { idField: 'id'}) as Observable<User>
  }

  updateUser(user: User) {
    const userRef = doc(this.firestore, `users/${user.id}`)
    return updateDoc(userRef, {
      city: user.city,
      name: user.name,
      postal_code: user.postal_code,
      street_name: user.street_name,
      door_number: user.door_number,
      email_address: user.email_address
    })
  }
}
