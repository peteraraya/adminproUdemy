import { Component, OnInit } from '@angular/core';
//Llamando una función fuera de angular
declare function init_plugings();
@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugings();
  }



}
