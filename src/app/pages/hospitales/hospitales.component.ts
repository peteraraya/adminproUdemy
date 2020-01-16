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



  constructor(
              public _hospitalService : HospitalService,
              public _modalUploadService : ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion
    .subscribe( () => this.cargarHospitales() );
  }


  buscarHospitales( termino:string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospital(termino)
      .subscribe(hospitales => {
        this.hospitales = hospitales
      });
  }
  cargarHospitales(){
    this._hospitalService.cargarHospitales()
          .subscribe( hospitales => {
            this.hospitales = hospitales
          });
  }

  guardarHospital(hospital:Hospital){
    this._hospitalService.actualizarHospital( hospital )
    .subscribe();
  }

  borrarHospital(hospital:Hospital){

    this._hospitalService.borrarHospital( hospital._id)
        .subscribe( ()=> this.cargarHospitales() ); // elimina y muestra los hospitales denuevo
  }

  crearHospital(){
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
          .subscribe( () => this.cargarHospitales())

    })
   

}

actualizarImagen( hospital:Hospital ){
  this._modalUploadService.mostrarModal('hospitales', hospital._id)
  ;
}


}