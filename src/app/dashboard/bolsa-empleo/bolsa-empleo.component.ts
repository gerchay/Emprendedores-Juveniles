import { Component, OnInit,ViewChild,AfterViewInit,Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmpleosService } from '../../services/empleos.service';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  empleos: any;
}

@Component({
  selector: 'app-bolsa-empleo',
  templateUrl: './bolsa-empleo.component.html',
  styleUrls: ['./bolsa-empleo.component.scss']
})
export class BolsaEmpleoComponent implements OnInit , AfterViewInit {

  displayedColumns: string[] = ['Nombre Puesto', 'Empresa', 'Area', 'Horario', 'Edad', 'Publicacion','Detalle'];
  dataSource = new MatTableDataSource();
  


  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private empleo: EmpleosService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.empleo.getAll().subscribe(users => (this.dataSource.data = users));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue:string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //if (this.dataSource.paginator) { this.dataSource.paginator.firstPage(); }
  }

  VerDetalles(datos:any){

    //this.empleos=datos;

    this.dialog.open(detalles, {
      data: {
        empleos: datos
      }
    }
    );
   /*alert(
    "| NOMBRE DEL PUESTO |:  "+datos.puesto+
    "\n\n| EMPRESA |:  "+datos.empresa+
    "\n\n| DESCRIPCION |:  "+datos.descripcion+
    "\n\n| AREA |:  "+datos.area+
    "\n\n| HORARIO |:  "+datos.horario+
    "\n\n| REQUISITOS |:  "+datos.requisitos+
    "\n\n| EDAD |:  "+datos.edad+
    "\n\n| EXPERIENCIA |:  "+datos.experiencia+
    "\n\n| TIPO PLAZA |:  "+datos.tipoplaza+
    "\n\n| DIRECCION |:  "+datos.direccion+
    "\n\n| CORREO |:  "+datos.correo+
    "| PUBLICACION |:  "+datos.publicacion
    );*/
  }

}


@Component({
  selector: 'detalles',
  templateUrl: 'detalles.html',
})
export class detalles {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}