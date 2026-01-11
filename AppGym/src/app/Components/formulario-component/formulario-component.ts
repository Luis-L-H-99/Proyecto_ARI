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
    /* Se clona el usuario actual y se inicializan los campos
       de los <select> con string vacío ('') para que Angular
       muestre correctamente la opción inicial (placeholder). */
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
    // Normalizar valores para evitar undefined (TypeScript strict)
    const nombre = this.usuario.nombreUsuario ?? '';
    const apellido = this.usuario.apellidosUsuario ?? '';
    const estatura = this.usuario.estaturaCm ?? 0;
    // Validación: todos los campos son obligatorios
    if (
      !nombre ||
      !apellido ||
      !this.usuario.edad ||
      !estatura ||
      !this.usuario.peso ||
      !this.usuario.tipoCuerpo ||
      !this.usuario.objetivo ||
      !this.usuario.frecuenciaAsistencia ||
      !this.usuario.tipoAlimentacion
    ) {
      this.resaltarCamposVacios();
      return;
    }
    // Expresión regular para permitir solo letras y espacios
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    // Validar que nombre y apellido no contengan números
    if (
      !soloLetras.test(nombre) ||
      !soloLetras.test(apellido)
    ) {
      this.enfocarCampoPorNombre('nombre');
      return;
    }
    // Validar estatura: número entero entre 100 y 200 cm
    if (
      !Number.isInteger(estatura) ||
      estatura < 100 ||
      estatura > 200
    ) {
      this.enfocarCampoPorNombre('estatura');
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
  /* Recorre TODOS los campos y anima
     únicamente los que están vacíos */
  private resaltarCamposVacios(): void {
    const campos = document.querySelectorAll('.campo-validable');
    let primerCampoInvalido: Element | null = null;

    campos.forEach(campo => {
      const control = campo.querySelector('input, select') as HTMLInputElement | null;

      if (control && !control.value) {
        // Guardar el primer campo vacío
        if (!primerCampoInvalido) {
          primerCampoInvalido = campo;
        }

        // Animar todos los campos vacíos
        this.animarCampo(campo);
      }
    });
    // Hacer scroll SOLO al primer campo inválido
    if (primerCampoInvalido) {
      (primerCampoInvalido as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }
  // Enfoca un campo específico por el atributo name
  private enfocarCampoPorNombre(nombre: string): void {
    const campo = document
      .querySelector(`[name="${nombre}"]`)
      ?.closest('.campo-validable');

    if (campo) {
      this.animarCampo(campo);
    }
  }
  // Aplica la clase de error de forma temporal
  private animarCampo(campo: Element): void {
    // Reinicia la animación si ya existía
    campo.classList.remove('campo-error');
    void (campo as HTMLElement).offsetWidth;
    campo.classList.add('campo-error');

    setTimeout(() => {
      campo.classList.remove('campo-error');
    }, 1300);
  }
}