import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';
import { UserService } from '../../Services/UserService';
import { UserInterface } from '../../../interfaces/UserInterface';

@Component({
  selector: 'app-login-up',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-up.html',
  styleUrl: './login-up.scss',
})
export class LoginUp {

  // Enumeración y función para manejar tipografías 
  customFonts = CustomFonts;
  getFont = getFont;
  // Variables ligadas al formulario de login
  correo: string = '';
  contrasena: string = '';
  // Inyección de servicios necesarios:
  constructor(
    private userService: UserService, // - UserService: manejo de usuarios
    private router: Router, // - Router: navegación entre vistas
    private location: Location // - Location: control del historial de navegación
  ) { }
  // Método para iniciar sesión
  login() {
    // Validación de campos vacíos
    if (!this.correo || !this.contrasena) {
      alert('Debes llenar todos los campos');
      return;
    }
    // Validación de formato de correo electrónico
    if (!this.isValidCorreo(this.correo)) {
      alert('Ingresa un correo electrónico válido');
      return;
    }
    // Buscar usuario en el servicio
    const usuario = this.userService.buscarUsuario(
      this.correo,
      this.contrasena
    );
    // Usuario no encontrado
    if (!usuario) {
      alert('El usuario no existe, debes registrarte');
      return;
    }
    // Validar si el plan está vencido
    if (usuario.planActivo && usuario.fechaExpiracionPlan) {
      const today = new Date();

      if (today > usuario.fechaExpiracionPlan) {
        alert(
          'Error, detectamos que no has renovado tu membresía, por favor renuévala y vuelve a entrar.'
        );
        return;
      }
    }
    // Guardar usuario como usuario actual
    this.userService.guardarUsuarioActual(usuario);
    // Redirigir al dashboard
    this.router.navigate(['/dashboard']);
  }
  // Método para registrar un nuevo usuario
  register() {
    // Validación de campos vacíos
    if (!this.correo || !this.contrasena) {
      alert('Debes llenar todos los campos');
      return;
    }
    // Validación de formato de correo
    if (!this.isValidCorreo(this.correo)) {
      alert('Ingresa un correo electrónico válido');
      return;
    }
    // Buscar si el usuario ya existe
    const usuario = this.userService.buscarUsuario(
      this.correo,
      this.contrasena
    );
    // Usuario ya registrado
    if (usuario) {
      alert('El usuario existe, debes iniciar sesión');
      return;
    }
    // Crear objeto de usuario con datos iniciales
    const nuevoUsuario: UserInterface = {
      correo: this.correo,
      contrasena: this.contrasena,
      nombreUsuario: undefined,
      apellidosUsuario: undefined,
      edad: undefined,
      estaturaCm: undefined,
      tipoCuerpo: undefined,
      objetivo: undefined,
      frecuenciaAsistencia: undefined,
      tipoAlimentacion: undefined,
      frecuenciaCardiaca: undefined,
      oxigenacion: undefined,
      trofeos: 0,
      caloriasQuemadas: undefined,
      planActivo: false,
      rutinaActiva: undefined,
      asistencias: undefined,
      planAsociado: undefined,
      metodoPago: undefined,
      fechaCompraPlan: undefined,
      fechaExpiracionPlan: undefined,
    };
    // Guardar usuario en el arreglo global
    this.userService.agregarUsuario(nuevoUsuario);
    // Guardar como usuario actualmente logueado
    this.userService.guardarUsuarioActual(nuevoUsuario);
    // Evita regresar al login y navega al formulario
    this.location.replaceState('/formulario');
    this.router.navigate(['/formulario']);
  }
  // Hace scroll suave hacia la sección de planes
  scrollAPlanes() {
    const element = document.getElementById('planes');
    element?.scrollIntoView({ behavior: 'smooth' });
  }
  // Valida el formato del correo electrónico
  isValidCorreo(correo: string): boolean {
    const correoRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return correoRegex.test(correo);
  }
}
