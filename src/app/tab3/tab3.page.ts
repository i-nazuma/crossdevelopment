import { Component } from '@angular/core';
import {FirebaseService, User} from "../../services/firebase.service";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private database: FirebaseService) {
    this.getProfiles()
  }

  getProfiles() {
    this.database.getUserProfiles().subscribe(res => {
      console.log(res);
    })
  }
}
