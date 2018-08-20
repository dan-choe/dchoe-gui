import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit 
{
  title = 'HeadComponent';

  navbarOpen = false;

  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
  }

  // isNavbarCollapsed=true;
  constructor() { }

  ngOnInit()
  {
  }
}
