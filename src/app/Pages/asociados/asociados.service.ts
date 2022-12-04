import { Injectable, OnDestroy } from '@angular/core';
import { Servicio, Img, Asociado } from './asociados.model';
import { DataService } from '../../services/data.service';

import { HttpClient } from '@angular/common/http';
import { Observable, timer, Subscription, Subject } from 'rxjs';
import { switchMap, tap, share, retry, takeUntil } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AsociadosService implements OnDestroy {

    private servicios: Servicio[] = [];
    private servicios$: Observable<Servicio[]>;

    private imgs: Img[] = [];
    private imgs$: Observable<Img[]>;

    private asociados: Asociado[] = [];
    private asociados$: Observable<Asociado[]> = new Observable();

    private stop = new Subject();

    constructor(
        private http: HttpClient,
        private dataService: DataService
    ) {

        this.asociados$ = timer(1, 3000).pipe(
            switchMap(() => this.dataService.getAsociados()),
            retry(),
            tap(console.log),
            share(),
            takeUntil(this.stop)
        );

        this.servicios$ = this.dataService.getServicios$();
        this.servicios$.subscribe(servicios => this.servicios = servicios);

        this.imgs$ = this.dataService.getImages$();
        this.imgs$.subscribe(imgs => this.imgs = imgs);

    }

    getAsociados$(): Observable<Asociado[]> {
        return this.asociados$
    }

    newAsociado( asociado: Asociado, servicios: Servicio[] ) {

        if ( this.asociados.length == null || this.asociados.length == undefined ) {

            asociado.id = 0;
        } else {

            asociado.id = this.asociados[this.asociados.length - 1].id + 1;
        }
        this.dataService.addAsociado(asociado);

        if (servicios.length == null || servicios.length == undefined) {

        } else {

            servicios.forEach((servicio, index) => {
                servicio.id_asociado = asociado.id

                if ( this.servicios.length == null || this.servicios.length == undefined ) {
                    servicio.id = 0
                } else {
                    servicio.id = this.servicios[this.servicios.length - 1].id + 1;
                }
                this.dataService.addServicio(servicio);
            })
        }

    }

    updtAsociado( asociado: Asociado, servicios: Servicio[]) {

        this.dataService.updtAsociado(asociado);

        if (!(servicios.length == null || servicios.length == undefined)){

            if (!(this.servicios.length == null || this.servicios.length == undefined)){

                this.dataService.delServAsoc(asociado.id);
            }

            servicios.forEach((servicio, index) => {
                servicio.id_asociado = asociado.id

                if (!(this.servicios.length == null || this.servicios.length == undefined)) {
                    servicio.id = 0;
                } else {
                    servicio.id = this.servicios[this.servicios.length - 1].id + 1;
                }
                this.dataService.addServicio(servicio);
            })
        }
    }

    delAsociado( id: number ) {

        this.delAsociado(id);

        if (!(this.servicios.length == null || this.servicios.length == undefined)) {

            this.dataService.delServAsoc(id);
        }
        if (!(this.imgs.length == null || this.imgs.length == undefined)) {

            this.dataService.delImagesAsoc(id);
        }
    }

    ngOnDestroy() {
        this.stop.next(true);
    }

}
