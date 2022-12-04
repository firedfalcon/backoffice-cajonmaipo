import { Component, Inject, ViewEncapsulation, OnInit, OnDestroy} from '@angular/core';
import { Servicio, Img, Asociado } from './asociados.model';
import { AsociadosService } from './asociados.service';
import { DataService } from '../../services/data.service';

import { Observable, timer, Subscription, Subject } from 'rxjs';
import { switchMap, tap, share, retry, takeUntil } from 'rxjs/operators';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { faInstagram, faTwitter, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-asociados',
  templateUrl: './asociados.component.html',
  styleUrls: ['./asociados.component.css'],
  encapsulation: ViewEncapsulation.None,
    providers: [AsociadosService,
                DataService
    ]
})
export class AsociadosComponent implements OnInit, OnDestroy{

    // Display
    asociados$: Observable<Asociado[]> = new Observable();
    dataSource: MatTableDataSource<Asociado>;

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
    asociados: Asociado[] = [];

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
    asociado: Asociado | any;
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
        this.defaultAsociado();
        this.defaultLogo();
        this.dataSource = new MatTableDataSource(this.asociados);
    }

    ngOnInit() {
        this.asociados$ = this.asociadosService.getAsociados$()
        this.asociados$.subscribe(rs => {
            this.asociados = rs;
            this.dataSource = new MatTableDataSource(rs);
            console.log(rs)
        });
    }

    ngOnDestroy() {

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
        if (!fileInputEvent.target.files.length) {
            this.defaultLogo();
        } else {
            this.logo.path = fileInputEvent.target.files[0].name;
        }
        
    }

    uploadImages(fileInputEvent: any) {
        var images = fileInputEvent.target.files.length;
        if (images <= 6) {
            this.images = [];
            for (var i = 0; images -1; i++) {
                if (fileInputEvent.target.files[i].name != undefined) {
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
        this.asociado = {
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
            telefono: "",
        }; 
    }

    defaultLogo() {
        this.logo = {
            id: undefined,
            id_asociado: undefined,
            id_atractivo: undefined,
            id_categoria: undefined,
            id_subcategoria: undefined,
            tipo: 'logo',
            path: ".png, .jpg, .jpeg"
        };
    }

    submit() {
        this.defaultAsociado();
        this.tabAsociados = 1;
    }

    // Modal Editar
    Editar(i: number): void {

        var asociado = {
                index: i,
                nombre: this.asociados[i].nombre, // Unique
                descripcion: this.asociados[i].descripcion,
                facebook: this.asociados[i].facebook,
                instagram: this.asociados[i].instagram,
                twitter:    this.asociados[i].twitter,
                youtube:    this.asociados[i].youtube,
                whatsapp:   this.asociados[i].whatsapp,
                web:        this.asociados[i].web,
                email:      this.asociados[i].email,
                telefono: this.asociados[i].telefono,
        };

        var servicios = new Array;
        // *Obtener servicios

        var images = new Array;
        // *Obtener imagenes

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
               // *Recibir data modal 
               console.log('Cambios realizados en la posición', i);
            } else {
               console.log('Cambios cancelados');
               editModal.close();
            }

        });

    }

    Borrar(i: number) {
        var id = this.asociados[i].id;
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

    constructor(
        public editModal: MatDialogRef<editAsociado>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private asociadosService: AsociadosService,
    ) {
        // *Obtener servicios e imagenes desde data

        //onNoClick(): void {
        //    this.editModal.close();
        //}
    }
}