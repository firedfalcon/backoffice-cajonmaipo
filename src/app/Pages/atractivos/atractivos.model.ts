
export interface Atractivo {
    id: number,
    id_categoria: number,
    nombre: string, // Unique
    estado: string,
    ubicacion: string // Unique
}

export interface Img {
    id: number,
    id_categoria: number | any,
    id_subcategoria: number | any,
    id_atractivo: number | any,
    id_asociado: number | any,
    tipo: string,
    path: string // Unique
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
    nombre: string; // Unique
}