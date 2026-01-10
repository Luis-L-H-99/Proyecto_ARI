import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../Services/UserService';
import { UserInterface } from '../../../interfaces/UserInterface';

@Component({
  selector: 'app-formulario-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario-component.html',
  styleUrl: './formulario-component.scss',
})
export class FormularioComponent implements OnInit {

  // Objeto usuario que se usará en el formulario
  usuario!: UserInterface;
  // Inyección de dependencias
  constructor(
    private userService: UserService, // Servicio de usuario
    private router: Router             // Router para redirecciones
  ) { }
  // Método que se ejecuta al iniciar el componente
  ngOnInit(): void {
    // Obtener el usuario actual desde el servicio
    const usuarioActual = this.userService.usuarioActual;
    // Si no existe usuario (no ha iniciado sesión), redirige al login
    if (!usuarioActual) {
      this.router.navigate(['/login'], { replaceUrl: true });
      return;
    }
    // Si el usuario ya completó el registro, redirige al dashboard
    if (usuarioActual.registroCompleto) {
      this.router.navigate(['/dashboard'], { replaceUrl: true });
      return;
    }
    /*Se clona el usuario actual y se inicializan los campos
      de los <select> con string vacío ('') para que Angular
      muestre correctamente la opción inicial (placeholder).*/
    this.usuario = {
      ...usuarioActual,
      tipoCuerpo: usuarioActual.tipoCuerpo ?? '',
      objetivo: usuarioActual.objetivo ?? '',
      frecuenciaAsistencia: usuarioActual.frecuenciaAsistencia ?? '',
      tipoAlimentacion: usuarioActual.tipoAlimentacion ?? '',
    };
  }
  // Método que se ejecuta al enviar el formulario
  completarRegistro(): void {
    // Validación: todos los campos son obligatorios
    if (
      !this.usuario.nombreUsuario ||
      !this.usuario.apellidosUsuario ||
      !this.usuario.edad ||
      !this.usuario.estaturaCm ||
      !this.usuario.peso ||
      !this.usuario.tipoCuerpo ||
      !this.usuario.objetivo ||
      !this.usuario.frecuenciaAsistencia ||
      !this.usuario.tipoAlimentacion
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }
    // Expresión regular para permitir solo letras y espacios
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    // Validar que nombre y apellido no contengan números
    if (
      !soloLetras.test(this.usuario.nombreUsuario) ||
      !soloLetras.test(this.usuario.apellidosUsuario)
    ) {
      alert('Nombre y apellido no deben contener números');
      return;
    }
    // Validar estatura: número entero entre 100 y 200 cm
    if (
      !Number.isInteger(this.usuario.estaturaCm) ||
      this.usuario.estaturaCm < 100 ||
      this.usuario.estaturaCm > 200
    ) {
      alert('La estatura debe ser un número entero entre 100 y 200 cm');
      return;
    }
    // Marcar el registro como completado
    this.usuario.registroCompleto = true;
    // Guardar el usuario actualizado en el servicio
    this.userService.guardarUsuarioActual(this.usuario);
    this.userService.actualizarUsuario(this.usuario);
    // Redirigir al dashboard y evitar volver al formulario
    this.router.navigate(['/dashboard'], { replaceUrl: true });
  }
}
