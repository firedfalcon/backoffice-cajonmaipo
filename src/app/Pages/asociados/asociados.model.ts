
export interface Servicio {
    id: number,
    nombre: string,
    id_categoria: number | any,
    id_subcategoria: number | any,
    id_asociado: number | any
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

export interface Asociado {
    id: number,
    nombre: string,
    descripcion: string,
    facebook: string | any,
    instagram: string | any,
    twitter: string | any,
    youtube: string | any,
    whatsapp: string | any,
    web: string | any,
    email: string | any,
    telefono: number
}