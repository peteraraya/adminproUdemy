import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser'; // modificar titulo

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  // Variables

  titulo: string;

  constructor(private router: Router,
    private title: Title,
    private meta: Meta
  ) {


    this.getDataRoute()
      .subscribe(data => {
        // console.log(data);
        this.titulo = data.titulo; // envio información del titulo
        this.title.setTitle(this.titulo); // asignar titulo


        const metaTag: MetaDefinition = {
          name: 'description',
          content: this.titulo
        };

        // Actualizo en el html
        this.meta.updateTag(metaTag);


      });

    // obtener referencia a los ActivationEnd
  }

  ngOnInit() {
  }


  // Función para capturar la data
  getDataRoute() {
    // Router tiene event , que es un obserbable
    return this.router.events.pipe(
      // definir operadores para extraer infor que necesitamos
      filter(evento => evento instanceof ActivationEnd), // trae dos ActivationEnd
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null), // solo filtro por uno
      map((evento: ActivationEnd) => evento.snapshot.data) // extraigo la data
    );
  }


}
