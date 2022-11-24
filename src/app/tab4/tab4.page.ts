import { Component, OnInit } from '@angular/core';
import packageJson from '../../../package.json'

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor() { }
  public version: string = packageJson.version;

  ngOnInit() {
  }

}
