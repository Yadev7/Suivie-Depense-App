import { Component, OnInit } from '@angular/core';
import packageJson from 'package.json';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public appJson: any = packageJson;
  constructor() {}

  ngOnInit(){

  }
}
