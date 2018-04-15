import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-icons',
  templateUrl: './nav-icons.component.html',
  styleUrls: ['./nav-icons.component.scss']
})
export class NavIconsComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
