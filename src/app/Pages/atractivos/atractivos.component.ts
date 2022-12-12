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
    "ubicacion", // Unique
    "opciones"
  ];
  atractivos = new MatTableDataSource<Atractivo>();
  private unsubscribe = new Subject(); 

  // Elements helpers
  tabAtractivos = 0;

  // Atractivo
  atractivo: Atractivo;
  estado: boolean = true;
  parrafos: Parrafo[] = []; // Saving servicios
  images: Img[] = []; // Uploading images
  tparrafos: Tipo_parrafo[]= [];

  constructor(
    private atractivosService: AtractivosService,
    private dataService: DataService,
    public dialog: MatDialog
  ){  
    this.atractivo = this.defaultAtractivo();
    this.tparrafos = this.dataService.getTparrafos();
    this.tparrafos.splice(0,1);
    this.parrafos=  this.defaultParrafos();
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

  capsFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  uploadImages(fileInputEvent: any) {

    var images = fileInputEvent.target.files.length;
    if (this.images.length <= 3) {
        this.images = [];
        for (var i = 0; images; i++) {
            if ( fileInputEvent.target.files[i].name != (undefined || null || "") ) {
                this.addImage(fileInputEvent.target.files[i].name);
            }
        }
    } else {
            alert("Nro. Maximo de imagenes: 3");
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

  defaultParrafos(){
    var parrafos = new Array;
    this.tparrafos.forEach(tparrafo =>{
      parrafos.push(
        {
          id: undefined,
          id_atractivo: undefined,
          id_categoria: undefined,
          id_subcategoria: undefined,
          id_tipo_parrafo: tparrafo.id,
          titulo: "",
          subtitulo: "",
          cuerpo: ""
        });
    });
    return parrafos;
  }

  Submit() {
    if ( 
      (this.atractivo.nombre    != (undefined || null || "") ) ||
      (this.atractivo.ubicacion != (undefined || null || "") )
    ) {

      if(this.estado){
        this.atractivo.estado = "abierto";
      }else{
        this.atractivo.estado = "cerrado";
      }
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

    var atractivo = this.atractivosService.getAtractivo(id);
    var parrafos = this.atractivosService.getParrafosAtr(id);
    var images = this.atractivosService.getImagesAtr(id);
    var tparrafos = this.tparrafos;

    const editModal = this.dialog.open(editAtractivo, {
        width: '60%',
        data: {
          atractivo: atractivo,
          parrafos: parrafos,
          images: images,
          tparrafos: tparrafos                
        },

    });

    editModal.afterClosed().subscribe(result => {

        if (!(result == undefined)) {

          this.atractivosService.updtAtractivo(result.atractivo,result.parrafos,result.images);
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
  encapsulation: ViewEncapsulation.None
})
export class editAtractivo{

  // Atractivo
  atractivo: Atractivo;
  estado: boolean = true;
  parrafos: Parrafo[] = []; // Saving servicios
  auxparrafos: Parrafo[]= [];
  images: Img[] = []; // Uploading images
  tparrafos: Tipo_parrafo[]= [];

  constructor(
    public editModal: MatDialogRef<editAtractivo>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    this.atractivo = data.atractivo;
    this.parrafos = data.parrafos;
    this.images = data.images;    
    this.tparrafos = data.tparrafos;
    this.auxparrafos = this.defaultParrafos();
    console.log(this.parrafos);
    console.log(this.auxparrafos);
    // this.auxparrafos.forEach( aux =>{
    //   for(var i=0 ; this.parrafos.length-1; i++){
    //     if(aux.id_tipo_parrafo == this.parrafos[i].id_tipo_parrafo){
    //       aux = this.parrafos[i];
    //     }
    //   }
    // });
    // this.parrafos= this.auxparrafos;

    console.log(this.parrafos);
    if(this.atractivo.estado == "abierto"){
      this.estado = true;
    }else{
      this.estado = false;
    }

  }

  capsFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  uploadImages(fileInputEvent: any) {

    var images = fileInputEvent.target.files.length;
    if (images <= 8) {
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

  defaultParrafos(){
    var parrafos = new Array;
    this.tparrafos.forEach(tparrafo =>{
      parrafos.push(
        {
          id: undefined,
          id_atractivo: undefined,
          id_categoria: undefined,
          id_subcategoria: undefined,
          id_tipo_parrafo: tparrafo.id,
          titulo: "",
          subtitulo: "",
          cuerpo: ""
        });
    });
    return parrafos;
  }

  onNoClick(){
    this.editModal.close();
  }

}