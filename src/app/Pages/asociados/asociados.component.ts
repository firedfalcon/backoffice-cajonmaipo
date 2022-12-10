import { Component, Inject, ViewEncapsulation, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Servicio, Img, Asociado } from './asociados.model';
import { AsociadosService } from './asociados.service';
import { DataService } from '../../services/data.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { faInstagram, faTwitter, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-asociados',
  templateUrl: './asociados.component.html',
  styleUrls: ['./asociados.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[
        AsociadosService
  ]
})

export class AsociadosComponent implements OnInit, OnDestroy, AfterViewInit{

    // Dynamic table
    displayedColumns: string[] = [
        /*"id",*/
        "nombre", // Unique
        /*"descripcion",*/
        //"facebook",
        //"instagram",
        //"twitter",
        //"youtube",
        "whatsapp",
        "web",
        "email",
        "telefono",
        "opciones"
    ];
    asociados = new MatTableDataSource<Asociado>();
    private unsubscribe = new Subject(); 

    // Elements helpers
    addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    tabAsociados = 0;

    // Font awesome icons
    faWhatsapp = faWhatsapp;
    faInstagram = faInstagram;
    faTwitter = faTwitter;
    faYoutube = faYoutube;

    // Asociado
    asociado: Asociado;
    servs: Servicio[] = []; // Saving servicios
    images: Img[] = []; // Uploading images

    logo: Img = {
        id: undefined,
        id_asociado: undefined,
        id_atractivo: undefined,
        id_categoria: undefined,
        id_subcategoria: undefined,
        tipo: 'logo',
        path: ".png, .jpg, .jpeg"
    };

    constructor(
        private asociadosService: AsociadosService,
        private dataService: DataService,
        public dialog: MatDialog
    ) {
        this.asociado = this.defaultAsociado();
        this.logo = this.defaultLogo();
    }

    ngOnInit() {
        this.dataService.getAsociados$().pipe(takeUntil(this.unsubscribe)).subscribe(
            {
                next: (data) => {
                    this.asociados.data = data
                },
                error: (err) => {
                    console.log(err)
                },
                complete: () => { }
            }
        );
    }

    ngAfterViewInit() { 
        
    }

    ngOnDestroy() {
        this.unsubscribe.next(true);
        this.unsubscribe.complete();
    }

    // Chip input servicios element events
    addServicio(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add
        if (value) {
            this.servs.push({
                id: undefined,
                id_asociado: undefined,
                id_categoria: undefined,
                id_subcategoria: undefined,
                nombre: value
            });
        }

        // Clear the input value
        event.chipInput!.clear();
    }

    removeServicio(servicio: Servicio): void {
        const index = this.servs.indexOf(servicio);

        if (index >= 0) {
            this.servs.splice(index, 1);
        }
    }

    editServicio(servicio: Servicio, event: MatChipEditedEvent) {
        const value = event.value.trim();

        // Remove if it no longer has a name
        if (!value) {
            this.removeServicio(servicio);
            return;
        }

        // Edit existing 
        const index = this.servs.indexOf(servicio);
        if (index > 0) {
            this.servs[index].nombre = value;
        }
    }
    // Chip input servicios element events


    // Image upload element events
    uploadLogo(fileInputEvent: any) {
        this.logo.path = fileInputEvent.target.files[0].name;              
    }

    uploadImages(fileInputEvent: any) {

        var images = fileInputEvent.target.files.length;
        if (images <= 6) {
            this.images = [];
            for (var i = 0; images -1; i++) {
                if ( fileInputEvent.target.files[i].name != (undefined || null) ) {
                    this.addImage(fileInputEvent.target.files[i].name);
                }
            }
        } else {
                alert("Nro. Maximo de imagenes: 6");
        }

    }

    addImage(path: string): void {

        this.images.push({
            id: undefined,
            id_atractivo: undefined,
            id_asociado: undefined,
            id_categoria: undefined,
            id_subcategoria: undefined,
            tipo: 'display',
            path: path
        });
    }

    // Clear/Start Asociado form
    defaultAsociado() {
        return {
            id: undefined,
            nombre: "", // Unique
            descripcion: "",
            facebook: "",
            instagram: "",
            twitter: "",
            youtube: "",
            whatsapp: "",
            web: "",
            email: "",
            telefono: ""
        }; 
    }

