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

  constructor(private authSvc: AuthService, private postSvc:UsuariosService,private route:ActivatedRoute) { }


  //otra forma de mostrar los datos
  user: USUARIO = {
    id:"",
    cui:null,
    carnet:null,
    nombres:"",
    apellidos:"",
    correo:"",
    telefono:null,
    escuela:"",
    photoURL:"",
  };



  public profileForm = new FormGroup({
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    email: new FormControl({ value: '', disabled: true }, Validators.required),
    photoURL: new FormControl('', Validators.required),
    cui: new FormControl( '', Validators.required),
    carne: new FormControl({ value: '', disabled: true }, Validators.required),
    telefono: new FormControl('', Validators.required),
    escuela: new FormControl('', Validators.required),

  });


  ngOnInit(): void {

    //esto nos devuelve un usuario y se lo pasamos al metodo para poder mostrar los datos
  /*  this.authSvc.userData$.subscribe(user => {
      this.initValuesForm(user);
      //console.log("--->",user);
    });*/

   /* const idpost=this.route.snapshot.params.id;
    this.post$=this.postSvc.getOnePost(idpost);*/

    this.authSvc.isAuth().subscribe(user => {
      if (user) {
        console.log("otra forma--->", user)

        this.user.nombres = user.displayName;
        this.user.correo = user.email;
        this.user.photoURL = user.photoURL;
        this.user.id=user.uid;

       this.postSvc.buscarUsuario(this.user.id);
       //console.log("sistemas usac: ",localStorage.getItem('usuario'));
        this.initValuesForm( JSON.parse(localStorage.getItem('usuario')) );
      }
    })

  // this.posts$=this.postSvc.getOne("AIzaSyAXeeqvdxbS5M3pzYE1OI_fY-Uf97Zq28w");
   // this.postSvc.buscarUsuario("ujZxNFLItXMOPeIOKmV1gMvGrfI2");
  }

  onSaveUser(user: USUARIO): void {
   // this.authSvc.preSaveUserProfile(user, this.image);
   // console.log("save user .... ");
  }

  //este metodo es para recibir el usuario actualmente logeado
  private initValuesForm(user:USUARIO): void {
   /* if (user.photoURL) {
      this.currentImage = user.photoURL;
    }*/
    console.log("mostrar--->",user.nombres);
    this.profileForm.patchValue({
      nombres: user.nombres,
      apellidos:user.apellidos,
      email: user.correo,
      cui:user.cui,
      carne:user.carnet,
      telefono:user.telefono,
      escuela:user.escuela,
    });
  }



  handleImage(image: FileI): void {
    this.image = image;
  }







}
