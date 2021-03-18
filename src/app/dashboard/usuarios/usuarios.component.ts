import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['cui', 'carnet', 'nombre', 'apellido', 'correo', 'telefono', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _users: UsuariosService,
  ) { }

  ngOnInit(): void {
    this._users.getAll().subscribe(users => (this.dataSource.data = users));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue:string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //if (this.dataSource.paginator) { this.dataSource.paginator.firstPage(); }
  }

  onDelete( idElement:string ){

    Swal.fire({
      title: '¿Estas seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!'
    }).then(result => {
      if (result.value) {
        this. _users.deleteById( idElement ).then(() => {
          Swal.fire('¡Eliminado!', 'Su usuario ha sido eliminado.', 'success');
        }).catch((error) => {
          Swal.fire('¡Error!', 'Se produjo un error al eliminar esta publicación.', 'error');
        });
      }
    });

  }

  async onEdit( idElement:string, tipoElement:string ){
    const { value: tipoUpdate } = await Swal.fire({
      title: 'Selecciona un Tipo de usuario',
      inputValue: tipoElement,
      input: 'select',
      inputOptions: {
        'admin': 'Administrador',
        'student': 'Estudiante'
      },
      //inputPlaceholder: 'Selecione Tipo',
      showCancelButton: true,
    })

    if ( tipoUpdate ) {
      this._users.editById( idElement, { tipo: tipoUpdate} )
      .then(() => {
        Swal.fire('¡Actualizado!', 'Su usuario ha sido actualizado', 'success');
      }).catch((error) => {
        Swal.fire('¡Error!', 'Se produjo un error al actualizarlo', 'error');
      });
    }
  }

}
