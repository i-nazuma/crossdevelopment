import {Component, OnInit, OnDestroy} from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import * as Leaflet from 'leaflet';
import { ApiService } from "../../services/api.service";

import {Coordinates} from "@awesome-cordova-plugins/geolocation";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {

  map: Leaflet.Map;
  userCoordinates: Coordinates
  issCoordinates: Coordinates

  constructor(private geolocation: Geolocation, private apiService: ApiService) {}

  ngOnInit() {
    this.loadUserLocation()
    this.apiService.getISSPosition().subscribe(result => {
      this.issCoordinates = result.iss_position;
      this.leafletMap();
    })
  }

  //ionViewDidEnter() { this.leafletMap(); }

  leafletMap() {
    this.map = Leaflet.map('mapId').setView([this.userCoordinates.latitude, this.userCoordinates.longitude], 5);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.map);

    if(typeof this.userCoordinates != 'undefined') {
      Leaflet.marker([this.userCoordinates.latitude, this.userCoordinates.longitude]).addTo(this.map).bindPopup('Your Location').openPopup()
    } else {
      console.log("ERROR: Users Location is undefined!")
    }

    if(typeof this.issCoordinates != 'undefined') {
      Leaflet.marker([this.issCoordinates.latitude, this.issCoordinates.longitude]).addTo(this.map).bindPopup('ISS').openPopup()
    }else {
      console.log("ERROR: failed to load ISS Coordinates!")
    }

    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }

  ngOnDestroy() {
    this.map.remove();
  }

  private loadUserLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      resp.coords.latitude
      resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      if ("coords" in data) {
        data.coords.latitude
        data.coords.longitude
        this.userCoordinates = data.coords
        //console.log("User Long: " + data.coords.longitude + "    User Lat: " + data.coords.latitude)
      }else
        console.log('Error getting location', data)
    });
  }
}
