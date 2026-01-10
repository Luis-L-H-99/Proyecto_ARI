import { PlanInterface } from './PlanInterface';
import { MetodoPagoInterface } from './MetodoPagoInterface';
import { RutinaInterface } from './RutinaInterface';
import { AsistenciasInterface } from './AsistenciasInterface';

export interface UserInterface {
  // Credenciales
  correo: string;
  contrasena: string;
  // Información personal
  nombreUsuario?: string;
  apellidosUsuario?: string;
  edad?: number;
  estaturaCm?: number;
  peso?: number;
  tipoCuerpo?: string;
  // Objetivos y hábitos
  objetivo?: string;
  frecuenciaAsistencia?: string;
  tipoAlimentacion?: string;
  // Métricas físicas
  frecuenciaCardiaca?: number;
  oxigenacion?: number;
  caloriasQuemadas?: number;
  trofeos?: number;
  // Estado del sistema
  planActivo?: boolean;
  registroCompleto?: boolean;
  // Relaciones
  rutinaActiva?: RutinaInterface;
  asistencias?: AsistenciasInterface[];
  planAsociado?: PlanInterface;
  metodoPago?: MetodoPagoInterface;
  // Fechas de plan
  fechaCompraPlan?: Date;
  fechaExpiracionPlan?: Date;
}
