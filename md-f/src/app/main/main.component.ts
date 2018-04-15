import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  currentUser: string;
  constructor() {
    this.currentUser = localStorage.getItem('currentUser');
   }

  ngOnInit() {
  }

}
