import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

//Servicios
import { HospitalService } from '../../services/service.index';
import { MedicoService } from '../../services/service.index';

//Modelos
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';



@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})

export class MedicoComponent implements OnInit {

  // LLenar hospitales
  hospitales: Hospital[] = [];

  medico: Medico = new Medico('','','','','');
  hospital: Hospital = new Hospital('');



  constructor(
    public _medicoService: MedicoService, 
    public _hospitalService: HospitalService,
    public router: Router,
    public activateRoute: ActivatedRoute,
    public _modalUploadService : ModalUploadService
    
  ) 
    { 
      activateRoute.params.subscribe( params => {
         
        //obtener id
        let id = params['id'];

        if (id !== 'nuevo') {
            this.cargarMedico(id);
        }
      }); 
    }

  ngOnInit() {
    // Cargar Hospitales
    this._hospitalService.cargarHospitales()
      .subscribe(hospitales => this.hospitales = hospitales);

    this._modalUploadService.notificacion
      .subscribe(resp => {
        // console.log(resp);
        // se imagen al momento de cambiarla
        this.medico.img = resp.medico.img;
      });
  }


  cargarMedico( id:string){
    this._medicoService.cargarMedico(id)
        .subscribe( medico => {
          // console.log(medico);
          // para setear el select
          // let nuevoMedico = new Medico()
          this.medico = medico
          this.medico.hospital = medico.hospital._id; // carga select
          this.cambioHospital( this.medico.hospital); // carga imagen
        })
  }


  guardarMedico(f: NgForm){
    // console.log(f.valid);
    // console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._medicoService.guardarMedico(this.medico)
      .subscribe(medico => {

        this.medico._id = medico._id;

        // console.log(medico);
        // navegar  hacia el nuevo url
        this.router.navigate(['/medico', medico._id]);
      });
  }

  cambioHospital(id: string) {
    // Obtenemos el hospital
    // console.log(id);
    // Seleccionaremos el target.value
    this._hospitalService.obtenerHospital(id)
      .subscribe((hospital: any) => {
        // console.log(hospital);
        this.hospital = hospital;
      });

  }
  cambiarFoto(){

    this._modalUploadService.mostrarModal('medicos',this.medico._id)
    
    // Nos subscribimos a la notificación del modal

  


  }
}
