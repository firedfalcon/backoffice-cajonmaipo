
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
    email: string,
    telefono: number | any,
}