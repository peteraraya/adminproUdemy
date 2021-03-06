import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { PAGES_ROUTES } from './pages.routes';


// ng2-charts
import { ChartsModule } from 'ng2-charts';


// Pipes Module
import { PipesModule } from '../pipes/pipes.module';

// import { PagesComponent } from './pages.component'; no se carga de aqui, se llevaal appModule [lazyload]
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { SharedModule } from '../shared/shared.module';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
// import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';




@NgModule({
    declarations: [
        // PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        // ModalUploadComponent,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent,
        BusquedaComponent
    ],
    exports: [
        // PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports:[
        CommonModule,
        SharedModule, // Llamo a modulos de carpeta shared donde estan cargados los componentes del menu
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule,
    ]
})

export class PagesModules { }