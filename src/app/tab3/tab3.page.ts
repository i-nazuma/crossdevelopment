import {Component, OnInit} from '@angular/core';
import {FirebaseService, User} from "../../services/firebase.service";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  user: User = null
  constructor(private database: FirebaseService) {}

  getProfile() {
    this.database.getUser('C71vOaRY2A6TqUR53PDT').subscribe(res => { //hardcoded ID at the moment for convenience
      this.user = res;
      console.log(this.user);
    })
  }

  updateProfile() {
    this.database.updateUser(this.user).then(r => alert("User Profile updated successfully"))
  }

  ngOnInit(): void {
    this.getProfile()
  }
}
