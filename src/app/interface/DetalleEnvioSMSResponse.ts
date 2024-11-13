export interface DetalleEnvioSMSResponse {
    evento: string;
    solicitud: string;
    estadoSolicitud: string;
    fechaInicio: Date;
    fechaFin: Date;
    destinatarios: Destinatario[];
  }
  
  export interface Destinatario {
    nombreCompleto?: string;
    empresa?: string
    telefono?: string;
    status?: string;
    enviado?: string;
    carrier?: string;
    sms?: string;
  }
  