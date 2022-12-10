import { Component, Inject, ViewEncapsulation, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Atractivo, Img, Parrafo, Tipo_parrafo } from './atractivos.model';
import { AtractivosService } from './atractivos.service';
import { DataService } from '../../services/data.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-atractivos',
  templateUrl: './atractivos.component.html',
  styleUrls: ['./atractivos.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[
        AtractivosComponent
  ]
})
export class AtractivosComponent implements OnInit, OnDestroy, AfterViewInit{

  // Dynamic table
  displayedColumns: string[] = [
    // "id",
    // "id_categoria",
    "nombre", // Unique
    "estado",
    "ubicacion" // Unique
  ];
  atractivos = new MatTableDataSource<Atractivo>();
  private unsubscribe = new Subject(); 

  // Elements helpers
  tabAtractivos = 0;

  // Atractivo
  atractivo: Atractivo;
  parrafos: Parrafo[] = []; // Saving servicios
  images: Img[] = []; // Uploading images

  constructor(
    private atractivosService: AtractivosService,
    private dataService: DataService,
    public dialog: MatDialog
  ){  
    this.atractivo = this.defaultAtractivo();
  } 

  ngOnInit(): void {
    this.dataService.getAtractivos$().pipe(takeUntil(this.unsubscribe)).subscribe(
      {
          next: (data) => {
              this.atractivos.data = data
          },
          error: (err) => {
              console.log(err)
          },
          complete: () => { }
      }
    );
  } 

  ngAfterViewInit(): void {

  } 

  ngOnDestroy(): void {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
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

  // Clear/Start Atractivo form
  defaultAtractivo() {
    return {
      id: undefined,
      id_categoria: 16,
      nombre:    "", // Unique
      estado:    "",
      ubicacion: "" // Unique
    }; 
  }

  Submit() {
    if ( 
      (this.atractivo.nombre    != (undefined || null || "") ) ||
      (this.atractivo.ubicacion != (undefined || null || "") )
    ) {
        this.atractivosService.newAtractivo(this.atractivo, this.parrafos, this.images);

        this.atractivo = this.defaultAtractivo();
        this.images = [];
        this.parrafos = [];
        this.tabAtractivos = 1;
    } else {
        alert("Complete los campos requeridos");
    }

  }

  // Modal Editar
  Editar(id: number): void {

    var asociado = this.atractivosService.getAtractivo(id);
    var parrafos = this.atractivosService.getParrafosAtr(id);
    var images = this.atractivosService.getImagesAtr(id);

    const editModal = this.dialog.open(editAtractivo, {
        width: '60%',
        data: {
            asociado: asociado,
            parrafos: parrafos,
            images: images                
        },

    });

    editModal.afterClosed().subscribe(result => {

        if (!(result == undefined)) {

            this.atractivosService.updtAtractivo(result.asociado,result.parrafos,result.images);
           console.log('Cambios guardados ', id);
        } else {
           console.log('Cambios cancelados');
           editModal.close();
        }

    });

  }

  Borrar(id: number) {
      this.atractivosService.delAtractivo(id);
  }

}

// Modal pop-up Editar(i)
@Component({
  selector: 'edit-atractivo',
  templateUrl: './edit-atractivo.html',
  styleUrls: ['./atractivos.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[
        AtractivosComponent
  ]
})
export class editAtractivo{

  // Atractivo
  atractivo: Atractivo;
  parrafos: Parrafo[] = []; // Saving servicios
  images: Img[] = []; // Uploading images

  constructor(
    public editModal: MatDialogRef<editAtractivo>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    this.atractivo = data.atractivo;
    this.parrafos = data.parrafos;
    this.images = data.images;

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
            alert("Nro. Maximo de imagenes: 8");
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

}