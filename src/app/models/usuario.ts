export interface USUARIO{
  id?:string,
  cui?:number,
  carnet?:number,
  nombres?:string,
  apellidos?:string,
  correo?:string,
  telefono?:number,
  escuela?:string,
<<<<<<< Updated upstream
  tipo?:string // admin, student
=======
  photoURL?: string,//se agrego para poner la foto en el perfil
>>>>>>> Stashed changes
}

export interface FileI {
  name: string;
  imageFile: File;
  size: string;
  type: string;
}