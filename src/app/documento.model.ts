
export interface Documento {
	id: string;
    nombrePersonalizado: string;
	nombreReal: string;
	extension: string;
	mimeType: string;
	archivo: string | File;
}
