
export interface Categoria{
    id: number | any,
    nombre: string // Unique
}

export interface Subcategoria {
    id: number | any,
    id_categoria: number | any,
    nombre: string // Unique
}

export interface Parrafo {
    id: number  | any,
    id_atractivo: number | any,
    id_categoria: number | any,
    id_subcategoria: number | any,
    id_tipo_parrafo: number,
    titulo: string | any,
    subtitulo: string | any,
    cuerpo: string | any,
}

export interface Servicio {
    id: number | any,
    nombre: string,
    id_categoria: number | any,
    id_subcategoria: number | any,
    id_asociado: number | any
}

export interface Img {
    id: number | any,
    id_categoria: number | any,
    id_subcategoria: number | any,
    id_atractivo: number | any,
    id_asociado: number | any,
    tipo: string,
    path: string // Unique
}