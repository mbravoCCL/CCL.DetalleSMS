export interface DetalleEnvioSMSResponse {
    evento: string;
    solicitud: string;
    estadoSolicitud: string;
    destinatarios: Destinatario[];
  }
  
  export interface Destinatario {
    nombreCompleto?: string;
    telefono?: string;
    status?: string;
    enviado?: string;
    carrier?: string;
    sms?: string;
  }
  