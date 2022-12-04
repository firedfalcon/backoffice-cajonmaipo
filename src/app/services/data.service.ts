import { Injectable, OnDestroy, OnInit} from '@angular/core';
import { Asociado, Categoria, Subcategoria, Servicio, Atractivo, Img, Parrafo, Tipo_parrafo } from './data.model';

import { HttpClient } from '@angular/common/http';
import { Observable, timer, Subscription, Subject } from 'rxjs';
import { switchMap, tap, share, retry, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
    providedIn: 'root'
})
export class DataService implements OnDestroy, OnInit{

    // local DB
    asociados: Asociado[] = [];
    asociados$: Subject<Asociado[]> = new Subject<Asociado[]>();

    atractivos: Atractivo[] = [];
    atractivos$: Subject<Atractivo[]> = new Subject<Atractivo[]>();

    categorias: Categoria[] = [];
    categorias$: Subject<Categoria[]> = new Subject<Categoria[]>();

    subcategorias: Subcategoria[] = [];
    subcategorias$: Subject<Subcategoria[]> = new Subject<Subcategoria[]>();

    servicios: Servicio[] = [];
    servicios$: Subject<Servicio[]> = new Subject<Servicio[]>();

    imgs: Img[] = [];
    imgs$: Subject<Img[]> = new Subject<Img[]>();

    parrafos: Parrafo[] = [];
    parrafos$: Subject<Parrafo[]> = new Subject<Parrafo[]>();

    tipos_parrafo: Tipo_parrafo[] = [];
    tipos_parrafo$: Subject<Tipo_parrafo[]> = new Subject<Tipo_parrafo[]>();

    constructor(

    ) {

        this.asociados = [
            {
                id: 0,
                nombre: "La Petite France",
                descripcion: "La Petite France es un exquisito restaurant de comida francesa y un hermoso Hotel, ubicados en Guayacán. Un lugar ideal para descansar, desconectarse y degustar de una excelente comida, a menos de una hora de Santiago. El recinto cuenta con piscina de temporada y spa todo el año.",
                facebook:'https://www.facebook.com/lapetitefrance.chile',
                instagram:'https://www.instagram.com/lapetitefrance_restaurant/',
                twitter:'',
                youtube:'',
                whatsapp:'https://wa.me/+56933981517',
                web:'https://lapetitefrance.cl/',
                email:'contacto@lapetitefrance.cl',
                telefono: 228611967
            },
            {
                id: 1,
                nombre:'Rancho El Añil',
                descripcion:'Somos un Centro Turístico rodeado de una naturaleza única. Contamos con dos amplios comedores, 14 cabañas y 13 habitaciones totalmente equipadas. Tres salones de reuniones, SPA, una piscina temperada y tres al aire libre. Actividades de senderismo, bicicletas, cabalgatas y tirolesa. Contamos con servicios Inclusivos.',
                facebook:'https://www.facebook.com/ranchoanil',
                instagram:'https://www.instagram.com/rancho_el_anil/',
                twitter:'',
                youtube:'https://www.youtube.com/channel/UCB28Rbrs9fwbLenYcvftrQA',
                whatsapp:'https://wa.me/+56931073812',
                web:'https://www.cajondelmaipolodge.cl/',
                email:'info@parquealmendro.com',
                telefono: 228612301
            },
            {
                id: 2,
                nombre:'Cerveza Palestra',
                descripcion:'Microempresa ubicada en la localidad de EL Manzano dedicada a la elaboración de bebidas alcohólicas fermentadas tales como cervezas e hidromieles.',
                facebook:'https://web.facebook.com/CervezaPalestra',
                instagram:'https://www.instagram.com/cervezapalestra/',
                twitter:'https://twitter.com/cervezapalestra',
                youtube:'',
                whatsapp:'https://wa.me/+56962182546',
                web:'https://cajondelmaipochile.cl/cervecerias-artesanales/',
                email:'cervezapalestra@gmail.com',
                telefono: 962182546
            }
        ];
        this.atractivos = [];
        this.categorias = [];
        this.subcategorias = [];
        this.servicios = [
            {
                id:0,
                id_asociado:0,
                id_categoria:undefined,
                id_subcategoria:undefined,
                nombre:'Hotel'
                },
            {
                id:1,
                id_asociado:0,
                id_categoria:undefined,
                id_subcategoria:undefined,
                nombre:'Spa'
                },
            {
                id:2,
                id_asociado:0,
                id_categoria:undefined,
                id_subcategoria:undefined,
                nombre:'Restaurante'
                },
            {
                id: 3,
                id_asociado: 0,
                id_categoria:undefined,
                id_subcategoria:undefined,
                nombre:'Centro de Eventos'
                },
            {
                id:4,
                id_asociado:1,
                id_categoria:undefined,
                id_subcategoria:undefined,
                nombre:'Cabañas'
                },
            {
                id:5,
                id_asociado:1,
                id_categoria:undefined,
                id_subcategoria:undefined,
                nombre:'Centro de Eventos'
                },
            {
                id:6,
                id_asociado:1,
                id_categoria:undefined,
                id_subcategoria:undefined,
                nombre:'Hostería'
                },
            {
                id:7,
                id_asociado:1,
                id_categoria:undefined,
                id_subcategoria:undefined,
                nombre:'Restaurante'
                },
            {
                id:8,
                id_asociado:1,
                id_categoria:undefined,
                id_subcategoria:undefined,
                nombre:'Spa'
                },
            {
                id:9,
                id_asociado:2,
                id_categoria:undefined,
                id_subcategoria:undefined,
                nombre:'Cervecería Artesanal'
                }
        ];
        this.imgs = [];
        this.parrafos = [];
        this.tipos_parrafo = [];

        this.asociados$.next(this.asociados);
        this.atractivos$.next(this.atractivos);
        this.categorias$.next(this.categorias);
        this.subcategorias$.next(this.subcategorias);
        this.servicios$.next(this.servicios);
        this.imgs$.next(this.imgs);
        this.parrafos$.next(this.parrafos);
        this.tipos_parrafo$.next(this.tipos_parrafo);

    }

