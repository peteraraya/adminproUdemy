import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable'; // importación necesaria
import { map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';
import { Subscriber } from 'rxjs/internal/Subscriber';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {


  // Creamos una propiedad que hará referencia al observador que está ejecutandose
  subscription: Subscription;


  constructor() {

    // Referencia al observable asignandolo  a subscription
    this.subscription = this.regresaObservable()
      // Necesito subscribirse | Los subscribe tiene 3 callback
      .subscribe(
        // console.log('Subs:', numero);
        numero => console.log('Subs', numero),      // Recibo información del observador (next)
        error => console.log('Error en el obs', error), // Error
        () => console.log('El observador terminó') // Termino
      );
  }

  ngOnInit() {
  }

  // Se ejecuta cuando sales de este componente
  ngOnDestroy(){
    // console.log('La página se va a cerrar');
    this.subscription.unsubscribe();
  }

  // Crear una función que me devuelva un observable

  regresaObservable(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval(() => {
        // Función que emita un valor cada segundo
        contador++;

        const salida = {
          valor: contador
        };

        // este observable va  estar notificando cada vez que la información 
        // el next va emitir el contador osea notificar que llgo un 1 2 3 
        observer.next(salida);

        // quiero que el contador se detenga al numero 3
        // if (contador === 3) {
        //   // detener interval
        //   clearInterval(intervalo);
        //   observer.complete(); // Finaliza
        // }

        // Manejo de errores

      }, 1000);

    }).pipe(
      map(resp => resp.valor), // Operador map
      filter((valor, index) => {
        // console.log('filter', valor , index)

        // Trabajar con numeros impares
        if ((valor % 2) === 1) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      })
    );

  }
}


//  El operador retry: nos va permitir volver  hacer la solicitud las veces que quedramos intentarlo
//  Cuando queremos procesar la info antes de usarla lo pasamos por el operador map
// Operador filter : podemos decir cuando queremos que pase algo o no | este operador resive una función
  // este recibe dos argumentos que recibe el operador filter 1:valor 2:posición index de numero de veces que se ha llamado este operador

// Necesitamos cancelar la el observador si me cambio de página en ngOnDestroy() nos podemos unsubscribe