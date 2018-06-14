import { Component, OnInit } from '@angular/core';
import * as Rx from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  fruit = new Rx.BehaviorSubject('Nothing');

  constructor() { }

  ngOnInit() {
  }

  set eat(fruitName){
    this.fruit.next(fruitName);
  }

}
