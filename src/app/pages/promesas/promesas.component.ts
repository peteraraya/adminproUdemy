import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    // Función que este escuchando el resolve
    this.contarTres().then(
      mensaje => console.log('Termino!', mensaje),
    )
      .catch(error => console.log('Error en la promesa ', error));
  }


  ngOnInit() {
 }

  // Funciones que llaman las promesas

  contarTres(): Promise<boolean> {
    const promesa = new Promise<boolean>((resolve, reject) => {

      let contador = 0;
      // se va disparar
      const intervalo = setInterval(() => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          // reject(' simplemente un error');
          resolve(true);
          clearInterval(intervalo);
        }
      }, 1000); // se dispara cada 1 segundo
    });

    return promesa;
  }

}
