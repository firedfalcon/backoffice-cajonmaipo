import { Injectable, OnDestroy } from '@angular/core';
import { Servicio, Img, Asociado } from './asociados.model';
import { DataService } from '../../services/data.service';

import { HttpClient } from '@angular/common/http';
import { Observable, timer, Subscription, Subject, asyncScheduler, of } from 'rxjs';
import { switchMap, tap, share, retry, takeUntil, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AsociadosService implements OnDestroy {

    constructor(
        private http: HttpClient,
        private dataService: DataService
    ) {

    }

    getAsociado(id:number) {
        return this.dataService.getAsociado(id);
    }

    getServsAsc(id:number) {
        return this.dataService.getServsAsoc(id);
    }

    getImagesAsoc(id: number) {
        return this.dataService.getImagesAsoc(id);
    }

    newAsociado( asociado: Asociado, servicios: Servicio[], images: Img[] ) {

        asociado.id = this.dataService.newAsociadoId();       
        this.dataService.addAsociado(asociado);

        if (!servicios.length) {
            servicios.forEach( servicio => {
                servicio.id_asociado = asociado.id           
                servicio.id = this.dataService.newServicioId();

                this.dataService.addServicio(servicio);
            })
        }

        if (!images.length) {
            images.forEach( image => {
                image.id_asociado = asociado.id          
                image.id = this.dataService.newImageId();

                this.dataService.addImage(image);
            })
        }
    }

    updtAsociado( asociado: Asociado, servicios: Servicio[], images: Img[]) {

        this.dataService.updtAsociado(asociado);

        if (!servicios.length){

            this.dataService.delServsAsoc(asociado.id);

            servicios.forEach( servicio => {
                servicio.id_asociado = asociado.id
                servicio.id = this.dataService.newServicioId();
                
                this.dataService.addServicio(servicio);
            })
        }

        if (!images.length) {

            this.dataService.delImagesAsoc(asociado.id);

            images.forEach( image => {
                image.id_asociado = asociado.id
                image.id = this.dataService.newImageId();

                this.dataService.addImage(image);
            })
        }

    }

    delAsociado( id: number ) {

        this.dataService.delAsociado(id);
        this.dataService.delServsAsoc(id);       
        this.dataService.delImagesAsoc(id);
       
    }

    ngOnDestroy() {
    }

}
