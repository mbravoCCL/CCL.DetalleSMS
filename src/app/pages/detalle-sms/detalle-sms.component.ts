import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { DetalleSMSService } from '../../service/detalle-sms.service';
import { Destinatario, DetalleEnvioSMSResponse } from '../../interface/DetalleEnvioSMSResponse';
import { CommonModule, NgClass } from '@angular/common';
import { Pie } from '../../interface/Pie';
import { AdvancedPieComponent } from '../../components/chart/advanced-pie/advanced-pie.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detalle-sms',
  standalone: true,
  imports: [NavbarComponent,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,NgClass,AdvancedPieComponent, CommonModule],
  templateUrl: './detalle-sms.component.html',
  styleUrl: './detalle-sms.component.scss'
})
export default class DetalleSMSComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombreCompleto', 'telefono', 'status', 'enviado', 'carrier', 'sms'];
  dataSource: MatTableDataSource<Destinatario> = new MatTableDataSource<Destinatario>([]);
  evento: string = "";
  estado: string = "";
  solicitud: string = "";
  loading: boolean = true;
  error :boolean = false;
  pieData: Pie [] = [];

  colorScheme:any = {
    domain: ['#5AA454', '#e3123f']
  };


  private paginator!: MatPaginator;
  private sort!: MatSort;

  detalleSMSService = inject(DetalleSMSService);
  route = inject(ActivatedRoute);
  
  constructor() {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    //F9354221-C29A-EF11-905E-00155D00F711
    this.detalleSMSService.getDetalleEnvioSMS(id ?? "")
      .subscribe({
        next: (data: DetalleEnvioSMSResponse) => {
          this.loading = false; 
          this.evento = data.evento;
          this.solicitud = data.solicitud;
          this.estado = data.estadoSolicitud;
          const destinatarios = data.destinatarios ?? [];
          this.dataSource.data = destinatarios;
        
          const enviados = destinatarios.filter(x => x.status === "ENTREGADO").length;
          const rechazados = destinatarios.filter(x => x.status === "RECHAZADO").length;
        
          this.pieData = [
            { name: "Aprobados", value: enviados },
            { name: "Rechazados", value: rechazados }
          ];
          
        },
        error: (err) => {
  
          console.error('Error al obtener los datos', err);
          this.loading = false; 
          this.error = true;
        }
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.paginator._intl!.itemsPerPageLabel="Registros por página";
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}