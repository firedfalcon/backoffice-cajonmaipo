import { Injectable, OnDestroy } from '@angular/core';
import { Atractivo, Img, Parrafo, Tipo_parrafo } from './atractivos.model';

import { HttpClient } from '@angular/common/http';
import { Observable, timer, Subscription, Subject } from 'rxjs';
import { switchMap, tap, share, retry, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AtractivosService implements OnDestroy {

    private atractivos: Atractivo[] = [];
    //private atractivos$ = new Subject<Atractivo[]>();
    //private o_atractivos$: Observable<Atractivo[]>;

    private parrafos: Parrafo[] = [];
    //private parrafos$ = new Subject<Parrafo[]>();
    //private o_parrafos$: Observable<Parrafo[]>;

    private tparrafos: Tipo_parrafo[] = [];
    //private tparrafos$ = new Subject<Tipo_parrafo[]>();
    //private o_tparrafos$: Observable<Tipo_parrafo[]>;

    private imgs: Img[] = [];
    //private imgs$ = new Subject<Img[]>();
    //private o_imgs$: Observable<Img[]>;

    private stop = new Subject();

    constructor(
        private http: HttpClient
    ) {
        this.atractivos = [];
        this.parrafos   = [];
        this.tparrafos  = [];
        this.imgs = [];
    }

    newAtractivo( atractivo: Atractivo, parrafos: Parrafo[] ) {

        if (isNullOrUndefined(this.atractivos.length)) {

            atractivo.id = 0;
        } else {

            atractivo.id = this.atractivos[this.atractivos.length - 1].id + 1;
        }
        this.atractivos.push(atractivo);

        if (isNullOrUndefined(parrafos.length)) {

        } else {

            parrafos.forEach((parrafo, index) => {
                parrafo.id_atractivo = atractivo.id

                if (isNullOrUndefined(this.parrafos.length)) {
                    parrafo.id = 0
                } else {
                    parrafo.id = this.parrafos[this.parrafos.length - 1].id + 1;
                }
                this.parrafos.push(parrafo);
            })
        }

    }

    updtAtractivo( atractivo: Atractivo, parrafos: Parrafo[] ) {

        this.atractivos.forEach((old_atractivo, index) => {

            if (old_atractivo.id == atractivo.id) {

                this.atractivos[index] = atractivo
            }
        });

        if (isNullOrUndefined(parrafos.length)) {

        } else {

            if (isNullOrUndefined(this.parrafos.length)) {

            } else {

                this.parrafos.forEach((old_parrafo, index) => {

                    if (old_parrafo.id_atractivo == atractivo.id) {

                        this.parrafos.splice(index, 1);
                    }
                });
            }

            parrafos.forEach((parrafo, index) => {
                parrafo.id_atractivo = atractivo.id

                if (isNullOrUndefined(this.parrafos.length)) {

                    parrafo.id = 0
                } else {

                    parrafo.id = this.parrafos[this.parrafos.length - 1].id + 1;
                }
                this.parrafos.push(parrafo);
            })
        }

    }

    delAtractivo( id: number) {

        this.atractivos.forEach((atractivo, index) => {

            if (atractivo.id == id) {

                this.atractivos.splice(index, 1)
            }
        });

        if (isNullOrUndefined(this.parrafos.length)) {

        } else {
            this.parrafos.forEach((parrafo, index) => {

                if (parrafo.id_atractivo == id) {

                    this.parrafos.splice(index, 1);
                }
            });
        }

    }

    ngOnDestroy() {
        this.stop.next(true);
    }
}