    ngOnInit() {
        this.asociados$.next(this.asociados);
        this.atractivos$.next(this.atractivos);
        this.categorias$.next(this.categorias);
        this.subcategorias$.next(this.subcategorias);
        this.servicios$.next(this.servicios);
        this.imgs$.next(this.imgs);
        this.parrafos$.next(this.parrafos);
        this.tipos_parrafo$.next(this.tipos_parrafo);
    }

    // CRUD Asociado
    getAsociados$(): Observable<Asociado[]>{
        return this.asociados$.asObservable();
    }

    getAsociados() {
        return this.asociados;
    }

    addAsociado( asociado: Asociado ) {
        this.asociados.push(asociado);
        this.asociados$.next(this.asociados);
    }
    updtAsociado( asociado: Asociado ) {
        this.asociados.forEach( ( old, index ) => {
            if (old.id == asociado.id) {
                this.asociados[index] = asociado;
            }
        });
        this.asociados$.next(this.asociados);
    }
    delAsociado( id: number) {
        this.asociados.forEach((asociado, index) => {
            if (asociado.id == id) {
                this.asociados.splice(index, 1)
            }
        });
        this.asociados$.next(this.asociados);
    }

    // CRUD Atractivo
    getAtractivos$(): Observable<Atractivo[]>{
        return this.atractivos$.asObservable();
    }
    addAtractivo(atractivo: Atractivo) {
        this.atractivos.push(atractivo);
        this.atractivos$.next(this.atractivos);
    }
    updtAtractivo(atractivo: Atractivo) {
        this.asociados.forEach((old, index) => {
            if (old.id == atractivo.id) {
                this.atractivos[index] = atractivo;
            }
        });
        this.atractivos$.next(this.atractivos);
    }
    delAtractivo(id: number) {
        this.atractivos.forEach((atractivo, index) => {
            if (atractivo.id == id) {
                this.atractivos.splice(index, 1)
            }
        });
        this.atractivos$.next(this.atractivos);
    }


    // CRUD Categoria
    getCategorias$(): Observable<Categoria[]> {
        return this.categorias$.asObservable();
    }
    addCategoria(categoria: Categoria) {
        this.categorias.push(categoria);
        this.categorias$.next(this.categorias);
    }
    updtCategoria(categoria: Categoria) {
        this.categorias.forEach((old, index) => {
            if (old.id == categoria.id) {
                this.categorias[index] = categoria;
            }
        });
        this.categorias$.next(this.categorias);
    }
    delCategoria(id: number) {
        this.categorias.forEach((categoria, index) => {
            if (categoria.id == id) {
                this.categorias.splice(index, 1)
            }
        });
        this.categorias$.next(this.categorias);
    }

