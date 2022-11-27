
export interface Categoria {
    id: number,
    nombre: string
}

export interface Atractivo {
    id: number,
    id_categoria: number,

}

export interface Img {
    id: number,
    id_categoria: number | any,
    id_subcategoria: number | any,
    id_atractivo: number | any,
    id_asociado: number | any,
    tipo: string,
    path: string
}

export interface Parrafo {
    id: number,
    id_atractivo: number | any,
    id_categoria: number | any,
    id_subcategoria: number | any,
    id_tipo_parrafo: number,
    titulo: string | any,
    subtitulo: string | any,
    cuerpo: string
}

export interface Tipo_parrafo {
    id: number,
    relevancia: number,
    nombre: string;
}