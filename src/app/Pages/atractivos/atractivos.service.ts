import { Injectable, OnDestroy } from '@angular/core';
import { Atractivo, Img, Parrafo, Tipo_parrafo } from './atractivos.model';
import { DataService } from '../../services/data.service';

import { HttpClient } from '@angular/common/http';
import { Observable, timer, Subscription, Subject } from 'rxjs';
import { switchMap, tap, share, retry, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AtractivosService implements OnDestroy {

    constructor(
        private http: HttpClient,
        private dataService: DataService
    ) {

    }

    getAtractivo(id: number){
        return this.dataService.getAtractivo(id);
    }

    getParrafosAtr(id: number){
        return this.dataService.getParrafosAtr(id);
    }

    getImagesAtr(id: number){
        return this.dataService.getImagesAtr(id);
    }

    newAtractivo( atractivo: Atractivo, parrafos: Parrafo[], images: Img[] ) {

        atractivo.id = this.dataService.newAtractivoId();
        this.dataService.addAtractivo(atractivo);

        if(parrafos.length){

            parrafos.forEach( parrafo => {             
                parrafo.id_atractivo = atractivo.id
                parrafo.id = this.dataService.newParrafoId();
                this.dataService.addParrafo(parrafo);
            });
        }

        if(images.length){

            images.forEach( image => {             
                image.id_atractivo = atractivo.id
                image.id = this.dataService.newImageId();
                this.dataService.addImage(image);
            });
        }

    }

    updtAtractivo( atractivo: Atractivo, parrafos: Parrafo[], images: Img[] ) {

        this.dataService.updtAtractivo(atractivo);

        if (parrafos.length) {
            this.dataService.delParrafosAtr(atractivo.id);

            parrafos.forEach( parrafo => {
                parrafo.id_atractivo = atractivo.id
                parrafo.id = this.dataService.newParrafoId();

                this.dataService.addParrafo(parrafo);
            })
        }

        if (images.length) {
            this.dataService.delImagesAtr(atractivo.id);

            images.forEach( image => {
                image.id_atractivo = atractivo.id
                image.id = this.dataService.newImageId();

                this.dataService.addImage(image);
            })
        }

    }

    delAtractivo( id: number) {

        this.dataService.delAtractivo(id);
        this.dataService.delParrafosAtr(id);
        this.dataService.delImagesAtr(id);

    }  

    ngOnDestroy() {

    }
}
