import { NgModule } from '@angular/core';
// Importante para los ngif ngfor etc
import { CommonModule } from '@angular/common';
// RouterModule
import { RouterModule } from '@angular/router';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';

// Componentes de modulos nuevos
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';







@NgModule({ 

    imports:[
        RouterModule,
        CommonModule,
        PipesModule
    ],
    declarations:[
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        ModalUploadComponent
    ],
    exports:[
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        ModalUploadComponent
    ]
})

export class SharedModule { }