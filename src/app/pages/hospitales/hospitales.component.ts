import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {


  hospitales: Hospital[] = [];
  // Paginación
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion
      .subscribe(() => this.cargarHospitales());
  }


  cargarHospitales() {
    // Empieza a cargar
    this.cargando = true;
    this._hospitalService.cargarHospitales(this.desde)
      .subscribe((hospitales: any) => {
        //paginación
        this.totalRegistros = hospitales;
        this.hospitales = hospitales;
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
    this.cargarHospitales();
  }
  buscarHospitales(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospital(termino)
      .subscribe(hospitales => {
        this.hospitales = hospitales
      });
  }
  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
      .subscribe();
  }

  borrarHospital(hospital: Hospital) {

    this._hospitalService.borrarHospital(hospital._id)
      .subscribe(() => this.cargarHospitales()); // elimina y muestra los hospitales denuevo
  }

  crearHospital() {
    Swal.fire({
      title: 'Crear Hospital',
      input: 'text',
      inputPlaceholder: 'Ingrese el nombre del hospital',
      showCancelButton: true,

    }).then((result) => {
      if (!result.value || result.value === 0) {
        return;
      }
      this._hospitalService.crearHospital(result.value)
        .subscribe(() => this.cargarHospitales())

    })


  }

  actualizarImagen(hospital: Hospital) {
    this._modalUploadService.mostrarModal('hospitales', hospital._id)
      ;
  }


}