    // CRUD Subcategoria
    getSubcategorias$(): Observable<Subcategoria[]> {
        return this.subcategorias$.asObservable();
    }
    addSubcategoria(subcategoria: Subcategoria) {
        this.subcategorias.push(subcategoria);
        this.subcategorias$.next(this.subcategorias);
    }
    updtSubcategoria(subcategoria: Subcategoria) {
        this.subcategorias.forEach((old, index) => {
            if (old.id == subcategoria.id) {
                this.subcategorias[index] = subcategoria;
            }
        });
        this.subcategorias$.next(this.subcategorias);
    }
    delSubcategoria(id: number) {
        this.subcategorias.forEach((subcategoria, index) => {
            if (subcategoria.id == id) {
                this.subcategorias.splice(index, 1)
            }
        });
        this.subcategorias$.next(this.subcategorias);
    }

    // CRUD Servicio
    getServicios$(): Observable<Servicio[]> {
        return this.servicios$.asObservable();
    }
    addServicio(servicio: Servicio) {
        this.servicios.push(servicio);
        this.servicios$.next(this.servicios);
    }
    updtServicio(servicio: Servicio) {
        this.servicios.forEach((old, index) => {
            if (old.id == servicio.id) {
                this.servicios[index] = servicio;
            }
        });
        this.servicios$.next(this.servicios);
    }
    delServicio(id: number) {
        this.servicios.forEach((servicio, index) => {
            if (servicio.id == id) {
                this.servicios.splice(index, 1)
            }
        });
        this.servicios$.next(this.servicios);
    }
    delServCat(id: number) {
        this.servicios.forEach((servicio, index) => {
            if (servicio.id_categoria == id) {
                this.servicios.splice(index, 1)
            }
        });
        this.servicios$.next(this.servicios);
    }
    delServSubcat(id: number) {
        this.servicios.forEach((servicio, index) => {
            if (servicio.id_subcategoria == id) {
                this.servicios.splice(index, 1)
            }
        });
        this.servicios$.next(this.servicios);
    }
    delServAsoc(id: number) {
        this.servicios.forEach((servicio, index) => {
            if (servicio.id_asociado == id) {
                this.servicios.splice(index, 1)
            }
        });
        this.servicios$.next(this.servicios);
    }

    // CRUD Img
    getImages$(): Observable<Img[]> {
        return this.imgs$.asObservable();
    }
    addImage( img: Img ) {
        this.imgs.push(img);
        this.imgs$.next(this.imgs);
    }
    updtImage( img: Img ) {
        this.imgs.forEach((old, index) => {
            if (old.id == img.id) {
                this.imgs[index] = img;
            }
        });
        this.imgs$.next(this.imgs);
    }
    delImage(id: number) {
        this.imgs.forEach((img, index) => {
            if (img.id == id) {
                this.imgs.splice(index, 1)
            }
        });
        this.imgs$.next(this.imgs);
    }
    delImagesAsoc(id: number) {
        this.imgs.forEach((img, index) => {
            if (img.id_asociado == id) {
                this.imgs.splice(index, 1)
            }
        });
        this.imgs$.next(this.imgs);
    }

    // CRUD Parrafo
    getParrafos$(): Observable<Parrafo[]> {
        return this.parrafos$.asObservable();
    }
    addParrafo( parrafo: Parrafo ) {
        this.parrafos.push(parrafo);
        this.parrafos$.next(this.parrafos);
    }
    updtParrafo( parrafo: Parrafo ) {
        this.parrafos.forEach((old, index) => {
            if (old.id == parrafo.id) {
                this.parrafos[index] = parrafo;
            }
        });
        this.parrafos$.next(this.parrafos);
    }
    delParrafo(id: number) {
        this.parrafos.forEach((parrafo, index) => {
            if (parrafo.id == id) {
                this.parrafos.splice(index, 1)
            }
        });
        this.parrafos$.next(this.parrafos);
    }

    // CRUD Tipo_parrafo
    getTparrafos$(): Observable<Tipo_parrafo[]> {
        return this.tipos_parrafo$.asObservable();
    }
    addTParrafo( tparrafo: Tipo_parrafo ) {
        this.tipos_parrafo.push(tparrafo);
        this.tipos_parrafo$.next(this.tipos_parrafo);
    }
    updtTParrafo( tparrafo: Tipo_parrafo ) {
        this.tipos_parrafo.forEach((old, index) => {
            if (old.id == tparrafo.id) {
                this.tipos_parrafo[index] = tparrafo;
            }
        });
        this.tipos_parrafo$.next(this.tipos_parrafo);
    }
    delTParrafo(id: number) {
        this.tipos_parrafo.forEach((tparrafo, index) => {
            if (tparrafo.id == id) {
                this.tipos_parrafo.splice(index, 1)
            }
        });
        this.tipos_parrafo$.next(this.tipos_parrafo);
    }

    ngOnDestroy() {

    }
}
