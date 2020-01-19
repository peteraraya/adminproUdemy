import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Hospital } from '../../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales : number = 0;

  constructor(
    public http: HttpClient,
    public _usuariosService :UsuarioService
  ) { }

  // Retorno de observable con todos los hospitales
  cargarHospitales(desde: number = 0){
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get( url )
                .pipe(map( (resp:any) => {
                  // Propiedad que me dirá cuantos hospitales
                  this.totalHospitales = resp.total;
                  // console.log(resp);
                  return resp.hospitales
                
                }));
  }

  obtenerHospital( id:string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get ( url )
              .pipe(
                map((resp:any)=>{ 
                  return resp.hospital
                }));            

  }

  borrarHospital( id:string ){
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuariosService.token;

    return this.http.delete( url )
    .pipe(map( (resp:any) =>{
      Swal.fire('Hospital Borrado', 'Eliminado correctamente', 'success');
    }));
  }


  crearHospital(nombre:string){
    let url = URL_SERVICIOS + '/hospital/';
    url += '?token=' + this._usuariosService.token;

    return this.http.post( url, { nombre })
      .pipe(map((resp:any)=>{
        Swal.fire('Hospital Creado con exito', nombre, 'success');
        return resp.hospital
      }));
  }

  buscarHospital(termino:string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    console.log(termino);
    return this.http.get(url)
      .pipe(
        map((resp: any) => resp.hospitales)
      );
  }

  actualizarHospital( hospital:Hospital){
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuariosService.token;

    return this.http.put( url,hospital)
               .pipe(
                 map((resp:any)=> {
                   Swal.fire('Hospital Actualizado', hospital.nombre , 'success');
                      return resp.hospital
                }));
  }
}
