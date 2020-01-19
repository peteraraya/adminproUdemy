import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  // Paginación
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    // Se carga la función
    this.cargarMedicos();
  }


  cargarMedicos() {
    // Empieza a cargar
    this.cargando = true;

    this._medicoService.cargarMedicos(this.desde)
      .subscribe((medicos: any) => {
        //paginación
        this.totalRegistros = medicos;
        this.medicos = medicos
        this.cargando = false;
      });
  }
  cambiarDesde(valor: number) {

    // que numero quiere moverse el medico
    let desde = this.desde + valor;
    //console.log(desde);

    if (desde >= this.totalRegistros) {
      //console.log(this.totalRegistros)
      return;
    }
    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarMedicos();
  }
  buscarMedicos(termino: string) {
    // Clausula en caso que no tenga datos

    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this._medicoService.buscarMedicos(termino)
      .subscribe(medicos => this.medicos = medicos);
  }


  borrarMedico(medico: Medico) {
    this._medicoService.borrarMedico(medico._id)
      .subscribe(() => this.cargarMedicos());
  }
}
