import { Component, Inject, ViewEncapsulation, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Servicio, Img, Categoria, Subcategoria, Parrafo } from './categorias.model';
import { CategoriasService } from './categorias.service';
import { DataService } from '../../services/data.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CategoriasComponent implements OnInit, OnDestroy, AfterViewInit {

  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];
  private unsubscribe = new Subject(); 

  // Elements helpers
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tabCategorias = 0;

  // Categoria
  categoria:    Categoria;
  servscat:     Servicio[] = [];
  parrscat:     Parrafo[] = [];
  imagescat:    Img[] = [];
  titulocat:    string = "";
  subtitulocat: string = "";
  cuerpocat:    string = "";

  // Subcategoria
  subcategoria:    Subcategoria;
  servssubcat:     Servicio[] = [];
  parrssubcat:     Parrafo[] = [];
  imagessubcat:    Img[] = [];
  titulosubcat:    string = "";
  subtitulosubcat: string = "";
  cuerposubcat:    string = "";

  constructor(
    private dataService: DataService,
    private categoriasService: CategoriasService,
    public dialogcat: MatDialog,
    public dialogsubcat: MatDialog
  ){
    this.categoria = this.defaultCat();
    this.subcategoria = this.defaultSubcat();
  }

  ngOnInit(): void {
    this.dataService.getCategorias$().pipe(takeUntil(this.unsubscribe)).subscribe(
      {
          next: (data) => {
              this.categorias = data
          },
          error: (err) => {
              console.log(err)
          },
          complete: () => { }
      }
    );
    this.dataService.getSubcategorias$().pipe(takeUntil(this.unsubscribe)).subscribe(
      {
          next: (data) => {
              this.subcategorias = data
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

  // Chip input servicios categoria element events
  addServicioCat(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add
    if (value) {
        this.servscat.push({
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

  removeServicioCat(servicio: Servicio): void {
      const index = this.servscat.indexOf(servicio);

      if (index >= 0) {
          this.servscat.splice(index, 1);
      }
  }

  editServicioCat(servicio: Servicio, event: MatChipEditedEvent) {
      const value = event.value.trim();

      // Remove if it no longer has a name
      if (!value) {
          this.removeServicioCat(servicio);
          return;
      }

      // Edit existing 
      const index = this.servscat.indexOf(servicio);
      if (index > 0) {
          this.servscat[index].nombre = value;
      }
  }
  // Chip input servicios categoria element events

  // Chip input servicios subcategoria element events
  addServicioSubcat(event: MatChipInputEvent): void {
    const value = (event.value || '').trim(); 
    // Add
    if (value) {
        this.servssubcat.push({
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

  removeServicioSubcat(servicio: Servicio): void {
      const index = this.servssubcat.indexOf(servicio);

      if (index >= 0) {
          this.servssubcat.splice(index, 1);
      }
  }

  editServicioSubcat(servicio: Servicio, event: MatChipEditedEvent) {
      const value = event.value.trim();

      // Remove if it no longer has a name
      if (!value) {
          this.removeServicioSubcat(servicio);
          return;
      }

      // Edit existing 
      const index = this.servssubcat.indexOf(servicio);
      if (index > 0) {
          this.servssubcat[index].nombre = value;
      }
  }
  // Chip input servicios subcategoria element events

  defaultCat(){
    return {
      id: undefined,
      nombre: "" // Unique
    };
  }

  defaultSubcat(){
    return {
      id: undefined,
      id_categoria: undefined,
      nombre: "" // Unique
    };
  }

  uploadImagesCat(fileInputEvent: any) {

    var images = fileInputEvent.target.files.length;
    console.log(fileInputEvent.target.files);
    if (images <= 3) {
        this.imagescat = [];
        for (var i = 0; images; i++) {
            if ( fileInputEvent.target.files[i].name != (undefined || null) ) {
                this.addImageCat(fileInputEvent.target.files[i].name);
            }
        }
    } else {
            alert("Nro. Maximo de imagenes: 3");
    }

  }

  addImageCat(path: string): void {

      this.imagescat.push({
          id: undefined,
          id_atractivo: undefined,
          id_asociado: undefined,
          id_categoria: undefined,
          id_subcategoria: undefined,
          tipo: 'display',
          path: path
      });
  }

  uploadImagesSubcat(fileInputEvent: any) {

    var images = fileInputEvent.target.files.length;
    if (images <= 3) {
        this.imagessubcat = [];
        for (var i = 0; images -1; i++) {
            if ( fileInputEvent.target.files[i].name != (undefined || null) ) {
                this.addImageSubcat(fileInputEvent.target.files[i].name);
            }
        }
    } else {
            alert("Nro. Maximo de imagenes: 3");
    }

  }

  addImageSubcat(path: string): void {

      this.imagessubcat.push({
          id: undefined,
          id_atractivo: undefined,
          id_asociado: undefined,
          id_categoria: undefined,
          id_subcategoria: undefined,
          tipo: 'display',
          path: path
      });
  }

  addParrafoCat(titulo: string,subtitulo: string,cuerpo: string){
    this.parrscat.push({
      id: undefined,
      id_atractivo: undefined,
      id_categoria: undefined,
      id_subcategoria: undefined,
      id_tipo_parrafo: 2,
      titulo: titulo,
      subtitulo: subtitulo,
      cuerpo: cuerpo
    });
  }

  addParrafoSubcat(titulo: string,subtitulo: string,cuerpo: string){
    this.parrssubcat.push({
      id: undefined,
      id_atractivo: undefined,
      id_categoria: undefined,
      id_subcategoria: undefined,
      id_tipo_parrafo: 2,
      titulo: titulo,
      subtitulo: subtitulo,
      cuerpo: cuerpo
    });
  }

  SubmitCat() {
    if (this.categoria.nombre != (undefined || null || "")) {

      if( this.cuerpocat != (undefined || null || "") ){
          this.addParrafoCat(this.titulocat,this.subtitulocat,this.cuerpocat);          
      }else{
        if( 
          (this.titulocat != (undefined || null || "")) ||
          (this.subtitulocat != (undefined || null || ""))
          ){
          this.addParrafoCat(this.titulocat,this.subtitulocat,this.cuerpocat);
        }            
      }

      this.categoriasService.newCategoria(
        this.categoria, this.parrscat, this.servscat, this.imagescat
        );
          
      this.categoria = this.defaultCat();
      this.parrscat = [];
      this.servscat = [];
      this.imagescat = [];
      this.titulocat = "";
      this.subtitulocat = "";
      this.cuerpocat = "";
    } else {
      alert("Complete los campos requeridos");
    }
    
  }

  SubmitSubcat() {
    if (this.subcategoria.nombre != (undefined || null || "")) {

      if( this.cuerposubcat != (undefined || null || "") ){
          this.addParrafoCat(this.titulosubcat,this.subtitulosubcat,this.cuerposubcat);          
      }else{
        if( 
          (this.titulosubcat != (undefined || null || "")) ||
          (this.subtitulosubcat != (undefined || null || ""))
          ){
          this.addParrafoCat(this.titulosubcat,this.subtitulosubcat,this.cuerposubcat);
        }            
      }

      this.categoriasService.newSubcategoria(
        this.subcategoria, this.parrssubcat, this.servssubcat, this.imagessubcat
        );

      this.subcategoria = this.defaultSubcat();
      this.parrssubcat = [];
      this.servssubcat = [];
      this.imagessubcat = [];
    } else {
      alert("Complete los campos requeridos");
    }
    
  }

  // Modal Editar Categoria
  EditarCat(id: number): void {

    var categoria = this.categoriasService.getCategoria(id);
    var servicios = this.categoriasService.getServiciosCat(id);
    var images = this.categoriasService.getImagesCat(id);
    var parrafos = this.categoriasService.getParrafosCat(id);

    const editModal = this.dialogcat.open(editCategoria, {
        width: '60%',
        data: {
          categoria: categoria,
          servicios: servicios,
          images: images,
          parrafos: parrafos                
        },

    });

    editModal.afterClosed().subscribe(result => {

        if (!(result == undefined)) {
            this.categoriasService.updtCategoria(result.categoria,result.parrafos,result.servicios,result.images);
           console.log('Cambios guardados ', id);
        } else {
           console.log('Cambios cancelados');
           editModal.close();
        }

    });

  }

  BorrarCat(id: number) {
      this.categoriasService.delCategoria(id);
  }

  // Modal Editar Subcategoria
  EditarSubcat(id: number): void {

    var subcategoria = this.categoriasService.getSubcategoria(id);
    var servicios = this.categoriasService.getServiciosSubcat(id);
    var images = this.categoriasService.getImagesSubcat(id);
    var parrafos = this.categoriasService.getParrafosSubcat(id);

    const editModal = this.dialogcat.open(editSubcategoria, {
        width: '60%',
        data: {
          subcategoria: subcategoria,
          servicios: servicios,
          images: images,
          parrafos: parrafos                
        },

    });

    editModal.afterClosed().subscribe(result => {

        if (!(result == undefined)) {

            var images = new Array;
            images = result.images;
            images.push(result.logo);

            this.categoriasService.updtSubcategoria(result.categoria,result.parrafos,result.servicios,result.images);
           console.log('Cambios guardados ', id);
        } else {
           console.log('Cambios cancelados');
           editModal.close();
        }

    });

}

BorrarSubcat(id: number) {
    this.categoriasService.delSubcategoria(id);
}

}

@Component({
  selector: 'edit-categorias',
  templateUrl: './edit-categorias.html',
  styleUrls: ['./categorias.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class editCategoria{

  // Elements helpers
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  // Categoria
  categoria:    Categoria;
  servscat:     Servicio[] = [];
  parrscat:     Parrafo[] = [];
  imagescat:    Img[] = [];
  titulocat:    String = "";
  subtitulocat: String = "";
  cuerpocat:    String = "";

  constructor(
    public editModal: MatDialogRef<editCategoria>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.categoria = data.categoria;
    this.servscat = data.servicios;
    this.imagescat = data.images;
    this.parrscat = data.parrafos;
  }

    // Chip input servicios categoria element events
    addServicioCat(event: MatChipInputEvent): void {
      const value = (event.value || '').trim();
  
      // Add
      if (value) {
          this.servscat.push({
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
  
    removeServicioCat(servicio: Servicio): void {
        const index = this.servscat.indexOf(servicio);
  
        if (index >= 0) {
            this.servscat.splice(index, 1);
        }
    }
  
    editServicioCat(servicio: Servicio, event: MatChipEditedEvent) {
        const value = event.value.trim();
  
        // Remove if it no longer has a name
        if (!value) {
            this.removeServicioCat(servicio);
            return;
        }
  
        // Edit existing 
        const index = this.servscat.indexOf(servicio);
        if (index > 0) {
            this.servscat[index].nombre = value;
        }
    }
    // Chip input servicios categoria element events

    uploadImagesCat(fileInputEvent: any) {

      var images = fileInputEvent.target.files.length;
      if (images <= 3) {
          this.imagescat = [];
          for (var i = 0; images -1; i++) {
              if ( fileInputEvent.target.files[i].name != (undefined || null) ) {
                  this.addImageCat(fileInputEvent.target.files[i].name);
              }
          }
      } else {
              alert("Nro. Maximo de imagenes: 3");
      }
  
    }
  
    addImageCat(path: string): void {
  
        this.imagescat.push({
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

@Component({
  selector: 'edit-subcategorias',
  templateUrl: './edit-subcategorias.html',
  styleUrls: ['./categorias.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class editSubcategoria{

  // Elements helpers
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  // Subcategoria
  subcategoria: Subcategoria;
  servssubcat: Servicio[] = [];
  parrssubcat:  Parrafo[] = [];
  imagessubcat: Img[] = [];
  titulosubcat:    String = "";
  subtitulosubcat: String = "";
  cuerposubcat:    String = "";


  constructor(
    public editModal: MatDialogRef<editSubcategoria>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.subcategoria = data.categoria;
    this.servssubcat = data.servicios;
    this.imagessubcat = data.images;
    this.parrssubcat = data.parrafos;
  }

  // Chip input servicios subcategoria element events
  addServicioSubcat(event: MatChipInputEvent): void {
    const value = (event.value || '').trim(); 
    // Add
    if (value) {
        this.servssubcat.push({
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

  removeServicioSubcat(servicio: Servicio): void {
      const index = this.servssubcat.indexOf(servicio);

      if (index >= 0) {
          this.servssubcat.splice(index, 1);
      }
  }

  editServicioSubcat(servicio: Servicio, event: MatChipEditedEvent) {
      const value = event.value.trim();

      // Remove if it no longer has a name
      if (!value) {
          this.removeServicioSubcat(servicio);
          return;
      }

      // Edit existing 
      const index = this.servssubcat.indexOf(servicio);
      if (index > 0) {
          this.servssubcat[index].nombre = value;
      }
  }
  // Chip input servicios subcategoria element events

  uploadImagesSubcat(fileInputEvent: any) {

    var images = fileInputEvent.target.files.length;
    if (images <= 3) {
        this.imagessubcat = [];
        for (var i = 0; images -1; i++) {
            if ( fileInputEvent.target.files[i].name != (undefined || null) ) {
                this.addImageSubcat(fileInputEvent.target.files[i].name);
            }
        }
    } else {
            alert("Nro. Maximo de imagenes: 3");
    }

  }

  addImageSubcat(path: string): void {

      this.imagessubcat.push({
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