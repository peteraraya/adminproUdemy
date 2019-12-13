import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, asNativeElements } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {


  // Uso de decoradores para hacer referencia a ese elemento
// recibe un parametro obligatorio de una referencia html
  @ViewChild('txtProgress', { static: false }) txtProgress:ElementRef; //  tengo una referencia sin importar en que componente estoy

  // Pueden ser variables que tienen de afuera
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  // para cambiar valores en el componente padre
  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();


  // se  le asignan parametros para cambiar nombre de las funciones
  constructor() {

    // console.log('Leyenda', this.leyenda);
    //console.log('Progreso', this.progreso);
  }
  ngOnInit() {
    // console.log('Leyenda', this.leyenda);
   // console.log('Progreso', this.progreso);
  }


  // En caso de que el imput cambie
  onChanges(newValue: number) {

    // evitar la mala utilización del input
    // esta instruccion devuelve un arreglo con todos los elementos que coincidan con el name "progreso"
    // let elementHTML: any = document.getElementsByName('progreso')[0]; // trabajaremos con la posición 0


    console.log(this.txtProgress);
    if (newValue >= 100) {
      this.progreso = 100; // es 100
    } else
      if (newValue <= 0) {
        this.progreso = 0; // es 0
      } else {
        this.progreso = newValue; // es un numero entre 0 y 100
      }

    // elementHTML.value = Number ( this.progreso);

    this.txtProgress.nativeElement.value = this.progreso;
    
    this.cambioValor.emit(this.progreso);
  }



  cambiarValor(valor: number) {

    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }

    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }

    this.progreso += valor;
    // uso de output
    this.cambioValor.emit(this.progreso);

    // Setear el foco 
    this.txtProgress.nativeElement.focus();

  }
}
