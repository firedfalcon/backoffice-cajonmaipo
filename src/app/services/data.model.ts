
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

export interface Asociado {
    id: number | any,
    nombre: string, // Unique
    descripcion: string,
    facebook: string | any,
    instagram: string | any,
    twitter: string | any,
    youtube: string | any,
    whatsapp: string | any,
    web: string | any,
    email: string | any,
    telefono: number,
}

export interface Categoria {
    id: number | any,
    nombre: string // Unique
}

export interface Subcategoria {
    id: number | any,
    id_categoria: number,
    nombre: string // Unique
}

export interface Parrafo {
    id: number | any,
    id_atractivo: number | any,
    id_categoria: number | any,
    id_subcategoria: number | any,
    id_tipo_parrafo: number,
    titulo: string | any,
    subtitulo: string | any,
    cuerpo: string
}

export interface Atractivo {
    id: number | any,
    id_categoria: number,
    nombre: string, // Unique
    estado: string,
    ubicacion: string // Unique
}

export interface Tipo_parrafo {
    id: number | any,
    relevancia: number,
    nombre: string; // Unique
}