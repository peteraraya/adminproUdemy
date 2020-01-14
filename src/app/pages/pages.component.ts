import { Component, OnInit } from '@angular/core';
//Llamando una función fuera de angular
declare function init_plugings();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }
  // Hago la llamada de la función al comienzo
  ngOnInit() {
    init_plugings();
  }



}
