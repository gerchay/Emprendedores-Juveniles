import { Component, OnInit } from '@angular/core';

//son importaciones que no vienen por defecto
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { UsuariosService } from '../../services/usuarios.service'
import { USUARIO} from '../../models/usuario';
import { FileI } from '../../models/usuario';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public post$: Observable<USUARIO>;


  //esta variables recive la ruta de una imagen
  public currentImage = 'https://picsum.photos/id/113/150/150';
  public image: FileI;
  public llaveusuario:string;

  constructor(
    private authSvc: AuthService, 
    private postSvc:UsuariosService,
    private route:ActivatedRoute
    
    ) { }


  public profileForm = new FormGroup({
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    email: new FormControl({ value: '', disabled: true }, Validators.required),
    photoURL: new FormControl('', Validators.required),
    cui: new FormControl( '', Validators.required),
    carne: new FormControl({ value: '', disabled: true }, Validators.required),
    telefono: new FormControl('', Validators.required),
    escuela: new FormControl({ value: '', disabled: true }, Validators.required),
    nombreescuela: new FormControl({ value: '', disabled: true }, Validators.required),

  });


  ngOnInit(): void {

    this.authSvc.isAuth().subscribe(user => {
      if (user) {
       // console.log("nueva forma--->", user.uid)
       this.llaveusuario=user.uid;
        this.postSvc.getOne( user.uid )
      .subscribe(
        user =>{
         // console.log("nueva forma mas corto--->" ,user );
          this.initValuesForm( user);
        },
        err => console.error( err )
      )
       /* console.log("otra forma--->", user)

        this.user.nombres = user.displayName;
        this.user.correo = user.email;
        this.user.photoURL = user.photoURL;
        this.user.id=user.uid;

       this.postSvc.buscarUsuario(this.user.id);
       //console.log("sistemas usac: ",localStorage.getItem('usuario'));
        this.initValuesForm( JSON.parse(localStorage.getItem('usuario')) );*/
      }
    })

 
  }

  
  //este metodo es para recibir el usuario actualmente logeado
  private initValuesForm(user:USUARIO): void {
    if (user.photoURL) {
      this.currentImage = user.photoURL;
    }
    
   // console.log("mostrar--->",user.nombres);
    this.profileForm.patchValue({
      nombres: user.nombres,
      apellidos:user.apellidos,
      email: user.correo,
      cui:user.cui,
      carne:user.carnet,
      telefono:user.telefono,
      escuela:user.escuela,
      nombreescuela:this.Carrera(user.escuela),
    });
  }



  onSaveUser(user: USUARIO): void {
    this.authSvc.preSaveUserProfile(user, this.llaveusuario,this.image);
  }

  handleImage(image: FileI): void {
    this.image = image;
  }

  
  private Carrera (carrera){

    switch (carrera) {
      case "01":
          return "Ingeniería Civil"; 
          break;
      case "02":
        return "Ingeniería Química"; 
          break;
      case "03":
        return "Ingeniería Mecánica"; 
          break;
      case "04":
        return "Ingeniería Eléctrica"; 
          break;
      case "05":
        return "Ingeniería Industrial"; 
          break;
      case "06":
        return "Ingeniería Mecánica Eléctrica"; 
          break;
      case "07":
        return "Ingeniería Mecánica Industrial"; 
          break;
      case "09":
        return "Ingeniería en Ciencias y Sistemas"; 
          break;
      case "13":
        return "Ingeniería Electrónica"; 
          break;
      case "35":
        return "Ingeniería Ambiental"; 
          break;
  }

  }
 





}
