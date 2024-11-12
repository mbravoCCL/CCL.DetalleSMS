import { HttpClient } from '@angular/common/http';
import {  Injectable,  } from '@angular/core';
import { DetalleEnvioSMSResponse } from '../interface/DetalleEnvioSMSResponse';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

const urlApi = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class DetalleSMSService {


  constructor(private http: HttpClient) {}

  getDetalleEnvioSMS(id: string): Observable<DetalleEnvioSMSResponse> {
    return this.http.get<DetalleEnvioSMSResponse>(`${urlApi}/CampaignSolcitudSMS/detalle/${id}`);
  }
}