    defaultLogo() {
        return {
            id: undefined,
            id_asociado: undefined,
            id_atractivo: undefined,
            id_categoria: undefined,
            id_subcategoria: undefined,
            tipo: 'logo',
            path: ""
        };
    }

    Submit() {
        if (this.asociado.nombre != (undefined || null || "")) {
            var imgs = this.images;
            imgs.push(this.logo);

            this.asociadosService.newAsociado(this.asociado, this.servs, imgs);

            this.asociado = this.defaultAsociado();
            this.logo = this.defaultLogo();
            this.images = [];
            this.servs = [];
            this.tabAsociados = 1;
        } else {
            alert("Complete los campos requeridos");
        }
        
    }

    // Modal Editar
    Editar(id: number): void {

        var asociado = this.asociadosService.getAsociado(id);
        var servicios = this.asociadosService.getServsAsc(id);
        var images = this.asociadosService.getImagesAsoc(id);

        const editModal = this.dialog.open(editAsociado, {
            width: '60%',
            data: {
                asociado: asociado,
                servicios: servicios,
                images: images                
            },

        });

        editModal.afterClosed().subscribe(result => {

            if (!(result == undefined)) {

                var images = new Array;
                images = result.images;
                images.push(result.logo);

                this.asociadosService.updtAsociado(result.asociado,result.servicios,images);
               console.log('Cambios guardados ', id);
            } else {
               console.log('Cambios cancelados');
               editModal.close();
            }

        });

    }

    Borrar(id: number) {
        this.asociadosService.delAsociado(id);
    }
}

// Modal pop-up Editar(i) 
@Component({
    selector: 'edit-asociado',
    templateUrl: './edit-asociado.html',
    styleUrls: ['./asociados.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        AsociadosService
    ]
})

export class editAsociado {

    // Elements helpers
    addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;

    // Font awesome icons
    faWhatsapp = faWhatsapp;
    faInstagram = faInstagram;
    faTwitter = faTwitter;
    faYoutube = faYoutube;

    // Asociado
    asociado: Asociado;
    servs: Servicio[] = []; // Saving servicios
    images: Img[] = []; // Uploading images

    logo: Img;

    constructor(
        public editModal: MatDialogRef<editAsociado>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {

        this.asociado = data.asociado;
        this.servs = data.servicios;

        this.images = data.images;

        this.logo = {
            id: undefined,
            id_asociado: undefined,
            id_atractivo: undefined,
            id_categoria: undefined,
            id_subcategoria: undefined,
            tipo: 'logo',
            path: ""
        };

        if (this.images.length) {
            this.images.forEach((image, index) => {
                if (image.tipo == "logo") {
                    this.logo = image;
                    this.images.splice(index, 1);
                }
            });
        }
        
    }

    // Chip input servicios element events
    addServicio(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add
        if (value) {
            this.servs.push({
                id: undefined,
                id_asociado: undefined,
                id_categoria: undefined,
                id_subcategoria: undefined,
                nombre: value
            });
        }

        // Clear the input value
        event.chipInput!.clear();
    }

    removeServicio(servicio: Servicio): void {
        const index = this.servs.indexOf(servicio);

        if (index >= 0) {
            this.servs.splice(index, 1);
        }
    }

    editServicio(servicio: Servicio, event: MatChipEditedEvent) {
        const value = event.value.trim();

        // Remove if it no longer has a name
        if (!value) {
            this.removeServicio(servicio);
            return;
        }

        // Edit existing 
        const index = this.servs.indexOf(servicio);
        if (index > 0) {
            this.servs[index].nombre = value;
        }
    }
    // Chip input servicios element events


    // Image upload element events
    uploadLogo(fileInputEvent: any) {
        this.logo.path = fileInputEvent.target.files[0].name;        
    }

    uploadImages(fileInputEvent: any) {

        var images = fileInputEvent.target.files.length;
        if (images <= 6) {
            this.images = [];
            for (var i = 0; images - 1; i++) {
                if ( fileInputEvent.target.files[i].name != (undefined || null) ) {
                    this.addImage(fileInputEvent.target.files[i].name);
                }
            }
        } else {
            alert("Nro. Maximo de imagenes: 6");
        }

    }

    addImage(path: string): void {

        this.images.push({
            id: undefined,
            id_atractivo: undefined,
            id_asociado: undefined,
            id_categoria: undefined,
            id_subcategoria: undefined,
            tipo: 'display',
            path: path
        });
    }

    onNoClick(){
        this.editModal.close();
    }
}