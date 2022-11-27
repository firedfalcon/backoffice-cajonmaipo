import { Injectable, OnDestroy } from '@angular/core';
import { Servicio, Img, Asociado } from './asociados.model';

import { HttpClient } from '@angular/common/http';
import { Observable, timer, Subscription, Subject } from 'rxjs';
import { switchMap, tap, share, retry, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AsociadosService implements OnDestroy{

    private servicios: Servicio[] = [];
    //private servicios$ = new Subject<Servicio[]>();
    //private o_servicios$: Observable<Servicio[]>;

    private imgs: Img[] = [];
    //private imgs$ = new Subject<Img[]>();
    //private o_imgs$: Observable<Img[]>;

    private asociados: Asociado[] = [];
    //private asociados$ = new Subject<Asociado[]>();
    //private o_asociados$: Observable<Asociado[]>;

    private stop = new Subject();

    constructor(
        private http: HttpClient
    ) {

        this.servicios = [];
        this.imgs = [];
        this.asociados = [];
    }

    getAsociados() {
        return this.asociados;
    }

    getImages() {
        return this.imgs;
    }

    getServicios() {
        return this.servicios;
    }

    newAsociado( asociado: Asociado, servicios: Servicio[] ) {

        if (isNullOrUndefined(this.asociados.length)) {

            asociado.id = 0;
        } else {

            asociado.id = this.asociados[this.asociados.length - 1].id + 1;
        }
        this.asociados.push(asociado);

        if (isNullOrUndefined(servicios.length)) {

        } else {

            servicios.forEach((servicio, index) => {
                servicio.id_asociado = asociado.id

                if (isNullOrUndefined(this.servicios.length)) {
                    servicio.id = 0
                } else {
                    servicio.id = this.servicios[this.servicios.length - 1].id + 1;
                }
                this.servicios.push(servicio);
            })
        }

    }

    updtAsociado( asociado: Asociado, servicios: Servicio[]) {

        this.asociados.forEach((old_asociado, index) => {

            if (old_asociado.id == asociado.id) {

                this.asociados[index] = asociado
            }
        });

        if (isNullOrUndefined(servicios.length)) {

        } else {

            if (isNullOrUndefined(this.servicios.length)) {

            } else {

                this.servicios.forEach((old_servicio, index) => {

                    if (old_servicio.id_asociado == asociado.id) {

                        this.servicios.splice(index, 1);
                    }
                });
            }

            servicios.forEach((servicio, index) => {
                servicio.id_asociado = asociado.id

                if (isNullOrUndefined(this.servicios.length)) {
                    servicio.id = 0;
                } else {
                    servicio.id = this.servicios[this.servicios.length - 1].id + 1;
                }
                this.servicios.push(servicio);
            })
        }
    }

    delAsociado( id: number ) {

        this.asociados.forEach(( asociado, index ) => {

            if ( asociado.id == id) {

                this.asociados.splice( index, 1 )
            }
        });

        if (isNullOrUndefined(this.servicios.length)) {

        } else {
            this.servicios.forEach((servicio, index) => {

                if ( servicio.id_asociado == id ) {

                    this.servicios.splice(index, 1);
                }
            });
        }
    }

    ngOnDestroy() {
        this.stop.next(true);
    }

}
