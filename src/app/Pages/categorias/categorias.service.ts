import { Injectable, OnDestroy } from '@angular/core';
import { Categoria, Subcategoria, Parrafo, Servicio, Img } from './categorias.model';
import { DataService } from '../../services/data.service';

import { HttpClient } from '@angular/common/http';
import { Observable, timer, Subscription, Subject } from 'rxjs';
import { switchMap, tap, share, retry, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService implements OnDestroy {

    constructor(
        private http: HttpClient,
        private dataService: DataService
    ) {

    }

    getCategoria(id: number) {
        return this.dataService.getCategoria(id);
    }

    getSubcategoria(id: number) {
        return this.dataService.getSubcategoria(id);
    }

    getParrafosCat(id: number) {
        return this.dataService.getParrafosCat(id);
    }

    getParrafosSubcat(id: number) {
        return this.dataService.getParrafosSubcat(id);
    }

    getServiciosCat(id: number) {
        return this.dataService.getServsCat(id);
    }

    getServiciosSubcat(id: number) {
        return this.dataService.getServsSubcat(id);
    }

    getImagesCat(id:number){
        return this.dataService.getImagesCat(id);
    }

    getImagesSubcat(id: number){
        return this.dataService.getImagesSubcat(id);
    }

    newCategoria( categoria: Categoria, parrafos: Parrafo[], servicios: Servicio[], images: Img[] ) {

        categoria.id = this.dataService.newCategoriaId();
 
        this.dataService.addCategoria(categoria);

        if (parrafos.length) {

            parrafos.forEach( parrafo => {
                parrafo.id_categoria = categoria.id
                parrafo.id = this.dataService.newParrafoId();

                this.dataService.addParrafo(parrafo);
            })
        }

        if (servicios.length) {

            servicios.forEach( servicio => {
                servicio.id_categoria = categoria.id
                servicio.id = this.dataService.newServicioId();
                
                this.dataService.addServicio(servicio);
            })
        }

        if (images.length) {

            images.forEach( image => {
                image.id_categoria = categoria.id
                image.id = this.dataService.newServicioId();
                
                this.dataService.addImage(image);
            })
        }

    }

    updtCategoria( categoria: Categoria, parrafos: Parrafo[], servicios: Servicio[], images: Img[] ) {

        this.dataService.updtCategoria(categoria);

        if (parrafos.length) {

            this.dataService.delParrafosCat(categoria.id);

            parrafos.forEach( parrafo => {
                parrafo.id_categoria = categoria.id
                parrafo.id = this.dataService.newParrafoId();
                
                this.dataService.addParrafo(parrafo);
            })
        }

        if (servicios.length) {

            this.dataService.delServCat(categoria.id);

            servicios.forEach( servicio => {
                servicio.id_categoria = categoria.id
                servicio.id = this.dataService.newServicioId();
                
                this.dataService.addServicio(servicio);
            })
        }

        if (images.length) {

            this.dataService.delServCat(categoria.id);

            images.forEach( image => {
                image.id_categoria = categoria.id
                image.id = this.dataService.newImageId();
                
                this.dataService.addImage(image);
            })
        }

    }

    delCategoria( id: number) {

        this.dataService.delCategoria(id);
        this.dataService.delParrafosCat(id);
        this.dataService.delImagesCat(id);
        this.dataService.delServCat(id);
    
    }

    newSubcategoria( subcategoria: Subcategoria, parrafos: Parrafo[], servicios: Servicio[], images: Img[] ) {

        subcategoria.id = this.dataService.newSubCategoriaId();
 
        this.dataService.addSubcategoria(subcategoria);

        if (parrafos.length) {

            parrafos.forEach( parrafo => {
                parrafo.id_subcategoria = subcategoria.id
                parrafo.id = this.dataService.newParrafoId();

                this.dataService.addParrafo(parrafo);
            })
        }

        if (servicios.length) {

            servicios.forEach( servicio => {
                servicio.id_subcategoria = subcategoria.id
                servicio.id = this.dataService.newServicioId();
                
                this.dataService.addServicio(servicio);
            })
        }

        if (images.length) {

            images.forEach( image => {
                image.id_subcategoria = subcategoria.id
                image.id = this.dataService.newImageId();
                
                this.dataService.addImage(image);
            })
        }

    }

    updtSubcategoria( subcategoria: Subcategoria, parrafos: Parrafo[], servicios: Servicio[], images: Img[] ) {

        this.dataService.updtSubcategoria(subcategoria);

        if (parrafos.length) {

            this.dataService.delParrafosCat(subcategoria.id);

            parrafos.forEach( parrafo => {
                parrafo.id_subcategoria = subcategoria.id
                parrafo.id = this.dataService.newParrafoId();
                
                this.dataService.addParrafo(parrafo);
            })
        }

        if (servicios.length) {

            this.dataService.delServSubcat(subcategoria.id);

            servicios.forEach( servicio => {
                servicio.id_subcategoria = subcategoria.id
                servicio.id = this.dataService.newServicioId();
                
                this.dataService.addServicio(servicio);
            })
        }

        if (images.length) {

            this.dataService.delImagesSubcat(subcategoria.id);

            images.forEach( image => {
                image.id_subcategoria = subcategoria.id
                image.id = this.dataService.newImageId();
                
                this.dataService.addImage(image);
            })
        }

    }

    delSubcategoria( id: number ) {

        this.dataService.delSubcategoria(id);
        this.dataService.delParrafosSubcat(id);
        this.dataService.delImagesSubcat(id);
        this.dataService.delServSubcat(id);

    }

    ngOnDestroy() {

    }
}
