import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  public list
  public issPosition
  constructor(private http: HttpClient) {
    this.getAstronautList();
  }

  getAstronautList() {
    let data: Observable<any>;
    data = this.http.get(
      "http://api.open-notify.org/astros.json"
    );

    data.subscribe(result => {
      this.list = result.people;
    })
  }

  getISSPosition() {
    let position: Observable<any>;
    position = this.http.get(
      "http://api.open-notify.org/iss-now.json"
    );

    return position;
  }
}
