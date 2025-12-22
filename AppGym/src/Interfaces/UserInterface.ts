import { PlanInterface } from './PlanInterface';
import { MetodoPagoInterface } from './MetodoPagoInterface';
import { RutinaInterface } from './RutinaInterface';
import { AsistenciasInterface } from './AsistenciasInterface';

export interface UserInterface {
  correo: string;
  contrasena: string;
  nombreUsuario?: string;
  apellidosUsuario?: string;
  edad?: number;
  estaturaCm?: number;
  peso?: number;
  tipoCuerpo?: string;
  objetivo?: string;
  frecuenciaAsistencia?: string;
  tipoAlimentacion?: string;
  frecuenciaCardiaca?: number;
  oxigenacion?: number;
  trofeos?: number;
  caloriasQuemadas?: number;
  planActivo?: boolean;
  
  rutinaActiva?: RutinaInterface;
  asistencias?: AsistenciasInterface[];
  planAsociado?: PlanInterface;
  metodoPago?: MetodoPagoInterface;
  fechaCompraPlan?: Date;
  fechaExpiracionPlan?: Date;
}
