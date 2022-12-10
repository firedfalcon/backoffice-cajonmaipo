import { Injectable, OnDestroy, OnInit} from '@angular/core';
import { Asociado, Categoria, Subcategoria, Servicio, Atractivo, Img, Parrafo, Tipo_parrafo } from './data.model';

import { HttpClient } from '@angular/common/http';
import { Observable, timer, Subscription, Subject, of, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService implements OnDestroy, OnInit{

    // local DB
    asociados: Asociado[] = [];
    asociados$ = new BehaviorSubject<Asociado[]>([]);

    atractivos: Atractivo[] = [];
    atractivos$ = new BehaviorSubject<Atractivo[]>([]);

    categorias: Categoria[] = [];
    categorias$ = new BehaviorSubject<Categoria[]>([]);

    subcategorias: Subcategoria[] = [];
    subcategorias$ = new BehaviorSubject<Subcategoria[]>([]);

    servicios: Servicio[] = [];
    servicios$ = new BehaviorSubject<Servicio[]>([]);

    imgs: Img[] = [];
    imgs$ = new BehaviorSubject<Img[]>([]);

    parrafos: Parrafo[] = [];
    parrafos$ = new BehaviorSubject<Parrafo[]>([]);

    tipos_parrafo: Tipo_parrafo[] = [];
    tipos_parrafo$ = new BehaviorSubject<Tipo_parrafo[]>([]);

    private stop  = new Subject();

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
        this.atractivos = [
            { id: 57, id_categoria: 16, nombre: "Mirador de Cóndores",   estado: "cerrado", ubicacion: "Estacionamiento Sendero Mirador de Cóndores"},
            { id: 58, id_categoria: 16, nombre: "Cascada de las Ánimas", estado: "abierto", ubicacion: "Cascada de las Animas, Cajón del Maipo - Camino Al Volcán 31087, Casilla 57, San Alfonso, San José de Maipo, Región Metropolitana"},
            { id: 59, id_categoria: 16, nombre: "Laguna de los Patos",   estado: "abierto", ubicacion: "Termas Del Plomo, San José de Maipo, Región Metropolitana"}
        ];
        this.categorias = [
            { id: 15, nombre: "Inicio"},
            { id: 16, nombre: "Atractivos"},
            { id: 17, nombre: "Hospedajes"},
            { id: 18, nombre: "Actividades"},
            { id: 19, nombre: "Gastronomía"},
            { id: 20, nombre: "Cerveza"},
            { id: 21, nombre: "Relax"},
            { id: 22, nombre: "Eventos"},
            { id: 23, nombre: "Tiendas"},
            { id: 24, nombre: "Cámara Turismo"}    
        ];
        this.subcategorias = [
            { id: 1,  id_categoria: 17, nombre: "Camping"},
            { id: 2,  id_categoria: 17, nombre: "Cabañas"},
            { id: 3,  id_categoria: 17, nombre: "Hoteles"},
            { id: 4,  id_categoria: 17, nombre: "Domos"},
            { id: 5,  id_categoria: 17, nombre: "Hostales"},
            { id: 6,  id_categoria: 17, nombre: "Hosterías"},
            { id: 7,  id_categoria: 18, nombre: "Trekking"},
            { id: 8,  id_categoria: 18, nombre: "Rafting"},
            { id: 9,  id_categoria: 18, nombre: "Ciclismo"},
            { id: 10, id_categoria: 18, nombre: "Astronomía"},
            { id: 11, id_categoria: 18, nombre: "Canopy"},
            { id: 12, id_categoria: 18, nombre: "Tours"},
            { id: 13, id_categoria: 18, nombre: "Piscinas"},
            { id: 14, id_categoria: 21, nombre: "Tinajas"},
            { id: 15, id_categoria: 21, nombre: "Spa"},
            { id: 16, id_categoria: 21, nombre: "Piscinas Temperadas"}                
        ];
        this.servicios = [
            { id: 0, id_asociado: 0, id_categoria:undefined, id_subcategoria:undefined, nombre: 'Hotel'},
            { id: 1, id_asociado: 0, id_categoria:undefined, id_subcategoria:undefined, nombre: 'Spa'},
            { id: 2, id_asociado: 0, id_categoria:undefined, id_subcategoria:undefined, nombre: 'Restaurante'},
            { id: 3, id_asociado: 0, id_categoria:undefined, id_subcategoria:undefined, nombre: 'Centro de Eventos'},
            { id: 4, id_asociado: 1, id_categoria:undefined, id_subcategoria:undefined, nombre: 'Cabañas'},
            { id: 5, id_asociado: 1, id_categoria:undefined, id_subcategoria:undefined, nombre: 'Centro de Eventos'},
            { id: 6, id_asociado: 1, id_categoria:undefined, id_subcategoria:undefined, nombre: 'Hostería'},
            { id: 7, id_asociado: 1, id_categoria:undefined, id_subcategoria:undefined, nombre: 'Restaurante'},
            { id: 8, id_asociado: 1, id_categoria:undefined, id_subcategoria:undefined, nombre: 'Spa'},
            { id: 9, id_asociado: 2, id_categoria:undefined, id_subcategoria:undefined, nombre: 'Cervecería Artesanal'}
        ];
        this.imgs = [
            { id: 170, id_asociado: undefined, id_atractivo: 59, id_categoria: undefined, id_subcategoria: undefined, tipo: "display",   path:"images/atractivos/Imagen-1-Laguna-de-los-Patos-Cajon-del-Maipo.jpg"},
            { id: 171, id_asociado: undefined, id_atractivo: 59, id_categoria: undefined, id_subcategoria: undefined, tipo: "display",   path:"images/atractivos/Imagen-2-Laguna-de-los-Patos-Cajon-del-Maipo.jpg"},
            { id: 163, id_asociado: undefined, id_atractivo: 57, id_categoria: undefined, id_subcategoria: undefined, tipo: "thumbnail", path:"images/atractivos/Atractivos-Mirador-de-condores.jpg"},
            { id: 164, id_asociado: undefined, id_atractivo: 57, id_categoria: undefined, id_subcategoria: undefined, tipo: "display",   path:"images/atractivos/Mirador-de-condores-atractivos-p2.jpg"},
            { id: 165, id_asociado: undefined, id_atractivo: 57, id_categoria: undefined, id_subcategoria: undefined, tipo: "display",   path:"images/atractivos/Mirador-de-condores-atractivos-p3.jpg"},
            { id: 166, id_asociado: undefined, id_atractivo: 58, id_categoria: undefined, id_subcategoria: undefined, tipo: "thumbnail", path:"images/atractivos/Atractivos-Cascada-de-las-Animas.jpg"},
            { id: 167, id_asociado: undefined, id_atractivo: 58, id_categoria: undefined, id_subcategoria: undefined, tipo: "display",   path:"images/atractivos/Imagen-1-Cascada-de-las-Animas-Cajon-del-Maipo.jpg"},
            { id: 168, id_asociado: undefined, id_atractivo: 58, id_categoria: undefined, id_subcategoria: undefined, tipo: "display",   path:"images/atractivos/Imagen-2-Cascada-de-las-Animas-Cajon-del-Maipo.jpg"},
            { id: 169, id_asociado: undefined, id_atractivo: 59, id_categoria: undefined, id_subcategoria: undefined, tipo: "thumbnail", path:"images/atractivos/Atractivos-Laguna-de-los-Patos.jpg"}          
        ];
        this.parrafos = [
            { 
                id: 373, id_atractivo: 57, id_categoria: undefined, id_subcategoria: undefined, id_tipo_parrafo: 1, 
                titulo: "", 
                subtitulo: "", 
                cuerpo:"Ubicado en el Km 19 del Alfalfal, es un punto de observación del Cóndor andino, al cual se puede llegar en un trekking de 3 hrs."
            },    
            { 
                id: 374, id_atractivo: 57, id_categoria: undefined, id_subcategoria: undefined, id_tipo_parrafo: 2, 
                titulo: "Descripción", 
                subtitulo: "", 
                cuerpo:"Ubicado camino El Alfalfal y envuelto entre las alturas cordilleranas, el Mirador de Cóndores es un destino que nos llenará de diversas aventuras y emociones. En el corazón recóndito de las montañas, encontramos la cuna del ave no marina de mayor envergadura del planeta. Habitante de toda la cordillera de los andes, el cóndor nos viene a entregar una vista que de seguro no será fácil olvidar, posando sus imponentes alas a pocos metros de la zona de avistamiento."
            },
            { 
                id: 376, id_atractivo: 57, id_categoria: undefined, id_subcategoria: undefined, id_tipo_parrafo: 3, 
                titulo: "Atractivo temporalmente cerrado", 
                subtitulo: "", 
                cuerpo:"«Por decreto municipal el Mirador de Cóndores se encuentra cerrado. Se está trabajando en la futura Reserva Natural Municipal para la conservación de su ecosistema y el desarrollo de una actividad tirística responsable»"
            },
            { 
                id: 378, id_atractivo: 57, id_categoria: undefined, id_subcategoria: undefined, id_tipo_parrafo: 4, 
                titulo: "¿Cómo llegar?", 
                subtitulo: "", 
                cuerpo:"Si se cuenta con vehículo particular, se debe seguir la ruta “G-25”- también conocida como Camino Al Volcán, y avanzar hasta el kilómetro xx en dirección hacia el pueblo de San José de Maipo. Estando allí, se encontrarán señaléticas que indican la localidad “Los Maitenes”, llamado también camino “El Alfalfal – ruta G345”. Tomando esta ruta y avanzando entre cuestas y curvas, pasado el kilómetro 19, llegaremos a la base donde podemos estacionar nuestro vehículo. Para quienes viajan en locomoción colectiva, llegar hasta la estación intermodal de Vicente Valdés y tomar la MB 72-C/MB 72-B será la mejor opción. Esta micro los dejará en el cruce indicado anteriormente, para luego tomar la micro “xxxxxxx” que finalmente tendrá como destino el inicio de una bella travesía."
            },
            { 
                id: 380, id_atractivo: 57, id_categoria: undefined, id_subcategoria: undefined, id_tipo_parrafo: 6, 
                titulo: "Trekking Mirador de Cóndores", 
                subtitulo: "", 
                cuerpo:"Situado en el comienzo del camino que nos llevará hasta el mirador, es recomendable contar con la hidratación necesaria para lo que será el trekking (0.5L-1.5L). Además de frutas y distintos frutos secos.  Contar con un peso liviano siempre será una ventaja para realizar  estas actividades, considerando la subida de los cerros, y el tiempo que toma llegar hasta el Mirador de Cóndores (2-3 horas). En la mitad del trekking aproximadamente, encontraremos un kiosco que ofrece productos tales como queso de cabra, aguas, bebidas energéticas, entre otros. Dentro de las consideraciones que se debe tener, es no acudir al recinto con mascotas, no hacer uso de drones, ni mucho menos botar basura, cuidar la fauna y la flora para la conservación de un lugar tan escondido y significativo, es sin duda, tarea de todos."
            },
            { 
                id: 382, id_atractivo: 57, id_categoria: undefined, id_subcategoria: undefined, id_tipo_parrafo: 7, 
                titulo: "Mirador de Cóndores, una experiencia única", 
                subtitulo: "", 
                cuerpo:"Una visualización del cóndor nunca antes vista, es indiscutiblemente la mejor recompensa a las horas de sudor y cansancio. Contemplar con tranquilidad aves de tal magnitud, mirar hacia el infinito y escuchar de forma tenue, hasta el más mínimo sonido que la naturaleza nos brinda, hará de esta experiencia un inolvidable de nuestro querido Cajón del Maipo."
            },
            { 
                id: 384, id_atractivo: 58, id_categoria: undefined, id_subcategoria: undefined, id_tipo_parrafo: 1, 
                titulo: "", 
                subtitulo: "", 
                cuerpo:"Santuario de la Naturaleza es un Centro Ecoturístico ubicado en la localidad de San Alfonso. Dentro de las actividades realizables destaca el senderismo hasta la cascada que le otorga su nombre."
            },
            { 
                id: 385, id_atractivo: 58, id_categoria: undefined, id_subcategoria: undefined, id_tipo_parrafo: 2, 
                titulo: "Descripción", 
                subtitulo: "", 
                cuerpo:"El Santuario de la Naturaleza Cascada de las Ánimas es un imperdible del Cajón del Maipo. Se Trata de un complejo ecoturístico, con abundancia de vegetación, con servicios de deportes aventura, acomodación y gastronomía, en el cual la caminata hacia la cascada que da nombre al santuario es la actividad principal. Solo es posible visitar este lugar contratando el servicio guiado en las instalaciones, a determinados horarios, todo con el objetivo de preservar este único entorno natural."
            },
            { 
                id: 387, id_atractivo: 58, id_categoria: undefined, id_subcategoria: undefined, id_tipo_parrafo: 4, 
                titulo: "¿Cómo llegar?", 
                subtitulo: "", 
                cuerpo:"Al igual que el resto de los imperdibles destinos del pulmón verde de la región metropolitana, debemos avanzar por la ruta la ruta «G-25», también llamada «Camino Al Volcán», hasta la localidad de San Alfonso, donde encontraremos el acceso al santuario al costado de la misma ruta. A nuestra mano derecha encontraremos indicaciones sencillas de ver para arribar al esperado Santuario de la Naturaleza «Cascada de las Ánimas». Si no contamos con vehículo particular, llegar en transporte público resulta bastante sencillo, cualquier Microbús MB72-B nos servirá para llegar hasta el santuario."
            },
            { 
                id: 389, id_atractivo: 58, id_categoria: undefined, id_subcategoria: undefined, id_tipo_parrafo: 6, 
                titulo: "La Cascada de las Ánimas…", 
                subtitulo: "", 
                cuerpo:"Visitar el complejo turístico y no realizar el trekking hasta la cascada de las ánimas (20-25 minutos) sería un viaje casi perdido, pues entre los cerros, surge una inmensidad de flora y fauna que asombra a los turistas. Disfrutar del avistamiento de aves, observar a solo pocos metros pumas en reinserción, para finalmente terminar en un recóndito lugar, donde cae de 60 metros de altura una cascada infinitamente transparente, con buen caudal en sus mejores fechas, es una instancia ideal para refrescarse en épocas de calor y captar fotografías que inmortalicen el momento."
            },
            { 
                id: 391, id_atractivo: 58, id_categoria: undefined, id_subcategoria: undefined, id_tipo_parrafo: 7, 
                titulo: "Consideraciones", 
                subtitulo: "", 
                cuerpo:"Cabe mencionar que el trekking en el Santuario de la Naturaleza es una actividad por la cual se debe pagar, puesto que el recorrido es acompañado por un guía del Santuario de la Naturaleza. En esta travesía podrás observar las caudalosas aguas del río Maipo, cruzando un extenso puente colgante, que se encuentra en el valle de los cerros cordilleranos. Sin duda, este avistamiento plagado de naturaleza, hará de esta experiencia, una visita distinta al Cajón del Maipo, con un sinfín de actividades posibles en un mismo lugar. "
            },
            { 
                id: 393, id_atractivo: 59, id_categoria: undefined, id_subcategoria: undefined, id_tipo_parrafo: 1, 
                titulo: "", 
                subtitulo: "", 
                cuerpo:"Laguna de agua cristalina de deshielos emplazada en un humedal, accesible a través de un trekking de 90 minutos desde las Termas del Plomo en el Valle del Yeso."
            },
            { 
                id: 394, id_atractivo: 59, id_categoria: undefined, id_subcategoria: undefined, id_tipo_parrafo: 2, 
                titulo: "Introducción", 
                subtitulo: "", 
                cuerpo:"Laguna de los Patos, es uno de los atractivos más populares entre los amantes del senderismo que visitan el Cajón del Maipo. Es una laguna de color esmeralda, alimentada por aguas de nieve y deshielos, emplazada en un humedal provisto de vegetación, que seduce a la fauna cordillerana como pumas y guanacos. El lugar es parte de Parque Valle del Yeso, y para llegar a la laguna se debe pagar la entrada de acceso ($8.000 adultos y $4.000 niños por día), continuar hasta el sector de Termas del Plomo, estacionar en el lugar y comenzar el sendero de aproximadamente 2,5 km (1 hora) hasta la laguna. Realizar el sendero no tiene costo adicional."
            },
            { 
                id: 396, id_atractivo: 59, id_categoria: undefined, id_subcategoria: undefined, id_tipo_parrafo: 4, 
                titulo: "¿Cómo llegar al inicio del sendero?", 
                subtitulo: "", 
                cuerpo:"123 km separan al centro de Santiago y las Termas del Plomo (3 hrs y 15 min en auto), siendo este último punto el inicio del sendero. Para llegar se debe transitar por la ruta principal del Cajón del Maipo «G-25», pasar por la localidad de San Gabriel y luego tomar la bifurcación hacia Embalse El Yeso. Una vez en esta ruta solo los primeros kilómetros serán de asfalto, siendo en su mayoría tierra y ripio, siempre en ascenso. Son 42 km de camino para llegar a las Termas del plomo, el cual pasará por el Embalse El Yeso. Al llegar al final de la ruta, 400 metros antes de las termas, se deberá atravesar en vehículo el «Estero de Yeguas Muertas», que en los meses de verano es de poco caudal, siendo posible atravesar sin problemas. En caso contrario estacionar en este punto y cruzar a pie. "
            },
            { 
                id: 398, id_atractivo: 59, id_categoria: undefined, id_subcategoria: undefined, id_tipo_parrafo: 6, 
                titulo: "Trekking Laguna de los Patos", 
                subtitulo: "", 
                cuerpo:"Una vez en las termas, debemos seguir el sendero hacia el Este, el cual sube una pequeña loma, para continuar el camino a borde de cerro en compañía del río Yeso que corre 20 metros más abajo. Al kilometro el sendero gira hacia el norte del valle siempre acompañado del río (el cual nunca debe cruzarse), hasta en el km 2 alcanzar una cascada. El sendero sube por el costado izquierdo de la cascada, para cruzarlo en su parte más alta. continuaremos ascendiendo algunos metros hacia una vega acompañados de un arroyo, que nace en la hermosa Laguna de los Patos, a los 2,5 km de iniciado el sendero (1 hora). Para retornar a las termas, podemos tomar la huella que sigue por la rivera Este e la laguna, que terminará en el Valle de Yeguas Muerta y el camino vehicular en el cual se accede a las termas."
            },
            { 
                id: 400, id_atractivo: 59, id_categoria: undefined, id_subcategoria: undefined, id_tipo_parrafo: 7, 
                titulo: "Laguna Esmeralda, una experiencia inolvidable", 
                subtitulo: "", 
                cuerpo:"No son pocos los que piensan que la Cordillera de los Andes, es un lugar seco y desprovisto de vida, y no se puede estar más equivocado. La Laguna de los Patos es un punto de biodiversidad de los andes, repleto de belleza y que sorprende tanto por la magia de su laguna, como por la belleza de sus senderos que tienen vistas incluso al cerro Marmolejo, la cima sobre 6.000 metros más austral del mundo. Sin duda es un destino que todos los amantes de la aventura y montaña deben visitar."
            }    
        ];
        this.tipos_parrafo = [
            {id:1 ,relevancia:0 , nombre:"leyenda"},
            {id:2 ,relevancia:1 , nombre:"descripcion"},
            {id:3 ,relevancia:2 , nombre:"advertencia"},
            {id:4 ,relevancia:3 , nombre:"indicaciones"},
            {id:5 ,relevancia:4 , nombre:"acceso"},
            {id:6 ,relevancia:5 , nombre:"recomendaciones"},
            {id:7 ,relevancia:6 , nombre:"conclusion"}
        ];

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
    }

    // CRUD Asociado
    getAsociados$(): Observable<Asociado[]>{
        return this.asociados$;
    }

    newAsociadoId() {
        var id;
        if (this.asociados.length){
            id = this.asociados[this.asociados.length - 1].id + 1;
        } else {
            id = 0
        }
        return id;
    }

    getAsociado(id: number) {
        var found;
        this.asociados.forEach(asociado => {
            if (asociado.id == id) {
                found = asociado;
            }
        });
        return found;
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

    newAtractivoId(){
        var id;
        if (this.atractivos.length){
            id = this.atractivos[this.atractivos.length - 1].id + 1;
        } else {
            id = 0
        }
        return id;
    }
    
    getAtractivo(id: number) {
        var found;
        this.atractivos.forEach(atractivo => {
            if (atractivo.id == id) {
                found = atractivo;
            }
        });
        return found;
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

    newCategoriaId(){
        var id;
        if (this.categorias.length){
            id = this.categorias[this.categorias.length - 1].id + 1;
        } else {
            id = 0
        }
        return id;
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

    newSubCategoriaId(){
        var id;
        if (this.subcategorias.length){
            id = this.subcategorias[this.subcategorias.length - 1].id + 1;
        } else {
            id = 0
        }
        return id;
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

    getServsAsoc(id:number) {
        var found = new Array;
        this.servicios.forEach( servicio => {
            if (servicio.id_asociado == id) {
                found.push(servicio);
            }
        });
        return found;
    }

    newServicioId() {
        var id;
        if (this.servicios.length) {
            id = this.servicios[this.servicios.length - 1].id + 1;
        } else {
            id = 0
        }
        return id;
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
    delServsAsoc(id: number) {
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

    getImagesAsoc(id: number) {
        var found = new Array;
        this.imgs.forEach( image => {
            if (image.id_asociado == id) {
                found.push(image);
            }
        });
        return found;
    }

    getImagesAtr(id: number) {
        var found = new Array;
        this.imgs.forEach( image => {
            if (image.id_atractivo == id) {
                found.push(image);
            }
        });
        return found;
    }

    newImageId() {
        var id;
        if (this.imgs.length) {
            id = this.imgs[this.imgs.length - 1].id + 1;
        } else {
            id = 0
        }
        return id;
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
    delImagesAtr(id: number){
        this.imgs.forEach((img, index) => {
            if (img.id_atractivo == id) {
                this.imgs.splice(index, 1)
            }
        });
        this.imgs$.next(this.imgs);
    }


    // CRUD Parrafo
    getParrafos$(): Observable<Parrafo[]> {
        return this.parrafos$.asObservable();
    }

    getParrafosAtr(id: number){
        var found = new Array;
        this.parrafos.forEach( parrafo => {
            if (parrafo.id_atractivo == id) {
                found.push(parrafo);
            }
        });
        return found;
    }

    newParrafoId() {
        var id;
        if (this.parrafos.length) {
            id = this.parrafos[this.parrafos.length - 1].id + 1;
        } else {
            id = 0
        }
        return id;
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
    delParrafosAtr(id: number){
        this.parrafos.forEach((parrafo, index) => {
            if (parrafo.id_atractivo == id) {
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
        this.stop.next(true);
    }
}
