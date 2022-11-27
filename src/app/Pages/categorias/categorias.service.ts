import { Injectable, OnDestroy } from '@angular/core';
import { Categoria, Subcategoria, Parrafo, Servicio } from './categorias.model';

import { HttpClient } from '@angular/common/http';
import { Observable, timer, Subscription, Subject } from 'rxjs';
import { switchMap, tap, share, retry, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService implements OnDestroy {

    private categorias: Categoria[] = [];
    //private categorias$ = new Subject<Categoria[]>();
    //private o_categorias$: Observable<Categoria[]>;

    private subcategorias: Subcategoria[] = [];
    //private subcategorias$ = new Subject<Subcategoria[]>();
    //private o_subcategorias$: Observable<Subcategoria[]>;

    private parrafos: Parrafo[] = [];
    //private parrafos$ = new Subject<Parrafo[]>();
    //private o_parrafos$: Observable<Parrafo[]>;

    private servicios: Servicio[] = [];
    //private servicios$ = new Subject<Servicio[]>();
    //private o_servicios$: Observable<Servicio[]>;

    private stop = new Subject();

    constructor(
        private http: HttpClient
    ) {
        this.categorias = [];
        this.subcategorias = [];
        this.parrafos = [];
        this.servicios = [];
    }

    getCategorias() {
        return this.categorias;
    }

    getSubcategorias() {
        return this.subcategorias;
    }

    getParrafos() {
        return this.parrafos;
    }

    getServicios() {
        return this.servicios;
    }

    newCategoria( categoria: Categoria, parrafos: Parrafo[], servicios: Servicio[] ) {

        if (isNullOrUndefined(this.categorias.length)) {

            categoria.id = 0;
        } else {

            categoria.id = this.categorias[this.categorias.length - 1].id + 1;
        }
        this.categorias.push(categoria);

        if (isNullOrUndefined(parrafos.length)) {

        } else {

            parrafos.forEach((parrafo, index) => {
                parrafo.id_categoria = categoria.id

                if (isNullOrUndefined(this.servicios.length)) {
                    parrafo.id = 0
                } else {
                    parrafo.id = this.parrafos[this.parrafos.length - 1].id + 1;
                }
                this.parrafos.push(parrafo);
            })
        }

        if (isNullOrUndefined(servicios.length)) {

        } else {

            servicios.forEach((servicio, index) => {
                servicio.id_categoria = categoria.id

                if (isNullOrUndefined(this.servicios.length)) {
                    servicio.id = 0
                } else {
                    servicio.id = this.servicios[this.servicios.length - 1].id + 1;
                }
                this.servicios.push(servicio);
            })
        }

    }

    updtCategoria( categoria: Categoria, parrafos: Parrafo[], servicios: Servicio[] ) {

        this.categorias.forEach((old_categoria, index) => {

            if (old_categoria.id == categoria.id) {

                this.categorias[index] = categoria
            }
        });

        if (isNullOrUndefined(parrafos.length)) {

        } else {

            if (isNullOrUndefined(this.parrafos.length)) {

            } else {

                this.parrafos.forEach((old_parrafo, index) => {

                    if (old_parrafo.id_categoria == categoria.id) {

                        this.parrafos.splice(index, 1);
                    }
                });
            }

            parrafos.forEach((parrafo, index) => {
                parrafo.id_categoria = categoria.id

                if (isNullOrUndefined(this.parrafos.length)) {

                    parrafo.id = 0
                } else {

                    parrafo.id = this.parrafos[this.parrafos.length - 1].id + 1;
                }
                this.parrafos.push(parrafo);
            })
        }

        if (isNullOrUndefined(servicios.length)) {

        } else {

            if (isNullOrUndefined(this.servicios.length)) {

            } else {

                this.servicios.forEach((old_servicio, index) => {

                    if (old_servicio.id_categoria == categoria.id) {

                        this.servicios.splice(index, 1);
                    }
                });
            }

            servicios.forEach((servicio, index) => {
                servicio.id_categoria = categoria.id

                if (isNullOrUndefined(this.servicios.length)) {
                    servicio.id = 0;
                } else {
                    servicio.id = this.servicios[this.servicios.length - 1].id + 1;
                }
                this.servicios.push(servicio);
            })
        }

    }

    delCategoria( id: number) {

        this.categorias.forEach((categoria, index) => {

            if (categoria.id == id) {

                this.categorias.splice(index, 1)
            }
        });

        if (isNullOrUndefined(this.parrafos.length)) {

        } else {
            this.parrafos.forEach((parrafo, index) => {

                if (parrafo.id_categoria == id) {

                    this.parrafos.splice(index, 1);
                }
            });
        }

        if (isNullOrUndefined(this.servicios.length)) {

        } else {
            this.servicios.forEach((servicio, index) => {

                if (servicio.id_categoria == id) {

                    this.servicios.splice(index, 1);
                }
            });
        }
    }

    newSubcategoria( subcategoria: Subcategoria, parrafos: Parrafo[], servicios: Servicio[] ) {

        if (isNullOrUndefined(this.subcategorias.length)) {

            subcategoria.id = 0;
        } else {

            subcategoria.id = this.subcategorias[this.subcategorias.length - 1].id + 1;
        }
        this.subcategorias.push(subcategoria);

        if (isNullOrUndefined(parrafos.length)) {

        } else {

            parrafos.forEach((parrafo, index) => {
                parrafo.id_subcategoria = subcategoria.id

                if (isNullOrUndefined(this.servicios.length)) {
                    parrafo.id = 0
                } else {
                    parrafo.id = this.parrafos[this.parrafos.length - 1].id + 1;
                }
                this.parrafos.push(parrafo);
            })
        }

        if (isNullOrUndefined(servicios.length)) {

        } else {

            servicios.forEach((servicio, index) => {
                servicio.id_subcategoria = subcategoria.id

                if (isNullOrUndefined(this.servicios.length)) {
                    servicio.id = 0
                } else {
                    servicio.id = this.servicios[this.servicios.length - 1].id + 1;
                }
                this.servicios.push(servicio);
            })
        }

    }

    updtSubcategoria( subcategoria: Subcategoria, parrafos: Parrafo[], servicios: Servicio[] ) {

        this.subcategorias.forEach((old_subcategoria, index) => {

            if (old_subcategoria.id == subcategoria.id) {

                this.subcategorias[index] = subcategoria
            }
        });

        if (isNullOrUndefined(parrafos.length)) {

        } else {

            if (isNullOrUndefined(this.parrafos.length)) {

            } else {

                this.parrafos.forEach((old_parrafo, index) => {

                    if (old_parrafo.id_subcategoria == subcategoria.id) {

                        this.parrafos.splice(index, 1);
                    }
                });
            }

            parrafos.forEach((parrafo, index) => {
                parrafo.id_subcategoria = subcategoria.id

                if (isNullOrUndefined(this.parrafos.length)) {

                    parrafo.id = 0
                } else {

                    parrafo.id = this.parrafos[this.parrafos.length - 1].id + 1;
                }
                this.parrafos.push(parrafo);
            })
        }

        if (isNullOrUndefined(servicios.length)) {

        } else {

            if (isNullOrUndefined(this.servicios.length)) {

            } else {

                this.servicios.forEach((old_servicio, index) => {

                    if (old_servicio.id_subcategoria == subcategoria.id) {

                        this.servicios.splice(index, 1);
                    }
                });
            }

            servicios.forEach((servicio, index) => {
                servicio.id_subcategoria = subcategoria.id

                if (isNullOrUndefined(this.servicios.length)) {
                    servicio.id = 0;
                } else {
                    servicio.id = this.servicios[this.servicios.length - 1].id + 1;
                }
                this.servicios.push(servicio);
            })
        }

    }

    delSubcategoria( id: number ) {

        this.subcategorias.forEach((subcategoria, index) => {

            if (subcategoria.id == id) {

                this.subcategorias.splice(index, 1)
            }
        });

        if (isNullOrUndefined(this.parrafos.length)) {

        } else {
            this.parrafos.forEach((parrafo, index) => {

                if (parrafo.id_subcategoria == id) {

                    this.parrafos.splice(index, 1);
                }
            });
        }

        if (isNullOrUndefined(this.servicios.length)) {

        } else {
            this.servicios.forEach((servicio, index) => {

                if (servicio.id_subcategoria == id) {

                    this.servicios.splice(index, 1);
                }
            });
        }
    }

    ngOnDestroy() {
        this.stop.next(true)
    }
}
