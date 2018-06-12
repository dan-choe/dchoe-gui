import { Component, Injectable, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {
  sidebar = 'test-sidebar';
  isOpen:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  toggle(){
    this.isOpen = !this.isOpen;
  }
}
